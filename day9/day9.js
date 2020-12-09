const fs = require('fs');
let invalidNumber;
function arrayMinMax(array) {
    let copyArray = [...array];
    copyArray.sort((n1, n2) => n1 - n2);
    return [copyArray[0], copyArray[copyArray.length - 1]];
}
function determineValueBounds(data) {
    let sortedData = [...data];
    sortedData.sort((n1, n2) => n1 - n2);
    let minPossibleValue = sortedData[0] + sortedData[1];
    let maxPossibleValue = sortedData[sortedData.length - 1] + sortedData[sortedData.length - 2];
    return [minPossibleValue, maxPossibleValue];
}
function checkPreambleSums(preamble, value) {
    for (let i = 0; i < preamble.length; i++) {
        for (let j = i; j < preamble.length; j++) {
            if (preamble[i] + preamble[j] == value) {
                invalidNumber = value;
                return true;
            }
        }
    }
    console.log(`${value} is not a sum of preamble numbers.`);
    return false;
}
function findContiguousSetToSum(data, value) {
    let idx = 0;
    let set = [];
    let solutions = [];
    while (idx < data.length - 2) {
        set.push(...[data[idx], data[idx + 1]]);
        let maxSetIdx = idx + 1;
        let minSetValue, maxSetValue;
        if (set.reduce((a, v) => (a + v)) == value) {
            console.log(`${value} is the sum of the set.`);
            solutions.push(set);
            idx++;
            set = [];
            continue;
        }
        [minSetValue, maxSetValue] = determineValueBounds(set);
        console.log(minSetValue, maxSetValue, value);
        while (value > maxSetValue) {
            maxSetIdx++;
            if (maxSetIdx > data.length - 1) {
                idx++;
                set = [];
                break;
            }
            set.push(data[maxSetIdx]);
            if (set.reduce((a, v) => (a + v)) == value) {
                console.log(`${value} is the sum of the set.`);
                solutions.push(set);
                idx++;
                set = [];
                continue;
            }
            [minSetValue, maxSetValue] = determineValueBounds(set);
            if (minSetValue > value) {
                idx++;
                set = [];
                break;
            }
            console.log(minSetValue, maxSetValue, value);
            if (value == maxSetValue) {
                console.log(`${value} is the maximum of the set.`);
                idx++;
                set = [];
                break;
            }
        }
        if (value < maxSetValue) {
            idx++;
            set = [];
        }
        idx++;
    }
    return solutions;
}
try {
    let cipherFile = './day9.txt';
    let dataStrings = fs.readFileSync(cipherFile, 'utf-8').split('\n');
    let data = [];
    dataStrings.forEach((line) => {
        data.push(parseInt(line));
    });
    let preambleSize = 25;
    data.every((value, idx) => {
        if (idx < preambleSize) {
            return true;
        }
        let preamble = data.slice(idx - preambleSize, idx);
        let minValue, maxValue;
        [minValue, maxValue] = determineValueBounds(preamble);
        if (value < minValue || value > maxValue) {
            console.log(`${value} at index ${idx} is out of bounds.`);
            invalidNumber = value;
            return false;
        }
        return checkPreambleSums(preamble, value);
    });
    let solutions = findContiguousSetToSum(data, invalidNumber);
    console.log(solutions);
    console.log(`Min + Max of set is ${arrayMinMax(solutions[0]).reduce((a, v) => a + v)}`);
}
catch (error) {
    console.log(error);
}
//# sourceMappingURL=day9.js.map