
Movie Api 

MovieApinest une application web simple créée dans le cadre de ma formation de concepteur developpeur dans le but de s'habituer à travailler avec les API et le DOM  en utilisant Vanilla Js.
Ce website permet aux utilisateurs de rechercher et de decouvrir des films populaires ou récemment sortiés en utilisant l'API The Movie Database(TMDN). L'application inclut des fonctionnalités de pagination, de recherche par titre, et un accès direct aux détails des films.

Fonctionnalités

 - Affichage des films populaires : Lors du chargement initial, les films populaires sont affichés.
- Pagination : Les utilisateurs peuvent charger plus de films avec un bouton "Voir plus".
- Recherche de films par titre : Une barre de recherche permet de trouver des films spécifiques par leur titre.
- Affichage des films en salle : Un bouton pour afficher les films actuellement en salle (fonction "now playing").

Prérequis

 - Clé API TMDB : Vous aurez besoin d'une clé API de The Movie Database pour que l'application puisse récupérer les données des films.

   Installation
Clonez ce dépôt dans votre environnement local :
Copier le code
git clone https://github.com/cvrin86/movieAPI.git

Naviguez dans le répertoire du projet :
cd movieAPI
Remplacez la clé API (actuellement keyApi) par votre propre clé API TMDB dans le fichier JavaScript principal.

Utilisation
Ouvrez le fichier index.html dans votre navigateur pour accéder à l'application.


Pour un fichier README.md bien structuré et complet pour ce projet, voici un exemple :

Movie Finder
Movie Finder est une application web simple permettant aux utilisateurs de rechercher et de découvrir des films populaires ou récemment sortis en utilisant l'API The Movie Database (TMDB). L'application inclut des fonctionnalités de pagination, de recherche par titre, et un accès direct aux détails des films.

Fonctionnalités
Affichage des films populaires : Lors du chargement initial, les films populaires sont affichés.
Pagination : Les utilisateurs peuvent charger plus de films avec un bouton "Voir plus".
Recherche de films par titre : Une barre de recherche permet de trouver des films spécifiques par leur titre.
Affichage des films en salle : Un bouton pour afficher les films actuellement en salle (fonction "now playing").
Prérequis
Clé API TMDB : Vous aurez besoin d'une clé API de The Movie Database pour que l'application puisse récupérer les données des films.
Installation
Clonez ce dépôt dans votre environnement local :

bash
Copier le code
git clone https://github.com/votreutilisateur/movie-finder.git
Naviguez dans le répertoire du projet :

bash
Copier le code
cd movie-finder
Remplacez la clé API (actuellement keyApi) par votre propre clé API TMDB dans le fichier JavaScript principal.

Utilisation
Ouvrez le fichier index.html dans votre navigateur pour accéder à l'application.

Code principal
Initialisation et sélection des éléments du DOM
Lors du chargement de la page (DOMContentLoaded), le code récupère les éléments du DOM nécessaires pour l'interaction, comme le conteneur des films (containerMovies), les boutons pour voir plus de films (btnSeeMore), la recherche (searchBtn et searchInput), et l'affichage des films en salle (btnNowPlaying).

Fonctions principales
fetchMovies(endpoint, page = 1)
Fonction asynchrone qui effectue un appel à l'API TMDB pour récupérer des films. Elle met à jour la variable moviesCache pour stocker les films reçus et appelle displayMovies() pour les afficher.

displayMovies()
Cette fonction génère les cartes de films avec des informations de base (affiche et titre) et les ajoute dans le conteneur. Elle appelle également attachMovieClickEvents() pour ajouter un événement de clic sur chaque carte de film.

attachMovieClickEvents()
Ajoute un événement de clic sur chaque carte de film pour rediriger l’utilisateur vers une page de détails (movie.html?id={movieId}) pour obtenir plus d'informations sur le film sélectionné.

searchMovieByTitle()
Fonction qui exécute une recherche par titre de film, vide le cache et le conteneur, et affiche les résultats correspondant à la requête de l'utilisateur.

Gestion des événements
Recherche de films : En cliquant sur searchBtn ou en appuyant sur la touche "Entrée" dans searchInput, la fonction searchMovieByTitle() est déclenchée.
Voir plus de films : En cliquant sur btnSeeMore, l'application charge la page suivante de films populaires.
Films en salle : En cliquant sur btnNowPlaying, le conteneur et le cache sont réinitialisés, puis les films en salle sont chargés.
Chargement initial
L'application charge les films populaires lors de l'initialisation de la page via fetchMovies("popular").

Exemple de code
javascript
Copier le code
// Extrait du code
async function fetchMovies(endpoint, page = 1) {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${endpoint}?api_key=${keyApi}&page=${page}`
    );
    if (!response.ok) throw new Error("Erreur réseau");

    const data = await response.json();
    totalPages = data.total_pages;
    moviesCache.push(...data.results);
    displayMovies();

    if (currentPage >= totalPages) btnSeeMore.style.display = "none";
  } catch (error) {
    console.error("Erreur de récupération des films : ", error);
  }
}
Technologies

HTML : Structure de base de la page.
CSS : Style de l'interface utilisateur.
JavaScript : Logique principale de l'application et gestion des appels API.
API TMDB : Fournit les données sur les films populaires, les films en salle et les résultats de recherche.

Améliorations possibles

Pagination améliorée : Utilisation d'un système de pagination plus sophistiqué.
Filtres supplémentaires : Ajouter des filtres pour les genres, les années de sortie, etc.
Page de détails pour les films : Créer une page détaillée avec des informations complètes sur le film sélectionné.

Auteurs
Votre Nom : Cristina Vrinceanu
