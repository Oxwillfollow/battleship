import { Ship } from "./ship";

export class Gameboard {
  #board = [[]];

  constructor(size) {
    this.size = size;
  }

  placeShip(length, isHorizontal, x, y) {
    if (x < 0 || x >= this.size || y < 0 || y >= this.size)
      throw Error("Coordinates outside the bounds of the game board!");

    if (length < 1) throw Error("Ship length needs to be at least 1!");
    if (length > this.size) throw Error("Ship too large for the board!");

    const ship = new Ship(length, isHorizontal);

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
