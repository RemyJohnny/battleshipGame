import "./style.css";
const ship = require("./ship.js");
const Gameboard = require("./gameboard.js");
const Player = require("./player.js");
const computer = require("./remy_AI.js");
const game = require("./game.js");
const Control = require("./controller.js");

//game.playRound([3, 3]);
//game.playRound([7, 0]);
//game.playRound(computer(game.enemy));
console.log(game.players);

// //player1.gameboard.receiveAttack([0, 1]);
// player2.attack(player1, [0, 1]);
// //player1.gameboard.receiveAttack([9, 9]);
// player2.attack(player1, [9, 9]);
// //player1.gameboard.receiveAttack([0, 0]);
// player2.attack(player1, [0, 0]);
// //player1.gameboard.receiveAttack([0, 2]);
// console.log(player2.attack(player1, [0, 2]));
// //player1.gameboard.receiveAttack(computer(player1));
// player2.attack(player1, computer(player1));
// console.log(player1.gameboard.isDefeated);
const page = document.querySelector(".page");
const winTab = document.querySelector("#winTab");

page.appendChild(Control.renderBoard(game.players[0]));
page.appendChild(Control.renderBoard(game.players[1], true));

const cells = document.querySelectorAll(".cell");
const replayBtn = document.querySelector("#replay");

cells.forEach((cell) => {
  cell.addEventListener("click", (e) => {
    let clicked = e.target.closest("td");
    if (clicked.dataset.clicked === "true") {
      console.log("cannot shot one cell twice");
      return;
    }
    let cord = [];
    cord.push(clicked.dataset.x, clicked.dataset.y);
    game.play(cord);
    clicked.dataset.clicked = true;
  });
});

replayBtn.addEventListener("click", game.replay, false);

/*  placeShip(ship, row = 0, col = 0, direction = "horizontal") {
    if (direction === "horizontal") {
      for (let i = 0; i < ship.length; i += 1) {
        if (
          row === undefined ||
          col === undefined ||
          this.Board[row][col] !== ""
        ) {
          console.log("ship cannot be placed here");
          return false;
        }
        this.Board[row][col] = ship.name;
        col += 1;
      }
      this.ships.push(ship);
      return true;
    } else if (direction === "vertical") {
      for (let i = 0; i < ship.length; i += 1) {
        if (
          row === undefined ||
          col === undefined ||
          this.Board[row][col] !== ""
        ) {
          console.log("ship cannot be placed here");
          return false;
        }
        this.Board[row][col] = ship.name;
        row += 1;
      }
      this.ships.push(ship);
      return true;
    }
  }*/
