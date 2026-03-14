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

test("Add ship, destroy it", () => {
  const myGameboard = new Gameboard(10);
  const ship1 = new Ship(3, true);

  expect(myGameboard.placeShip(ship1, 0, 0)).toBe(true);

  myGameboard.receiveAttack(0, 0);
  myGameboard.receiveAttack(1, 0);

  expect(ship1.isSunk()).toBe(false);

  myGameboard.receiveAttack(2, 0);

  expect(ship1.isSunk()).toBe(true);
});
