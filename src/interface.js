import { Player } from "./player";
import { Ship } from "./ship";

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

  addRandomShipsToPlayer(player1);
  addRandomShipsToPlayer(player2);

  updateBoard(player1, myDOM.player1Board);
  updateBoard(player2, myDOM.player2Board);
}

function createBoard(player, boardContainer) {
  for (let i = 0; i < player.gameBoard.size; i++) {
    for (let j = 0; j < player.gameBoard.size; j++) {
      let cell = document.createElement("div");
      cell.classList.add("gameboard-cell");
      cell.dataset.xy = `${j}, ${i}`;
      boardContainer.appendChild(cell);
    }
  }
}

function addRandomShipsToPlayer(player) {
  // add 5 ships to each player with different lengths, 5 to 1 square

  for (let i = 1; i <= 5; i++) {
    // make the ship horizontal or vertical randomly
    let random = Math.floor(Math.random() * 2);
    let ship = new Ship(i, random);

    // place ship at random coordinates, keep trying until it's valid
    let randomX = Math.floor(Math.random() * player.gameBoard.size);
    let randomY = Math.floor(Math.random() * player.gameBoard.size);

    while (!player.gameBoard.placeShip(ship, randomX, randomY)) {
      randomX = Math.floor(Math.random() * player.gameBoard.size);
      randomY = Math.floor(Math.random() * player.gameBoard.size);
    }
  }
}

function updateBoard(player, boardContainer) {
  for (let i = 0; i < player.gameBoard.size; i++) {
    for (let j = 0; j < player.gameBoard.size; j++) {
      let ship = player.gameBoard.board[i][j];
      if (ship) {
        let shipDiv = document.createElement("div");
        shipDiv.classList.add("ship");
        shipDiv.classList.add(`length-${ship.length}`);

        let cell = boardContainer.querySelector(`[data-xy="${j}, ${i}"]`);
        cell.appendChild(shipDiv);
      }
    }
  }
}

function clearBoard(boardContainer) {
  while (boardContainer.childCount > 0) {
    boardContainer.getChild(0).remove();
  }
}
