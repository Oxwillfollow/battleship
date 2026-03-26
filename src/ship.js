export class Ship {
  #hits = 0;

  constructor(length, isHorizontal) {
    this.length = length;
    this.isHorizontal = isHorizontal;
  }

  hit() {
    this.#hits++;
  }

  isSunk() {
    if (this.#hits >= this.length) return true;
    return false;
  }
}
