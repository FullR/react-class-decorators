import Rx from "rx";
import _ from "lodash";

const {range, flatten, sample, compact} = _;

const options = {
  xCount: 30,
  yCount: 30,
  mineCount: 100
};

function minesweeper({revealCell, flagCell}, {xCount=30, yCount=30, mineCount=100} = {}) {
  const gameData = {
    xCount, yCount, mineCount,
    minesPlaced: false,
    cellTable: range(yCount).map((y) => {
      return range(xCount).map((x) => {
        return {
          x, y,
          id: (y * xCount) + x,
          revealed: false,
          mine:false
        };
      });
    })
  };

  return Rx.Observable.create((observer) => {
    const cells = flatten(gameData.cellTable);
    cells.forEach((cell) => cell.adjacent = getAdjacent(cell));

    function getCellById(id) {
      return cells.filter((cell) => cell.id === id)[0];
    }

    function getCell(x, y) {
      const {cellTable} = gameData;
      return cellTable[y] ? cellTable[y][x] : null;
    }

    function getAdjacent({x, y, adjacent}) {
      return adjacent || compact([
        getCell(x - 1, y - 1),
        getCell(x, y - 1),
        getCell(x + 1, y - 1),

        getCell(x - 1, y),
        getCell(x + 1, y),

        getCell(x - 1, y + 1),
        getCell(x, y + 1),
        getCell(x + 1, y + 1)
      ]);
    }

    function placeMines(toAvoidId) {
      sample(cells.filter((cell) => cell.id !== toAvoidId), mineCount)
        .forEach((cell) => {
          cell.mine = true;
        });

      gameData.minesPlaced = true;
    }

    function reveal(id) {
      if(!gameData.minesPlaced) {
        placeMines(id);
      }
      const cell = getCellById(id);
      if(cell.revealed || cell.flagged) return;
      cell.revealed = true;
      if(!cell.mine) {
        const adjacentMines = cell.adjacent.filter((other) => other.mine);

        if(!adjacentMines.length) {
          cell.adjacent
            .filter((other) => !other.flagged)
            .forEach((other) => reveal(other.id));
        }
      }
    }

    function flag(id) {
      const cell = getCellById(id);
      if(cell) {
        cell.flagged = !cell.flagged;
      }
    }

    revealCell.subscribe(({id}) => {
      reveal(id);
      observer.onNext(gameData);
    });

    flagCell.subscribe(({id}) => {
      flag(id);
      observer.onNext(gameData);
    });

    observer.onNext(gameData);
  });
};

export default minesweeper;
