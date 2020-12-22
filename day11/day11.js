const fs = require('fs');
const nj = require('numjs');
const charIntMap = {
    "L": 0,
    "#": 1,
    ".": -1
};
const countOccurrences = (arr, val) => arr.reduce((a, v) => (v === val ? a + 1 : a), 0);
function loadState(filename) {
    let data = fs.readFileSync(filename, 'utf-8').split('\n');
    let nRows = data.length, nCols = data[0].length;
    let stateData = nj.zeros([nRows, nCols]);
    data.forEach((line, rowIdx) => {
        for (let colIdx = 0; colIdx < line.length; colIdx++) {
            let cell = charIntMap[line.charAt(colIdx)];
            stateData.set(rowIdx, colIdx, cell);
        }
    });
    return [stateData, nRows, nCols];
}
function updateState(state) {
    let nRows = state.shape[0], nCols = state.shape[1];
    let newState = nj.zeros([nRows, nCols]);
    for (let i = 0; i < nRows; i++) {
        for (let j = 0; j < nCols; j++) {
            let currentCell = state.get(i, j);
            if (currentCell == -1) {
                newState.set(i, j, -1);
                continue;
            }
            let newCell;
            let minIdxX = i - 1;
            let maxIdxX = i + 1;
            let minIdxY = j - 1;
            let maxIdxY = j + 1;
            let adjacentCells = nj.zeros([3, 3]);
            let numFloor = 0;
            for (let idxX = minIdxX; idxX <= maxIdxX; idxX++) {
                for (let idxY = minIdxY; idxY <= maxIdxY; idxY++) {
                    if (idxX == i && idxY == j) {
                        adjacentCells.set(idxX - minIdxX, idxY - minIdxY, 0);
                        continue;
                    }
                    let adjacentCell;
                    if ((idxX < 0 || idxX >= nCols) || (idxY < 0 || idxY >= nRows)) {
                        adjacentCell = 0;
                    }
                    else {
                        adjacentCell = state.get(idxX, idxY);
                    }
                    if (adjacentCell == -1) {
                        numFloor++;
                    }
                    adjacentCells.set(idxX - minIdxX, idxY - minIdxY, adjacentCell);
                }
            }
            let sum = nj.abs(adjacentCells).sum() - numFloor;
            if (currentCell == 0) {
                newCell = (sum == 0 ? 1 : currentCell);
            }
            else if (currentCell == 1) {
                newCell = (sum >= 4 ? 0 : currentCell);
            }
            else {
                newCell = currentCell;
            }
            newState.set(i, j, newCell);
        }
    }
    return newState;
}
function gameOfLife(state) {
    let currIter = 0;
    let isChanging = true;
    while (isChanging) {
        let newState = updateState(state);
        let numFloor = 0;
        let numOccupied = 0;
        let numEmpty = 0;
        let array = newState.tolist();
        array.forEach((line) => {
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
//# sourceMappingURL=day11.js.map