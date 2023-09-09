const Gameboard = require("./gameboard.js");

class Player {
  constructor(name) {
    this.name = name;
    this.gameboard = new Gameboard();
  }
  attack(enemy, cord) {
    let report = enemy.gameboard.receiveAttack(cord);
    return report;
  }
}
module.exports = Player;
