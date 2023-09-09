const Gameboard = require("./gameboard.js");
const winTab = document.querySelector("#winTab");
const winTabContainer = document.querySelector("#winTabContainer");

const Control = (() => {
  const renderBoard = (player, event = false) => {
    const container = document.createElement("div");
    container.classList.add(player.name);
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
        "bg-red-100",
        "bg-green-100"
      );
    });
  };
  const showShips = (player) => {
    player.gameboard.ships.forEach((ship) => {
      ship.location.forEach((cord) => {
        let [row, col] = cord;
        let cellDOM = document.querySelector(
          `[data-cord='${cord},${player.name}']`
        );
        //console.log(cellDOM);
        cellDOM.classList.add("bg-green-100");
        cellDOM.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
      </svg>
      `;
      });
    });
  };

  return {
    renderBoard,
    renderShot,
    renderWinner,
    clearBoard,
    showShips,
  };
})();

module.exports = Control;
