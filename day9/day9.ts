/*
 * Need to clean this up!
*/

const fs = require('fs');

// Global!
let invalidNumber: number;


function arrayMinMax(array: Array <number>) {
  let copyArray: Array <number> = [...array];
  copyArray.sort((n1: number, n2: number) => n1 - n2);

  return [copyArray[0], copyArray[copyArray.length - 1]];
}

function determineValueBounds(data: Array <number>) {
  // Assuming 'data' is an unsorted array, we sort the array in ascending
  // order and find the sum of the first and second entries (minimum sum) 
  // as well as the sum of the final and penultimate entries (maximum sum)
  let sortedData: Array <number> = [...data];
  sortedData.sort((n1: number, n2: number) => n1 - n2)
  let minPossibleValue: number = sortedData[0] + sortedData[1];
  let maxPossibleValue: number = sortedData[sortedData.length - 1] + sortedData[sortedData.length - 2];

  return [minPossibleValue, maxPossibleValue];
}

function checkPreambleSums(preamble: Array <number>, value: number) {
  for (let i: number = 0; i < preamble.length; i++) {
    for (let j: number = i; j < preamble.length; j++) {
      if (preamble[i] + preamble[j] == value) {
        invalidNumber = value;
        return true;
      }
    }
  }

  console.log(`${value} is not a sum of preamble numbers.`);
  return false;
}

function findContiguousSetToSum(data: Array <number>, value: number) {
  // Find a contigious set of at least 2 numbers within 'data' that add to
  // 'value' and return the set
  let idx = 0;
  let set: Array <number> = [];
  let solutions: Array <Array <number>> = [];

  // Loop over data, creating a set starting at each new index
  while (idx < data.length - 2)  {
    set.push(...[data[idx], data[idx + 1]]);
    let maxSetIdx: number = idx + 1;
    let minSetValue: number, maxSetValue: number;

    if (set.reduce((a: number, v: number) => (a + v)) == value) {
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


      if (set.reduce((a: number, v: number) => (a + v)) == value) {
        console.log(`${value} is the sum of the set.`);
        solutions.push(set);
        idx++;
        set = [];
        continue;
      }

      [minSetValue, maxSetValue] = determineValueBounds(set);

      if (minSetValue > value) {
        idx ++;
        set = [];
        break;
      }


      if (value == maxSetValue) {
        console.log(`${value} is the maximum of the set.`);
        // solutions.push(set);
        idx++;
        set = [];
        break;
      }
    }

    // If the sum exceeds the max value, update the 'idx' by 1 and retry
    if (value < maxSetValue) {
      idx++;
      set = [];
    }

    idx++;
  }

  return solutions;
}

try {
  // Read in file
  let cipherFile: string = './day9.txt';
  let dataStrings: Array <string> = fs.readFileSync(cipherFile, 'utf-8').split('\n');
  let data: Array <number> = [];

  dataStrings.forEach((line: string) => {
    data.push(parseInt(line));
  });

  // Number of entries to consider for the preamble
  let preambleSize: number = 25;

  // Puzzle 1: Find the invalid number
  data.every((value: number, idx: number) => {
    // Skip initial preamble, no constraints on these values
    if (idx < preambleSize) {
      return true;
    }

    let preamble = data.slice(idx - preambleSize, idx);
    let minValue: number, maxValue: number
    [minValue, maxValue] = determineValueBounds(preamble);

    // Check for invalidity of value if it is out of bounds
    if (value < minValue || value > maxValue) {
      console.log(`${value} at index ${idx} is out of bounds.`);
      invalidNumber = value;
      return false;
    }

    // Check the sum of each value in the preamble and see if any match the
    // current value
    return checkPreambleSums(preamble, value);
  });

  // Puzzle 2: Find a contigious set of at least two numbers that add
  // up to the invalid number
  let solutions: Array <Array <number>> = findContiguousSetToSum(data, invalidNumber);
  console.log(solutions);
  
  console.log(`Min + Max of set is ${arrayMinMax(solutions[0]).reduce((a: number, v: number) => a + v)}`);

} catch (error) {
  console.log(error);
}