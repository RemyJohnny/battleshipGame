class Gameboard {
  constructor() {
    this.Board = [];
    this.ships = [];
    this.isDefeated = false;
    this.initialize();
  }

  initialize() {
    for (let i = 0; i < 10; i += 1) {
      const row = [];
      for (let j = 0; j < 10; j += 1) {
        row.push("");
      }
      this.Board.push(row);
    }
  }

  placeShip(ship, row = 0, col = 0, direction = "horizontal") {
    let cords = [];
    let cordEdges = [];
    if (direction === "horizontal") {
      cordEdges.push([row, col - 1], [row - 1, col - 1], [row + 1, col - 1]);
      for (let i = 0; i < ship.length; i += 1) {
        if (
          row === undefined ||
          col === undefined ||
          this.Board[row][col] !== ""
        ) {
          //console.log("ship cannot be placed here");
          return false;
        }
        cords.push([row, col]);
        cordEdges.push([row - 1, col], [row + 1, col]);
        col += 1;
      }
      cordEdges.push([row, col], [row - 1, col], [row + 1, col]);
    } else if (direction === "vertical") {
      cordEdges.push([row - 1, col - 1], [row - 1, col], [row - 1, col + 1]);

      for (let i = 0; i < ship.length; i += 1) {
        if (
          row === undefined ||
          col === undefined ||
          this.Board[row][col] !== ""
        ) {
          //console.log("ship cannot be placed here");
          return false;
        }
        cords.push([row, col]);
        cordEdges.push([row, col - 1], [row, col + 1]);
        row += 1;
      }
      cordEdges.push([row, col - 1], [row, col], [row, col + 1]);
    }
    cords.forEach((cord) => {
      const [row, col] = cord;
      this.Board[row][col] = ship;
    });
    cordEdges.forEach((cord) => {
      const [row, col] = cord;
      if (row <= 9 && row >= 0 && col <= 9 && col >= 0) {
        this.Board[row][col] = "o";
      }
    });
    ship.setLocation(cords);
    this.ships.push(ship);
    return true;
  }

  receiveAttack(cord) {
    const [row, col] = cord;
    let cell = this.Board[row][col];
    if (cell === "X") {
      console.log("cannot shot one cell twice");
      return null;
    }
    if (cell !== "" && cell !== "o") {
      let ship = cell;
      ship.Hit();
      this.Board[row][col] = "X";
      this.defeated();
      return true;
    } else if (cell === "" || cell === "o") {
      this.Board[row][col] = "X";
      this.defeated();
      return null;
    }
  }

  defeated() {
    for (let i = 0; i < this.ships.length; i += 1) {
      const ship = this.ships[i];
      if (!ship.isSunk) {
        this.isDefeated = false;
        return false;
      }
    }
    this.isDefeated = true;
    return true;
  }
  clearBoard() {
    for (let i = 0; i < this.Board.length; i += 1) {
      for (let j = 0; j < this.Board[i].length; j += 1) {
        this.Board[i][j] = "";
      }
    }
    this.ships = [];
  }
}

module.exports = Gameboard;
