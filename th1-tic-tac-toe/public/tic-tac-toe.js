// Your code here
window.onload = () => {
  localStorage.setItem('turn', 1);
  let currTurn = localStorage.getItem('turn');
  let turn;
  if (currTurn) {
    turn = currTurn/1;
  } else {
    turn = 1;
  }
  let win;
  
  const winner = document.querySelector('h1');
  const board = document.querySelector('#board');
  
  let gameState = localStorage.getItem('state');
  
  if (state) {
    board.innerHTML = gameState;
  }
  localStorage.setItem('state', board.innerHTML);
  const squares = document.querySelectorAll('.square');
  const newGame = document.querySelector('.new');
  const giveUp = document.querySelector('.quit');

  if (!win) {
    newGame.setAttribute('disabled', 'true');
  }
  giveUp.addEventListener('click', e => { giveUpFunc(turn) });

  squares.forEach(el => {
    el.addEventListener('click', () => {
      if (turn && !el.dataset.occupied && !win) {
        let forSpecs = document.createElement('img');
        forSpecs.src = "https://assets.aaonline.io/Module-DOM-API/formative-project-tic-tac-toe/player-x.svg"
        el.append(forSpecs);

        el.style.backgroundImage = "url('https://assets.aaonline.io/Module-DOM-API/formative-project-tic-tac-toe/player-x.svg')";
        el.dataset.occupied = 0;
        turn = 0;
      } else if (!turn && !el.dataset.occupied && !win) {
        let forSpecs = document.createElement('img');
        forSpecs.src = "https://assets.aaonline.io/Module-DOM-API/formative-project-tic-tac-toe/player-o.svg"
        el.append(forSpecs);

        el.style.backgroundImage = "url('https://assets.aaonline.io/Module-DOM-API/formative-project-tic-tac-toe/player-o.svg')";
        el.dataset.occupied = 1
        turn = 1;
      }
      localStorage.setItem('turn', turn);
      localStorage.setItem('state', board.innerHTML);
      win = checkWin();
      if (win) {
        winner.innerText = `Winner: ${win}`;
        giveUp.setAttribute('disabled', 'true');
        newGame.removeAttribute('disabled');
        newGame.addEventListener('click', newGameFunc);
      }
    })
  })

  function newGameFunc() {
    win = undefined;
    winner.innerText = '';
    turn = 1;
    squares.forEach(el => {
      let img = document.querySelector('img');
      if (img) {
        img.remove();
      }
      el.removeAttribute('style');
      el.removeAttribute('data-occupied');
    })

    newGame.setAttribute('disabled', 'true');
    giveUp.removeAttribute('disabled');
    board.removeAttribute('style');
  }
  function giveUpFunc(player) {
    const winner = document.querySelector('h1');
    const newGame = document.querySelector('.new');
    const giveUp = document.querySelector('.quit');

    if (player) {
      winner.innerText = `Winner: O`;
    } else {
      winner.innerText = `Winner: X`;
    }

    newGame.removeAttribute('disabled');
    newGame.addEventListener('click', newGameFunc);
    giveUp.setAttribute('disabled', 'true');
    board.style.pointerEvents = 'none';
  }
}

function checkWin() {
  let tl = document.querySelector('#square-0').dataset.occupied;
  let tc = document.querySelector('#square-1').dataset.occupied;
  let tr = document.querySelector('#square-2').dataset.occupied;
  let ml = document.querySelector('#square-3').dataset.occupied;
  let mc = document.querySelector('#square-4').dataset.occupied;
  let mr = document.querySelector('#square-5').dataset.occupied;
  let bl = document.querySelector('#square-6').dataset.occupied;
  let bc = document.querySelector('#square-7').dataset.occupied;
  let br = document.querySelector('#square-8').dataset.occupied;

  const isAllX = (curr) => curr === '0';
  const isAllO = (curr) => curr === '1';
  const isDraw = (curr) => curr;
  let allTiles = [tl, tc, tr, ml, mc, mr, bl, bc, br];
  let winner = null;

  // check rows
  let top = [tl, tc, tr];
  let mid = [ml, mc, mr];
  let bot = [bl, bc, br];
  if (top.every(isAllX) || mid.every(isAllX) || bot.every(isAllX)) winner = 'X';
  if (top.every(isAllO) || mid.every(isAllO) || bot.every(isAllO)) winner = 'O';

  // check cols
  let left = [tl, ml, bl];
  let cent = [tc, mc, bc];
  let right = [tr, mr, br];
  if (left.every(isAllX) || cent.every(isAllX) || right.every(isAllX)) winner = 'X';
  if (left.every(isAllO) || cent.every(isAllO) || right.every(isAllO)) winner = 'O';

  // check diagonals
  let tl2br = [tl, mc, br];
  let tr2bl = [tr, mc, bl];
  if (tl2br.every(isAllX) || tr2bl.every(isAllX)) winner = 'X';
  if (tl2br.every(isAllO) || tr2bl.every(isAllO)) winner = 'O';

  if (!winner && allTiles.every(isDraw)) {
    return 'None';
  } else {
    return winner;
  }
}