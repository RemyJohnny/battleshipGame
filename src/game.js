const Player = require("./player.js");
const ship = require("./ship.js");
const computer = require("./remy_AI.js");
const control = require("./controller.js");
const page = document.querySelector(".page");

const Game = (() => {
  let players = [];
  let activePlayer;
  let enemy;
  const setGame = () => {
    let boat = ship("flyboat 1", 2);
    let boat2 = ship("flyboat 2", 3);
    let ship1 = ship("flyboat", 10);
    let ship2 = ship("flyboat", 10);
    let ship3 = ship("flyboat", 10);
    let ship4 = ship("flyboat", 10);
    let ship5 = ship("flyboat", 10);
    let ship6 = ship("flyboat", 10);
    let ship7 = ship("flyboat", 10);
    let ship8 = ship("flyboat", 10);

    let player1 = new Player("player");
    let player2 = new Player("computer");

    //player1.gameboard.placeShip(ship1, 0, 0, "horizontal");
    // player1.gameboard.placeShip(ship2, 1, 0, "horizontal");
    // player1.gameboard.placeShip(ship3, 2, 0, "horizontal");
    // player1.gameboard.placeShip(ship4, 3, 0, "horizontal");
    // player1.gameboard.placeShip(ship5, 4, 0, "horizontal");
    // player1.gameboard.placeShip(ship6, 5, 0, "horizontal");
    // player1.gameboard.placeShip(ship7, 6, 0, "horizontal");
    // player1.gameboard.placeShip(ship8, 7, 0, "horizontal");

    player2.gameboard.placeShip(boat2, 3, 3, "horizontal");
    randomShipPlacement(player1);
    //randomShipPlacement(player2);
    //randomShipPlacement(player2);

    players.push(player1, player2);

    activePlayer = players[0];
    enemy = players[1];
  };

  const switchPlayer = () => {
    if (activePlayer === players[0]) {
      activePlayer = players[1];
      enemy = players[0];
    } else {
      activePlayer = players[0];
      enemy = players[1];
    }

    //showTurn();
  };
  const getActivePlayer = () => activePlayer;

  const Winner = (players) => {
    if (players[0].gameboard.isDefeated) {
      return players[1];
    } else if (players[1].gameboard.isDefeated) {
      return players[0];
    } else {
      return null;
    }
  };

  const playRound = (cord) => {
    if (!cord) return "empty cord";
    control.renderShot(cord, enemy);
    let round = getActivePlayer().attack(enemy, cord);

    let winner = Winner(players);
    if (winner) {
      console.log(winner);
      control.renderWinner(winner);
    }
    if (!round) {
      switchPlayer();
    }
  };

  const play = (cord) => {
    playRound(cord);
    if (getActivePlayer() === players[1]) {
      if (players[1].name === "computer") {
        while (getActivePlayer() === players[1]) {
          playRound(computer(players[0]));
        }
      }
    }
  };
  const randomShipPlacement = (player) => {
    let warships = [];
    warships.push(
      ship("battleship", 4),
      ship("cruiser 1", 3),
      ship("cruiser 2", 3),
      ship("submarine 1", 2),
      ship("submarine 2", 2),
      ship("submarine 3", 2),
      ship("patrolBoat 1", 1),
      ship("patrolBoat 2", 1),
      ship("patrolBoat 3", 1),
      ship("patrolBoat 4", 1)
    );

    const directions = ["vertical", "horizontal"];
    let activeDirection = directions[0];
    const switchDirection = () => {
      activeDirection =
        activeDirection === directions[0] ? directions[1] : directions[0];
    };

    warships.forEach((warship) => {
      let randomRow = 0;
      let randomCol = 0;
      let len;
      if (activeDirection === "vertical") {
        len = 10 - warship.length;
        randomRow = Math.floor(Math.random() * len) + 0;
        randomCol = Math.floor(Math.random() * 10) + 0;
        let response = player.gameboard.placeShip(
          warship,
          randomRow,
          randomCol,
          "vertical"
        );
        while (!response) {
          randomRow = Math.floor(Math.random() * len) + 0;
          randomCol = Math.floor(Math.random() * 10) + 0;
          response = player.gameboard.placeShip(
            warship,
            randomRow,
            randomCol,
            "vertical"
          );
        }
      } else if (activeDirection === "horizontal") {
        len = 10 - warship.length;
        randomRow = Math.floor(Math.random() * 10) + 0;
        randomCol = Math.floor(Math.random() * len) + 0;
        let response = player.gameboard.placeShip(
          warship,
          randomRow,
          randomCol,
          "horizontal"
        );
        while (!response) {
          randomRow = Math.floor(Math.random() * 10) + 0;
          randomCol = Math.floor(Math.random() * len) + 0;
          response = player.gameboard.placeShip(
            warship,
            randomRow,
            randomCol,
            "horizontal"
          );
        }
      }

      switchDirection();
      // console.log("direction switched " + activeDirection);
    });
  };

  const replay = () => {
    control.clearBoard();
    players[0].gameboard.clearBoard();
    players[1].gameboard.clearBoard();
    console.log(players);
    players = [];
    setGame();
    console.log(players);
    winTab.close();
  };

  setGame();
  // players[1].gameboard.clearBoard();
  return {
    playRound,
    players,
    enemy,
    play,
    replay,
  };
})();
module.exports = Game;
