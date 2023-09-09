function remy_AI(enemy) {
  let board = enemy.gameboard.Board;
  let res = [];
  let getEmptyCells = (() => {
    for (let i = 0; i < board.length; i++) {
      const row = board[i];
      for (let j = 0; j < row.length; j++) {
        const cell = row[j];
        if (cell !== "X") {
          res.push([i, j]);
        }
      }
    }
    // return res;
  })();
  let len = res.length;
  let random = Math.floor(Math.random() * len) + 0;
  console.log(res[random]);
  //enemy.gameboard.receiveAttack(emptyCells[random]);
  return res[random];
}
module.exports = remy_AI;
