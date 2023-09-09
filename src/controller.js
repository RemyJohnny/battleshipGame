const Gameboard = require("./gameboard.js");
const winTab = document.querySelector("#winTab");
const winTabContainer = document.querySelector("#winTabContainer");

const Control = (() => {
  const renderBoard = (player, event = false) => {
    const container = document.createElement("div");
    const label = document.createElement("h2");
    label.classList.add("text-center", "font-sansSerif");
    label.textContent = `${player.name}'s water`;
    const table = document.createElement("table");
    table.classList.add("m-8", "mt-1");
    const tBody = document.createElement("tbody");
    for (let i = 0; i < player.gameboard.Board.length; i++) {
      const row = document.createElement("tr");

      for (let j = 0; j < player.gameboard.Board[i].length; j++) {
        const cell = document.createElement("td");
        cell.classList.add(
          "w-8",
          "h-8",
          "border",
          "text-center",
          "box-border",
          "relative"
        );
        if (event) {
          cell.classList.add("cell");
        }
        cell.dataset.x = i;
        cell.dataset.y = j;
        cell.dataset.cord = [i, j, player.name];
        cell.dataset.clicked = false;
        row.appendChild(cell);

        //cell.textContent = player.gameboard.Board[i][j];
      }
      tBody.appendChild(row);
    }
    container.appendChild(label);
    container.appendChild(table);
    table.appendChild(tBody);
    return container;
  };

  const renderShot = (cord, player) => {
    let cellDOM = document.querySelector(
      `[data-cord='${cord},${player.name}']`
    );
    const [row, col] = cord;
    let cell = player.gameboard.Board[row][col];
    if (cell === "" || cell === "o") {
      cellDOM.innerHTML = `<span class="bg-slate-800 w-2 h-2 rounded-[50%] absolute top-[40%] left-[40%]"></span>`;
      cellDOM.classList.add("bg-red-100");
    } else {
      cellDOM.innerHTML = `<span class="absolute top-0 truncate left-0 h-full w-full 
      before:absolute before:bg-red-600 before:w-[0.15rem] before:h-[170%] before:top-[-40%] before:left-[50%] before:origin-center before:rotate-45
      after:absolute after:bg-red-600 after:w-[0.15rem] after:h-[170%] after:top-[-30%] after:left-[50%] after:origin-center after:-rotate-45"></span>`;
      cellDOM.classList.add("border-red-500", "border-2", "bg-red-50");
    }
    //cellDOM.classList.add("bg-red-500");
  };

  const renderWinner = (player) => {
    const div = document.createElement("div");
    div.innerHTML = `${player.name} won!`;
    div.classList.add("text-2xl");
    winTabContainer.innerHTML = "";
    winTabContainer.appendChild(div);
    winTab.showModal();
  };
  const clearBoard = () => {
    const cells = document.querySelectorAll("td");
    cells.forEach((cell) => {
      cell.innerHTML = "";
      cell.dataset.clicked = false;
      cell.classList.remove(
        "border-red-500",
        "border-2",
        "bg-red-50",
        "bg-red-100"
      );
    });
  };

  return {
    renderBoard,
    renderShot,
    renderWinner,
    clearBoard,
  };
})();

module.exports = Control;
