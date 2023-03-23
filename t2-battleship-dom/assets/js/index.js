import Board from "./board.js";

window.onload = resetGame;

function resetGame() {
  let board = new Board(); // creates a new game board
  makeControls();
  makeBoard(board);
}

function makeBoard(board) {
  let gameboard = board.grid;
  let boardDiv = document.createElement('div');
  boardDiv.id = 'board';

  gameboard.forEach((row, i) => {
    row.forEach((cell, j) => {
      let cellDiv = document.createElement('div');
      cellDiv.classList.add('cell');
      cellDiv.addEventListener('click', cellClick)

      boardDiv.append(cellDiv);
      function cellClick() {
        let hit = board.makeHit(i, j);
        if (hit) {
          cellDiv.classList.add('hit');
          cellDiv.innerText = cell;
          let win = board.isGameOver();
          if (win) {
            let cells = document.querySelectorAll('#board > .cell');
            cells.forEach(bCell => {
              bCell.style.pointerEvents = 'none';
            });

            let winDiv = document.createElement('div');
            winDiv.innerText = 'YOU WIN!'
            document.body.append(winDiv);
          }
        } else {
          cellDiv.classList.add('miss');
        }
      }
    })
  })

  document.body.append(boardDiv);
}
function makeControls() {
  let reset = document.createElement('button');
  reset.innerText = 'Reset Game';
  reset.addEventListener('click', e => {
    let resetButton = document.querySelector('button');
    let boardDiv = document.querySelector('#board');
    resetButton.remove();
    boardDiv.remove();

    resetGame()
  });

  document.body.append(reset);
}