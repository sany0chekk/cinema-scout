'use strict';
import { fetchMovie } from './movie-api';

const libraryEl = document.querySelector('.library-list');
const modalCloseBtn = document.querySelector('.modal-close-btn');

modalCloseBtn.addEventListener('click', event => {
  event.target.closest('.backdrop').classList.remove('active');
  document.body.style.overflow = null;
});

libraryEl.addEventListener('click', renderMovieInfo);

async function renderMovieInfo(event) {
  if (event.target.classList.contains('library-item-btn')) {
    const id = event.target.dataset.id;
    const loader = document.querySelector('.modal-loader');

    try {
      const data = await fetchMovie(id);

      loader.classList.remove('hide');

      const {
        poster_path: img,
        original_title: title,
        status,
        release_date,
        genres,
        vote_average: rating,
        overview,
      } = data;

      const modalEl = document.querySelector('.modal');
      const modalElements = {
        img: modalEl.querySelector('.modal-img'),
        title: modalEl.querySelector('.modal-title'),
        status: modalEl.querySelector('.modal-status span'),
        release: modalEl.querySelector('.modal-released span'),
        rating: modalEl.querySelector('.modal-rating span'),
        descr: modalEl.querySelector('.modal-descr'),
      };
      modalElements.img.src = `https://image.tmdb.org/t/p/w500/${img}`;
      modalElements.img.alt = title;
      modalElements.title.textContent = title;
      modalElements.status.textContent = status;
      modalElements.release.textContent = release_date;
      modalElements.rating.textContent = rating;
      modalElements.descr.textContent = overview;

      modalEl.classList.add('active');
      document.body.style.overflow = 'hidden';
    } catch (error) {
      console.log(error);
    } finally {
      loader.classList.add('hide');
    }
  }
}
