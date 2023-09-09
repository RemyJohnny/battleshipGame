const ship = require("../src/ship");

test("First test ", () => {
  const boat = ship(3);
  boat.Hit();
  expect(boat.hits).toBe(1);
  expect(boat.isSunk).toBe(false);
});

test("Second test", () => {
  const boat = ship(3);
  boat.Hit();
  boat.Hit();
  boat.Hit();
  expect(boat.hits).toBe(3);
  expect(boat.isSunk).toBe(true);
});
