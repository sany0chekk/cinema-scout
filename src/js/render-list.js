'use strict';

import { fetchMoviesList } from './movie-api';

const searchForm = document.querySelector('.header-search');
searchForm.addEventListener('submit', renderElements);

async function renderElements(event) {
  event.preventDefault();
  const movieName = event.currentTarget.elements.movie;
  const libraryEl = document.querySelector('.library-list');
  const loader = document.querySelector('.library-loader');

  try {
    const data = await fetchMoviesList(movieName.value.trim());

    libraryEl.innerHTML = '';
    loader.classList.remove('hide');

    const markup = data.results
      .map(
        ({
          id,
          title,
          overview,
          release_date: date,
          vote_average: rate,
          poster_path: img,
        }) => {
          if (!img) {
            return ''; // повертаємо порожній рядок, якщо немає poster_path
          }

          return `
        <li class="library-item">
          <img src="https://image.tmdb.org/t/p/w500/${img}" alt="${title}" class="library-item-poster" />
          <div class="library-item-content">
            <h3 class="library-item-title">${title}</h3>
            <p class="library-item-date library-item-text">Release date: <span>${date}</span></p>
            <p class="library-item-rate library-item-text">Rating: <span>${rate}</span></p>
            <button type="button" class="library-item-btn" data-id="${id}">Read more</button>
          </div>
        </li>
      `;
        }
      )
      .join('');
    libraryEl.insertAdjacentHTML('beforeend', markup);
    console.log(data);
  } catch (error) {
    console.log(error);
  } finally {
    loader.classList.add('hide');
  }
}
