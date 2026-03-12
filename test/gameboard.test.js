import { Gameboard } from "../src/gameboard";

test("Add ships, destroy them", () => {
  const myGameboard = new Gameboard(10);

  expect(myGameboard.placeShip(3, true, 0, 0)).toBe(true);
  expect(myGameboard.placeShip(3, true, 1, 0)).toBe(false);
});
