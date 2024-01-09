const filmContainer = document.querySelector(".film-search");

function showMoviesBlock() {
  if (!filmContainer) return;

  const API_KEY = "f0a4b279-82ec-49ae-95e5-b7b20072cc19";
  const API_URL_POPULAR =
    "https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=1";
  const API_URL_SEARCH =
    "https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=";
  const  API_URL_DETAILS = 'https://kinopoiskapiunofficial.tech/api/v2.2/films/'

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
      cardFilm.addEventListener('click', function (e) {
        if (e.target.classList.contains('card-film__button')) {
          openModal(movie.filmId)
        }
      })
      bodyMovie.appendChild(cardFilm);
    });
  }

  const menuSearch = document.querySelector(".menu-search");
  const inputSearch = document.querySelector(".menu-search__input");
  const genres = document.querySelector('.menu-search__select');
  menuSearch.addEventListener("submit", (e) => {
    e.preventDefault();

    const apiSearchUrl = `${API_URL_SEARCH}${inputSearch.value}`;
    const apiSearchGenres = `${API_URL_SEARCH}${genres.value}`;

    if ((inputSearch.value).trim() === '' && genres.value === '') return;

    if (inputSearch.value) {
      getMovies(apiSearchUrl);
      inputSearch.value = '';
    } else {
      getMovies(apiSearchGenres);
    }
  });


  const modalEl = document.querySelector('.modal');
  const body = document.querySelector('body')

  async function openModal(id) {

    const resp = await fetch(API_URL_DETAILS + id, {
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": API_KEY,
      },
    });
    const respData = await resp.json();
    modalEl.classList.add('modal--show');
    body.classList.add('stop-scrolling');
    modalEl.innerHTML = `
      <div class="modal__card">
        <img class="modal__movie-backdrop" src="${respData.posterUrl}" alt="">
        <h2>
          <span class="modal__movie-title">${respData.nameRu}</span>
          <span class="modal__movie-release-year"> - ${respData.year}</span>
        </h2>
        <ul class="modal__movie-info">
          <div class="loader"></div>
          <li class="modal__movie-genre">Жанр - ${respData.genres.map((el) => `<span>${el.genre}</span>`)}</li>
          ${respData.filmLength ? `<li class="modal__movie-runtime">Время - ${respData.filmLength} минут</li>` : ''}
          <li >Сайт: <a class="modal__movie-site" href="${respData.webUrl}">${respData.webUrl}</a></li>
          <li class="modal__movie-overview">Описание - ${respData.description}</li>
        </ul>
        <button type="button" class="btn modal__button-close">Закрыть</button>
      </div>
    `
    const modalClose = document.querySelector('.modal__button-close');
    modalClose.addEventListener('click', ()=> closeModal());
  }

  function closeModal() {
    modalEl.classList.remove('modal--show');
    body.classList.remove('stop-scrolling');
  }

  document.addEventListener('click', function (e) {
    if (e.target.classList.contains('modal--show')) {
      closeModal()
    }
  })

  document.addEventListener('keydown', function(event) {
    const key = event.key;
    const keyCode = event.keyCode;
    if (keyCode === 27 || key === 'Escape') {
      closeModal()
    }
  });
}

showMoviesBlock();
