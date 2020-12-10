const fs = require('fs');
let joltageFile = './day10.txt';
const countOccurrences = (array, value) => array.reduce((a, v) => (v === value ? a + 1 : a), 0);
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
    let num1s = countOccurrences(intervals, 1);
    let num2s = countOccurrences(intervals, 2);
    let num3s = countOccurrences(intervals, 3);
    console.log(`${num1s} 1 joltage differences.`);
    console.log(`${num2s} 2 joltage differences.`);
    console.log(`${num3s} 3 joltage differences.`);
    console.log(`Puzzle 1: ${num1s * num3s}`);
}
catch (error) {
    console.log(error);
}
//# sourceMappingURL=day10.js.map