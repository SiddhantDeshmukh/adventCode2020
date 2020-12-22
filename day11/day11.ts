const fs = require('fs');
const nj = require('numjs');

// 'L' == empty seat
// '#' == occupied seat
// '.' == floor

const charIntMap = {
  "L": 0,
  "#": 1,
  ".": -1
};

const countOccurrences = (arr, val) => arr.reduce((a, v) => (v === val ? a + 1 : a), 0);

function loadState(filename: string) {
  let data: Array <string> = fs.readFileSync(filename, 'utf-8').split('\n');
  let nRows: number = data.length, nCols: number = data[0].length;

  // Let 'L' == '0', '#' == 1, '.' == -1
  let stateData = nj.zeros([nRows, nCols]);
  data.forEach((line: string, rowIdx: number) => {
    // Loop over characters in line
    for (let colIdx: number = 0; colIdx < line.length; colIdx++) {
      let cell: number = charIntMap[line.charAt(colIdx)];
      stateData.set(rowIdx, colIdx, cell);
    }
  });

  return [stateData, nRows, nCols];
}

function updateState(state) {
  /* Update a given state based on rules
    * Rules for cellular automata
    * - If '0' and no '1' adjacent, '0' -> '1'
    * - If '1' and num. adjacent '1' >= 4, '1' -> '0'
    * - '2' never changes
  */
  let nRows: number = state.shape[0], nCols: number = state.shape[1];
  let newState = nj.zeros([nRows, nCols]);

  for (let i: number = 0; i < nRows; i++) {
    for (let j: number = 0; j < nCols; j++) {
      // Get current cell
      let currentCell: number = state.get(i, j);

      // Check for 'floor' (-1)
      if (currentCell == -1) {
        newState.set(i, j, -1);
        continue;
      }

      let newCell: number;  // how 'currentCell' changes
      
      // Get adjacent cells
      let minIdxX = i - 1;
      let maxIdxX = i + 1;

      let minIdxY = j - 1;
      let maxIdxY = j + 1;

      // Get adjacent cells and keep track of number of 'floor' (-1)
      let adjacentCells = nj.zeros([3, 3]);  // in 2D
      let numFloor: number = 0;

      for (let idxX: number = minIdxX; idxX <= maxIdxX; idxX++) {
        for (let idxY: number = minIdxY; idxY <= maxIdxY; idxY++) {
          // Skip if this is the current cell!
          if (idxX == i && idxY == j) {
            adjacentCells.set(idxX - minIdxX, idxY - minIdxY, 0);
            continue;
          }
          
          let adjacentCell: number;

          // Check if cell out of bounds
          if ((idxX < 0 || idxX >= nCols) || (idxY < 0 || idxY >= nRows)) {
            adjacentCell = 0;
          } else {
            adjacentCell = state.get(idxX, idxY);
          }

          if (adjacentCell == -1) {
            numFloor++;
          }
          
          adjacentCells.set(idxX - minIdxX, idxY - minIdxY, adjacentCell);
        }
      }

      // Sum up the array, add back '-1' contributions, and apply rules
      let sum: number = nj.abs(adjacentCells).sum() - numFloor;

      // cell == 0 && sum == 0: cell -> 1
      if (currentCell == 0) {
        newCell = (sum == 0 ? 1 : currentCell);

      } else if (currentCell == 1) {  // cell == 1 && sum >= 4: cell -> 0
        newCell = (sum >= 4 ? 0 : currentCell);

      } else {
        newCell = currentCell;
      }

      newState.set(i, j, newCell);
    }
  }

  return newState;
}

function gameOfLife(state) {
  let currIter: number = 0;
  let isChanging: boolean = true;

  while (isChanging) {
    let newState = updateState(state);

    // Count number of empty, occupied and floor tiles
    let numFloor: number = 0;
    let numOccupied: number = 0;
    let numEmpty: number = 0;

    let array: Array <Array <number>> = newState.tolist();
    array.forEach((line: Array <number>) => {
      numFloor += countOccurrences(line, -1);
      numOccupied += countOccurrences(line, 1);
      numEmpty += countOccurrences(line, 0);
    });

    console.log(`Iteration ${currIter + 1}: ${numFloor} floor, ${numOccupied} occupied, ${numEmpty} empty.`);

    if (newState.subtract(state).sum() == 0) {
      isChanging = false;
    }

    currIter++;
    state = newState;
  }

  console.log(`${currIter} iterations to reach an 'equilibrium'.`);
}

let initialState, nRows, nCols;
[initialState, nRows, nCols] = loadState('./day11.txt');

gameOfLife(initialState);
