'use strict';

const API_KEY = import.meta.env.VITE_API_KEY;
const AUTH_TOKEN = import.meta.env.VITE_AUTH_TOKEN;
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${AUTH_TOKEN}`,
  },
};

const BASE_URL = 'https://api.themoviedb.org/3';

export async function fetchMoviesList(query) {
  const params = new URLSearchParams({
    api_key: API_KEY,
    include_adult: false,
    language: 'en-US',
    page: 1,
    query,
  });

  const result = await fetch(`${BASE_URL}/search/movie?${params}`, options);
  return result.json();
}

export async function fetchMovie(id) {
  const params = new URLSearchParams({
    api_key: API_KEY,
    language: 'en-US',
  });

  const result = await fetch(`${BASE_URL}/movie/${id}?${params}`, options);
  return result.json();
}

export async function fetchPopularMovies() {
  const params = new URLSearchParams({
    api_key: API_KEY,
    language: 'en-US',
    page: 1,
  });

  const result = await fetch(`${BASE_URL}/movie/popular?${params}`, options);
  return result.json();
}

export async function fetchMovieTrailer(id) {
  const params = new URLSearchParams({
    api_key: API_KEY,
    language: 'en-US',
  });

  const result = await fetch(
    `${BASE_URL}/movie/${id}/videos?${params}`,
    options
  );
  return result.json();
}
