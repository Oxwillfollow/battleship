import { Gameboard } from "../src/gameboard";
import { Ship } from "../src/ship";

test("Create ship, sink it", () => {
  const myShip = new Ship(3, true);

  myShip.hit();
  expect(myShip.isSunk()).toBe(false);
  myShip.hit();
  expect(myShip.isSunk()).toBe(false);
  myShip.hit();
  expect(myShip.isSunk()).toBe(true);
});

test("Add ships, destroy them", () => {
  const myGameboard = new Gameboard(10);

  expect(myGameboard.placeShip(3, true, 0, 0)).toBe(true);
  expect(myGameboard.placeShip(3, true, 1, 0)).toBe(false);
});
