'use strict';

const API_KEY = 'b210b8c265aa45ab35b8876089232222';
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMjEwYjhjMjY1YWE0NWFiMzViODg3NjA4OTIzMjIyMiIsInN1YiI6IjY2M2JjY2JlYmRjMjJhNDAxNjAxMDk3NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zjkAl594EP84PYZFIQ6iSotECJtDLEMUn35DsNJdj60',
  },
};

export async function fetchMoviesList(query) {
  const BASE_URL = 'https://api.themoviedb.org/3/search/movie';
  const params = new URLSearchParams({
    api_key: API_KEY,
    include_adult: false,
    language: 'en-US',
    page: 1,
    query,
  });

  const result = await fetch(`${BASE_URL}?${params}`, options);
  return result.json();
}

export async function fetchMovie(id) {
  const BASE_URL = 'https://api.themoviedb.org/3/movie';
  const params = new URLSearchParams({
    language: 'en-US',
  });

  const result = await fetch(`${BASE_URL}/${id}?${params}`, options);
  return result.json();
}
