const containerMovies = document.querySelector(".container-movies");
const btnSeeMore = document.querySelector(".btn-seemore");

const searchBtn = document.querySelector(".search-btn");
const searchInput = document.querySelector(".search-input");

const keyApi = "cc21ebb0db4ce9af88a32340aab320b7";
let currentPage = 1;
let totalPages = 1;
let currentMovieIndex = 0;
let moviesCache = [];

searchBtn.addEventListener("click", () => {});

async function getMovies(page = 1) {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${keyApi}&page=${page}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    // console.log(data.results.length)
    totalPages = data.total_pages;
    moviesCache = data.results;
    currentMovieIndex = 0;
    page;

    let html = "";
    const moviesToDisplay = moviesCache.slice(
      currentMovieIndex,
      currentMovieIndex + 10
    );
    currentMovieIndex += 10;

    moviesToDisplay.forEach((movie) => {
      const imageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
      html += `
        <div class="movie-card" data-id="${movie.id}">
          <img src="${imageUrl}" alt="${movie.title}">
         
        </div>
      `;
    });

    containerMovies.insertAdjacentHTML("beforeend", html);

    document.querySelectorAll(".movie-card").forEach((card) => {
      card.addEventListener("click", (e) => {
        const movieId = e.currentTarget.getAttribute("data-id");

        window.location.href = `movie.html?id=${movieId}`;
      });
    });

    if (currentMovieIndex >= moviesCache.length && currentPage < totalPages) {
      currentPage++;
      getMovies(currentPage);
    }

    if (currentPage >= totalPages && currentMovieIndex >= moviesCache.length) {
      btnSeeMore.style.display = "none";
    }
  } catch (error) {
    console.error("Fetch error: ", error);
  }
}

getMovies(currentPage);

btnSeeMore.addEventListener("click", () => {
  if (currentMovieIndex < moviesCache.length) {
    getMovies(currentPage);
  } else {
    getMovies(currentPage);
  }
});

async function searchMovieByTitle() {
  const searchMovie = searchInput.value;

  if (!searchMovie) {
    alert("Please put the title of the movie."); // Alerte si champ vide
    return; // Sort de la fonction
  }

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${keyApi}&query=${searchMovie}`
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    moviesCache = data.results; // Met à jour le cache avec les résultats de la recherche

    currentMovieIndex = 0; // Réinitialise l'index courant
    containerMovies.innerHTML = ""; // Vide le conteneur avant d'afficher les résultats

    // Insérer les résultats de recherche directement
    let html = "";
    if (moviesCache.length === 0) {
      html = "<p>No movies found.</p>"; // Message si aucun film trouvé
    } else {
      moviesCache.forEach((movie) => {
        const imageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
        html += `
                    <article class="movie-card" data-id="${movie.id}">
                        <img src="${imageUrl}" alt="${movie.title}">
                     
                    </articles>
                `;
      });
    }
    containerMovies.insertAdjacentHTML("beforeend", html); // Affiche les résultats dans le conteneur

    // Ajout des écouteurs d'événements sur chaque carte de film
    document.querySelectorAll(".movie-card").forEach((card) => {
      card.addEventListener("click", (e) => {
        const movieId = e.currentTarget.getAttribute("data-id");
        window.location.href = `movie.html?id=${movieId}`; // Redirige vers la page de détails
      });
    });
  } catch (error) {
    console.error("Fetch error: ", error);
  }
}

// Ajout d'un écouteur d'événement au bouton de recherche
searchBtn.addEventListener("click", searchMovieByTitle);
searchInput.addEventListener("keypress", (event) => {
  if (event.key === " " || event.key === "Enter") {
    searchMovieByTitle();
  }
  searchMovie = "";
});

// Chargement initial des films populaires
getMovies();
