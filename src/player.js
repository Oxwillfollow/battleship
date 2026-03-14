import { Gameboard } from "./gameboard";

export class Player {
  constructor(name, isComputer) {
    this.name = name;
    this.isComputer = isComputer;
    this.gameBoard = new Gameboard();
  }
}
