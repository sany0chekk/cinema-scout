'use strict';

import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

import Swal from 'sweetalert2';

import { fetchMovie, fetchMovieTrailer } from './movie-api';

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
    const modalEl = document.querySelector('.modal');

    loader.classList.remove('hide');

    try {
      const data = await fetchMovie(id);

      const {
        id: videoID,
        poster_path: img,
        title,
        status,
        release_date,
        genres,
        vote_average: rating,
        overview,
      } = data;

      const modalVideoBtn = modalEl.querySelector('.modal-video-btn');
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

      modalVideoBtn.dataset.id = videoID;

      modalEl.classList.add('active');
      document.body.style.overflow = 'hidden';

      modalVideoBtn.addEventListener('click', showMovieTrailer);
    } catch (error) {
      console.log(error);
    } finally {
      loader.classList.add('hide');
    }
  }
}

async function showMovieTrailer(event) {
  const id = event.currentTarget.dataset.id;

  try {
    const data = await fetchMovieTrailer(id);

    if (!data.results.length) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: "We couldn't find the trailer for this movie",
      });
    } else {
      const key = data.results[0].key;

      const instance = basicLightbox.create(`
    <iframe src="https://www.youtube.com/embed/${key}" width="800" height="500" frameborder="0"></iframe>
  `);

      instance.show();
    }
  } catch (error) {
    console.log(error);
  }
}
