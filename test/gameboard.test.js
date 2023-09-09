const ship = require("../src/ship");
const Gameboard = require("../src/gameboard");

let gameboard = new Gameboard();

test("placeShip() test 1", () => {
  let boat = ship(3);
  expect(gameboard.placeShip(boat, 0, 0, "horizontal")).toBe(true);
});

test("placeShip() test 2 overlapping", () => {
  let boat = ship(3);
  expect(gameboard.placeShip(boat, 0, 0, "horizontal")).toBe(false);
});

test("placeShip() test 2 overflow first case", () => {
  let boat = ship(3);
  expect(gameboard.placeShip(boat, 0, 8, "horizontal")).toBe(false);
});

test("defeated() test 1", () => {
  let boat = ship(3);
  let boat2 = ship(1);
  let gameboard = new Gameboard();
  gameboard.placeShip(boat, 0, 0, "horizontal");
  gameboard.placeShip(boat2, 9, 9, "vertical");
  gameboard.receiveAttack([0, 1]);
  gameboard.receiveAttack([9, 9]);
  gameboard.receiveAttack([0, 0]);
  gameboard.receiveAttack([0, 2]);
  expect(gameboard.defeated()).toBe(true);
});

test("defeated() test ", () => {
  let boat = ship(3);
  let boat2 = ship(1);
  let gameboard = new Gameboard();
  gameboard.placeShip(boat, 0, 0, "horizontal");
  gameboard.placeShip(boat2, 9, 9, "vertical");
  gameboard.receiveAttack([0, 1]);
  //gameboard.receiveAttack([9, 9]);
  gameboard.receiveAttack([0, 0]);
  gameboard.receiveAttack([0, 2]);
  expect(gameboard.defeated()).toBe(false);
});
