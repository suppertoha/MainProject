const $app = document.querySelector('.app');

function CatchTheSquare() {
  if (!$app) return

  const $start = $app.querySelector('#start'),
  $game = $app.querySelector('#game'),
  $time = $app.querySelector('#time'),
  $resultHeader = $app.querySelector('#result-header'),
  $gameTime = $app.querySelector('#game-time'),
  $result = $app.querySelector('#result'),
  $reset = $app.querySelector('#reset'),
  $timeHeader = $app.querySelector('#time-header');

  let score = 0
  let isGameStarted = false;
  let resScore = 0;
  let resCount = 0;

  let timeAndScore = {};

  $start.addEventListener('click', startGame);
  $game.addEventListener('click', work);
  $reset.addEventListener('click', endGame);
  $gameTime.addEventListener('input', setGameTime);

  function startGame() {
    isGameStarted = true;
    score = 0;
    setGameTime()
    remove($timeHeader)
    add($resultHeader)
    $game.style.background = '#fff';
    this.classList.add('hide');
    elementGame()
    $gameTime.disabled = true;
    setIntervalGame()
  }

  function setIntervalGame() {
    let interval = setInterval(function(){
      let time = parseFloat($time.textContent);

      if(time <= 0 || !isGameStarted){
        clearInterval(interval);
        endGame()
      }
      else {
        time = (time - 0.1).toFixed(1);
        $time.textContent = time.toString()

      }
    }, 100);
  }

  function endGame() {
    isGameStarted = false;
    setGameScore()
    $game.style.background = '#1d1d1d';
    $game.innerHTML = ''
    remove($resultHeader)
    remove($start)
    add($timeHeader)
    $gameTime.disabled = false;
    local()
  }

  function work(e) {
    if (!isGameStarted) return;
    if (e.target.dataset.square === 'true') {
      $game.innerHTML = '';
      elementGame()
      score++
    }
  }

  function setGameScore(){
    $result.textContent = score.toString()
    resScore = +score;
    return resScore;
  }

  function setGameTime() {
    $gameTime.value = $gameTime.value.replace(/[^0-9]/g, '');
    let count = $gameTime.value;
    remove($timeHeader)
    add($resultHeader)
    $time.textContent = count;
    resCount = +count;
    return resCount;
  }

  function elementGame() {
    const $square = document.createElement('div');
    const size = randomValue(30, 100);
    const top = $game.offsetHeight - size;
    const left = $game.offsetWidth - size;

    $square.setAttribute('data-square', 'true');
    $square.style.cssText = 'position: absolute; cursor: pointer';
    $square.style.width = $square.style.height = size + 'px';
    $square.style.top = randomValue(0, top) + 'px';
    $square.style.left = randomValue(0, left) + 'px';
    $square.style.background = `rgb(${randomValue(0, 255)} ${randomValue(0, 255)} ${randomValue(0, 255)})`;
    $game.insertAdjacentElement('afterbegin', $square);
  }

  function randomValue(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function remove($el) {
    $el.classList.remove('hide');
  }

  function add($el) {
    $el.classList.add('hide');
  }

  function local() {

  }


}

CatchTheSquare()


