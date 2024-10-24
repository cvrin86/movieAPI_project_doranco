"use strict";

const keyApi = "cc21ebb0db4ce9af88a32340aab320b7";

const container = document.querySelector(".movie-container");

// Fonction pour récupérer les paramètres de l'URL
function getMovieIdFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

// Fonction pour afficher les détails du film
async function displayMovieDetails(movieId) {
  try {
    // Récupérer les détails du film
    const movieResponse = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?&language=fr-FR&api_key=${keyApi}`
    );
    const movie = await movieResponse.json();

    // Récupérer les vidéos du film (bande-annonces)
    const videosResponse = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${keyApi}&language=fr-FR`
    );
    const videos = await videosResponse.json();
    console.log(videos);
    // Trouver la bande-annonce
    const trailer = videos.results.find((video) => video.type === "Trailer");

    // Formater la date de sortie
    const releaseDate = new Date(movie.release_date);
    const formattedDate = releaseDate.toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    // Construction de la chaîne HTML pour les détails du film avec la bande-annonce
    let html = `
      <article class="movie-details">
        ${
          trailer
            ? `<iframe width="100%" height="400px" src="https://www.youtube.com/embed/${trailer.key}" frameborder="0" allowfullscreen></iframe>`
            : `<p>Aucune bande-annonce disponible.</p>`
        }
        <h2 class="movie-title">${movie.title}</h2>
        <p class="movie-description">${movie.overview}</p>
        <p class="movie-release-date"><strong>Date de sortie :</strong> ${formattedDate}</p>
        <p class="movie-genres"><strong>Genres :</strong> ${movie.genres
          .map((genre) => genre.name)
          .join(", ")}</p>
      </article>
    `;

    // Utilisation de insertAdjacentHTML pour insérer le HTML
    container.insertAdjacentHTML("beforeend", html);
  } catch (error) {
    console.error("Fetch error: ", error); // Affichage de l'erreur en console
  }
}

// Récupère l'ID du film depuis l'URL et affiche ses détails
const movieId = getMovieIdFromURL(); // Récupération de l'ID du film
if (movieId) {
  // Vérification si l'ID existe
  displayMovieDetails(movieId); // Appel de la fonction pour récupérer les détails du film
} else {
  console.error("No movie ID found in the URL."); // Gestion de l'absence d'ID
}
