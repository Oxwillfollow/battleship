import { Player } from "./player";

const myDOM = {};
let player1 = null;
let player2 = null;

export function init() {
  cacheDOM();
  resetGame();
}

function cacheDOM() {
  myDOM.player1Board = document.getElementById("player1");
  myDOM.player2Board = document.getElementById("player2");
}

function resetGame() {
  player1 = new Player("Player");
  player2 = new Player("Computer", true);

  clearBoard(myDOM.player1Board);
  clearBoard(myDOM.player2Board);

  createBoard(player1, myDOM.player1Board);
  createBoard(player2, myDOM.player2Board);
}

function createBoard(player, boardContainer) {
  for (let i = 0; i < player.gameBoard.size; i++) {
    for (let j = 0; j < player.gameBoard.size; j++) {
      let cell = document.createElement("div");
      cell.classList.add("gameboard-cell");
      cell.dataset.x = j;
      cell.dataset.y = i;
      boardContainer.appendChild(cell);
    }
  }
}

function addShips(player, boardContainer) {}

function clearBoard(boardContainer) {
  while (boardContainer.childCount > 0) {
    boardContainer.getChild(0).remove();
  }
}
