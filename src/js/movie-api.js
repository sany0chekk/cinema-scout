'use strict';

const API_KEY = 'b210b8c265aa45ab35b8876089232222';
const AUTH_TOKEN =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMjEwYjhjMjY1YWE0NWFiMzViODg3NjA4OTIzMjIyMiIsInN1YiI6IjY2M2JjY2JlYmRjMjJhNDAxNjAxMDk3NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zjkAl594EP84PYZFIQ6iSotECJtDLEMUn35DsNJdj60';
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${AUTH_TOKEN}`,
  },
};

const BASE_URL = 'https://api.themoviedb.org/3';

export async function fetchMoviesList(query, page) {
  const params = new URLSearchParams({
    api_key: API_KEY,
    include_adult: false,
    language: 'en-US',
    page,
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
