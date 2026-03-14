import { Ship } from "./ship";

export class Gameboard {
  #board = [];
  #shots = [];

  constructor(size = 10) {
    this.size = size;

    // create a 2 dimensional board array of `size` x `size`, assigning `null` to each cell
    for (let x = 0; x < size; x++) {
      this.#board[x] = [];
      for (let y = 0; y < size; y++) {
        this.#board[x].push(null);
      }
    }
  }

  placeShip(ship, x, y) {
    if (x < 0 || x >= this.size || y < 0 || y >= this.size)
      throw Error("Coordinates outside the bounds of the game board!");

    if (ship.length < 1) throw Error("Ship length needs to be at least 1!");
    if (ship.length > this.size) throw Error("Ship too large for the board!");

    if (this.#canPlaceShip(ship, x, y)) {
      if (ship.isHorizontal) {
        for (let i = 0; i < ship.length; i++) {
          this.#board[x + i][y] = ship;
        }
      } else {
        for (let i = 0; i < ship.length; i++) {
          this.#board[x][y + i] = ship;
        }
      }

      return true;
    }

    return false;
  }

  receiveAttack(x, y) {
    if (this.#shots.some((shot) => shot[0] === x && shot[1] === y))
      throw Error("A shot has already been fired to this cell!");

    this.#shots.push([x, y]);

    let ship = this.#board[x][y];

    if (ship) {
      ship.hit();
      if (ship.isSunk) {
        console.log("Ship destroyed!");
      }
    }
  }

  #canPlaceShip(ship, x, y) {
    if (ship.isHorizontal) {
      for (let i = 0; i < ship.length; i++) {
        if (this.#board[x + i][y]) return false;
      }
    } else {
      for (let i = 0; i < ship.length; i++) {
        if (this.#board[x][y + i]) return false;
      }
    }

    return true;
  }
}
