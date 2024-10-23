"use strict";

const movieCard = document.querySelector(".movie-card");
const containerMovies = document.querySelector(".container-movies");

const keyApi = "cc21ebb0db4ce9af88a32340aab320b7";

async function getMovies() {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${keyApi}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log(data);
    let html = "";

    data.results.forEach((movie) => {
      const imageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

      html += `
      <article class ="movie-card">
      <img src="${imageUrl}" alt="${movie.title}">
      <h3>${movie.title}</h3>
      </article>

      
      `;

      containerMovies.insertAdjacentHTML("beforeend", html);
    });
  } catch (error) {
    console.error("Fetch error: ", error);
  }
}

getMovies();
