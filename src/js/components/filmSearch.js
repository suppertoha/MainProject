const filmContainer = document.querySelector(".film-search");

function showMoviesBlock() {
  if (!filmContainer) return;

  const API_KEY = "f0a4b279-82ec-49ae-95e5-b7b20072cc19";
  const API_URL_POPULAR =
    "https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=1";
  const API_URL_SEARCH =
    "https://kinopoiskapiunofficial.tech/api/v2.2/films?order=RATING&type=ALL&ratingFrom=0&ratingTo=10&yearFrom=1000&yearTo=3000&page=1";

  getMovies(API_URL_POPULAR);

  async function getMovies(url) {
    const resp = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": API_KEY,
      },
    });
    const respData = await resp.json();
    showMovies(respData);
  }

  function getClassByRate(vote) {
    if (vote >= 7) {
      return "green";
    } else if (vote > 5) {
      return "orange";
    } else {
      return "red";
    }
  }

  function showTheRating(element) {
    if (element !== null && element !== undefined) {
      return `${element}`;
    } else {
      return ` `;
    }
  }

  function showMovies(data) {
    const bodyMovie = document.querySelector(".cards-film__items");
    bodyMovie.innerHTML= ' '

    data.films.forEach((movie) => {
      console.log(movie);

      const cardFilm = document.createElement("li");
      cardFilm.classList.add("cards-film__card");
      cardFilm.classList.add("card-film");
      cardFilm.innerHTML = `<div class="card-film__inner">
          <div class="card-film__image">
            <img src="${movie.posterUrlPreview}" alt="${movie.nameRu}">
          </div>

          <div class="card-film__body">
            <div class="card-film__type">${movie.genres.map(
              (genre) => ` ${genre.genre}`
            )}</div>
            <div class="card-film__name">
              ${movie.nameRu}
            </div>
            <div class="card-film__year">
              ${movie.nameRu}
            </div>

            <div class="card-film__rating card-film__rating--${getClassByRate(
              movie.rating
            )}">
              ${showTheRating(movie.rating)}
            </div>

            <button class="card-film__button btn">Просмотреть</button>

          </div>
        </div>
      `;

      bodyMovie.appendChild(cardFilm);
    });
  }

  const menuSearch = document.querySelector(".menu-search");
  const inputSearch = document.querySelector(".menu-search__input");
  menuSearch.addEventListener("submit", (e) => {
    e.preventDefault();

    const apiSearchUrl = `${API_URL_SEARCH}${inputSearch.value}`;
    if (inputSearch.value) {
      getMovies(apiSearchUrl);

      inputSearch.value = '';
    }
  });
}

showMoviesBlock();
