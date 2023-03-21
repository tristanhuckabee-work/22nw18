import Board from "./board.js";

window.onload = makeState();

function makeState() {
  let board = new Board(); // creates a new game board

  makeControls();
  makeBoard(board);
}
function makeBoard(bClass) {
  let grid = bClass.grid;
  let boardDiv = document.createElement('div');
  boardDiv.id = 'board';
  grid.forEach((row, i) => {
    row.forEach((cell, j) => {
      let cellDiv = document.createElement('div');
      cellDiv.classList.add('cell');
      cellDiv.dataset.value = cell;
      cellDiv.addEventListener('click', e => {
        let res = bClass.makeHit(i, j);
        if (!res) {
          cellDiv.classList.add('miss');
        } else {
          cellDiv.innerText = res;
          cellDiv.classList.add('hit');
          let win = bClass.isGameOver();
          if (win) {
            let winModal = document.querySelector('span');
            winModal.display = 'inline-block';
          }
        }
      })

      boardDiv.append(cellDiv);
    })
  });

  document.body.append(boardDiv);
}
function makeControls() {
  let controls = document.createElement('div');
  controls.id = 'controls';
  let span = '<span>You Win!</span>';
  let reset = document.createElement('button');
  reset.id = 'reset';
  reset.innerText = 'Reset Game'
  reset.addEventListener('click', e => {
    let controls = document.querySelector('#controls');
    let board = document.querySelector('#board');
    controls.remove();
    board.remove();

    makeState();
  })

  controls.innerHTML = span;
  controls.append(reset);
  document.body.append(controls);
}