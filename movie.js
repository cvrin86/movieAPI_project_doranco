"use strict";

const keyApi = "cc21ebb0db4ce9af88a32340aab320b7";

// Fonction pour récupérer les paramètres de l'URL
function getMovieIdFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

async function getMovieDetails(movieId) {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${keyApi}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const movie = await response.json();
    displayMovieDetails(movie);
  } catch (error) {
    console.error("Fetch error: ", error);
  }
}

function displayMovieDetails(movie) {
  document.querySelector(".movie-title").textContent = movie.title;
  document.querySelector(
    ".movie-poster"
  ).src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  document.querySelector(".movie-description").textContent = movie.overview;
  document.querySelector(".movie-release-date").textContent =
    movie.release_date;

  const genres = movie.genres.map((genre) => genre.name).join(", ");
  document.querySelector(".movie-genres").textContent = genres;
}

// Récupère l'ID du film depuis l'URL et affiche ses détails
const movieId = getMovieIdFromURL();
getMovieDetails(movieId);
