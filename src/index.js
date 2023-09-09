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

const page = document.querySelector(".page");
const winTab = document.querySelector("#winTab");

page.appendChild(Control.renderBoard(game.players[0]));
page.appendChild(Control.renderBoard(game.players[1], true));

Control.showShips(game.players[0]);
//Control.showShips(game.players[1]);

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
