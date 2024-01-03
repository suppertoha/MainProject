const filmContainer = document.querySelector('.film-search');

function showMoviesBlock() {
  if (!filmContainer) return

  const API_KEY = "8c8e1a50-6322-4135-8875-5d40a5420d86";
  const API_URL_POPULAR =
    "https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=1";

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

  function showMovies(data) {
    const bodyMovie = document.querySelector('.block-film__items');

    data.films.forEach((movie) => {
      console.log(movie)
    })
  }


}

showMoviesBlock()
