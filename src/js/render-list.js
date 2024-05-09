'use strict';

import { fetchMoviesList, fetchPopularMovies } from './movie-api';

renderPopularMovies();

let currentPage = 1;

const searchForm = document.querySelector('.header-search');
searchForm.addEventListener('submit', event => {
  const pageCounterEl = document.querySelector('.library-page');
  currentPage = 1;
  pageCounterEl.textContent = currentPage;
  renderElements(event);
});

const prevPageBtn = document.querySelector('.library-prev-btn');
const nextPageBtn = document.querySelector('.library-next-btn');

prevPageBtn.addEventListener('click', handlePrevPage);
nextPageBtn.addEventListener('click', handleNextPage);

function handlePrevPage() {
  const pageCounterEl = document.querySelector('.library-page');
  currentPage--;
  renderElements(event);
  pageCounterEl.textContent = currentPage;

  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}

function handleNextPage() {
  const pageCounterEl = document.querySelector('.library-page');
  currentPage++;
  renderElements(event);
  pageCounterEl.textContent = currentPage;

  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}

window.addEventListener('popstate', handlePopstate);

function handlePopstate(event) {
  const pathname = location.pathname;

  if (pathname === '/popular') {
    currentPage = 1;
    renderPopularMovies();
  } else if (pathname.startsWith('/search/')) {
    const pathParts = pathname.substring('/search/'.length).split('/');
    const searchPage = pathParts[0] || 1;
    const searchQuery = pathParts[1] || '';
    currentPage = parseInt(searchPage, 10);
    renderElements({
      target: { elements: { 'header-search-input': { value: searchQuery } } },
    });
  }
}

async function renderElements(event) {
  event.preventDefault();
  const movieName = searchForm.querySelector('.header-search-input');
  const libraryEl = document.querySelector('.library-list');
  const loader = document.querySelector('.library-loader');
  const message = document.querySelector('.library-message');
  const libraryTitle = document.querySelector('.library-title');
  const libraryPaginationEl = document.querySelector('.library-pagination');

  loader.classList.remove('hide');
  libraryEl.innerHTML = '';

  try {
    const data = await fetchMoviesList(movieName.value.trim(), currentPage);

    libraryTitle.innerHTML = `Search query: <span>${movieName.value.trim()}</span>`;

    if (!data.results.length) {
      message.classList.add('active');
      libraryPaginationEl.classList.remove('active');
    } else {
      message.classList.remove('active');

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
              return '';
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
      libraryPaginationEl.classList.add('active');

      const totalPages = data.total_pages;

      if (currentPage >= totalPages) {
        nextPageBtn.disabled = true;
      } else {
        nextPageBtn.disabled = false;
      }

      if (currentPage <= 1) {
        prevPageBtn.disabled = true;
      } else {
        prevPageBtn.disabled = false;
      }
    }

    if (movieName.value.trim()) {
      history.pushState(
        {},
        '',
        `/search/${movieName.value.trim()}/${currentPage}`
      );
    } else {
      history.pushState({}, '', '/popular');
    }
  } catch (error) {
    console.log(error);
  } finally {
    loader.classList.add('hide');
  }
}

async function renderPopularMovies() {
  const libraryEl = document.querySelector('.library-list');
  const loader = document.querySelector('.library-loader');

  history.pushState({}, '', '/popular');

  libraryEl.innerHTML = '';
  loader.classList.remove('hide');

  try {
    const data = await fetchPopularMovies();

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
            return '';
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
  } catch (error) {
    console.log(error);
  } finally {
    loader.classList.add('hide');
  }
}
