import { Player } from "./player";
import { Ship } from "./ship";
import fireImg from "./images/fire.svg";
import circleImg from "./images/circle.svg";

const myDOM = {};
let playerHuman = new Player("Player");
let playerComputer = new Player("Computer", true);
let currentTurn = 0;

export function init() {
  cacheDOM();
  resetGame();
  bindEvents();
}

function cacheDOM() {
  myDOM.player1Board = document.getElementById("player1");
  myDOM.player2Board = document.getElementById("player2");
  myDOM.player1ShipsRemainingTxt = document.getElementById("player1-ships");
  myDOM.player2ShipsRemainingTxt = document.getElementById("player2-ships");
  myDOM.resetBtn = document.getElementById("reset-btn");
  myDOM.turnTxt = document.getElementById("turn");
}

function bindEvents() {
  myDOM.resetBtn.addEventListener("click", resetGame);
}

function resetGame() {
  currentTurn = 0;
  changeTurn();

  playerHuman = new Player("Player");
  playerComputer = new Player("Computer", true);

  clearBoard(myDOM.player1Board);
  clearBoard(myDOM.player2Board);

  createBoard(playerHuman, myDOM.player1Board);
  createBoard(playerComputer, myDOM.player2Board);

  addRandomShipsToPlayer(playerHuman);
  addRandomShipsToPlayer(playerComputer);

  updateBoard(playerHuman, myDOM.player1Board);
  updateBoard(playerComputer, myDOM.player2Board);
}

function createBoard(player, boardContainer) {
  for (let i = 0; i < player.gameBoard.size; i++) {
    for (let j = 0; j < player.gameBoard.size; j++) {
      let cell = document.createElement("div");
      cell.classList.add("gameboard-cell");
      cell.style.position = "relative";
      cell.dataset.xy = `${j}, ${i}`;
      if (player === playerComputer) {
        cell.addEventListener("click", (evt) => onEnemyCellClicked(evt));
      }
      boardContainer.appendChild(cell);
    }
  }
}

function changeTurn() {
  currentTurn++;

  // human turns are odd
  if (currentTurn % 2 !== 0)
    myDOM.turnTxt.textContent = `Turn ${Math.round(currentTurn / 2)}: ${playerHuman.name}`;
  else {
    myDOM.turnTxt.textContent = `Turn ${Math.round(currentTurn / 2)}: ${playerComputer.name}`;
    setTimeout(computerTurn, 700); // add delay to simulate computer thinking
  }
}

function onEnemyCellClicked(evt) {
  let coords = evt.currentTarget.dataset.xy.split(", ");

  // human turns are odd
  if (currentTurn % 2 !== 0) {
    let result = playerComputer.gameBoard.receiveAttack(coords[0], coords[1]);

    if (result.target === "invalid") return; // already tried this cell

    updateAttackResult(result, evt.currentTarget);

    changeTurn();
  }
}

function updateAttackResult(result, cell) {
  let attackIcon = document.createElement("img");

  if (result.target === "empty") {
    attackIcon.src = circleImg;
    console.log("missed!");
  } else {
    attackIcon.src = fireImg;
    console.log("hit a ship!");
    if (result.target.isSunk()) {
      console.log("ship sunk!");
      if (currentTurn % 2 !== 0) {
        playerComputer.shipsSunk++;
        myDOM.player2ShipsRemainingTxt.textContent = `Ships remaining: ${5 - playerComputer.shipsSunk}`;
      } else {
        playerHuman.shipsSunk++;
        myDOM.player1ShipsRemainingTxt.textContent = `Ships remaining: ${5 - playerHuman.shipsSunk}`;
      }
    }
  }
  attackIcon.style.position = "absolute";
  attackIcon.style.top = 0;
  cell.appendChild(attackIcon);
}

function computerTurn() {
  // pick random cell that hasn't been fired yet
  let cellsNotFiredYet = [];

  for (let i = 0; i < playerHuman.gameBoard.size; i++) {
    for (let j = 0; j < playerHuman.gameBoard.size; j++) {
      cellsNotFiredYet.push([i, j]);
    }
  }

  cellsNotFiredYet.filter(
    (cell) => !playerHuman.gameBoard.shots.includes(cell),
  );

  let randomIndex = Math.floor(Math.random() * cellsNotFiredYet.length);
  let x = cellsNotFiredYet[randomIndex][0];
  let y = cellsNotFiredYet[randomIndex][1];

  let result = playerHuman.gameBoard.receiveAttack(x, y);
  let cell = myDOM.player1Board.querySelector(`[data-xy="${x}, ${y}"]`);

  if (result.target === "invalid")
    throw Error("Computer chose an invalid move!");

  updateAttackResult(result, cell);

  changeTurn();
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

        let cell = boardContainer.querySelector(`[data-xy="${i}, ${j}"]`);
        cell.appendChild(shipDiv);
      }
    }
  }
}

function clearBoard(boardContainer) {
  while (boardContainer.childElementCount > 0) {
    boardContainer.firstChild.remove();
  }
}
