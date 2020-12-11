const fs = require('fs');
let joltageFile = './test2.txt';
const countOccurrences = (array, value) => array.reduce((a, v) => (v === value ? a + 1 : a), 0);
function pathsInArray(array) {
    let n = (array.length > 2 ? array.length - 2 : 0);
    let numPaths = (Math.pow(n, 2) + n + 2) / 2;
    return numPaths;
}
try {
    let joltageList = fs.readFileSync(joltageFile, 'utf-8').split('\n');
    let joltages = [0];
    joltageList.forEach((value) => {
        joltages.push(parseInt(value));
    });
    joltages.push(Math.max(...joltages) + 3);
    joltages.sort((a, b) => (a - b));
    let intervals = [];
    joltages.every((value, idx, array) => {
        if (idx == 0) {
            return true;
        }
        let interval = value - array[idx - 1];
        intervals.push(interval);
        return true;
    });
    for (let idx = 0; idx < 3; idx++) {
        console.log(`${countOccurrences(intervals, idx + 1)} ${idx + 1} joltage differences.`);
    }
    console.log(`Puzzle 1: ${countOccurrences(intervals, 1) * countOccurrences(intervals, 3)}`);
    let lazyCatererPaths = [];
    for (let idx = 0; idx < joltages.length; idx++) {
        let lookIdx = 1;
        let prevIdx = idx;
        let singleInterval = [joltages[idx]];
        while (idx + lookIdx < joltages.length) {
            if (joltages[idx + lookIdx] - joltages[prevIdx] == 1) {
                singleInterval.push(joltages[idx + lookIdx]);
            }
            else {
                break;
            }
            prevIdx++;
            lookIdx++;
        }
        idx += singleInterval.length - 1;
        if (singleInterval.length > 1) {
            lazyCatererPaths.push(pathsInArray(singleInterval));
        }
    }
    let maxPaths = lazyCatererPaths.reduce((a, v) => a * v);
    console.log(`Puzzle 2: ${maxPaths} possible paths.`);
}
catch (error) {
    console.log(error);
}
//# sourceMappingURL=day10.js.map