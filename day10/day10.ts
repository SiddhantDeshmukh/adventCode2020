const fs = require('fs');

let joltageFile: string = './day10.txt'

const countOccurrences = (array: Array <number>, value: number) => array.reduce((a: number, v: number) => (v === value ? a + 1 : a), 0);

function pathsInArray(array: Array <number>) {
  // Lazy Caterer's formula with (nC0 + nC1 + nC2), n >= 0
  let n: number = (array.length > 2 ? array.length - 2: 0);
  let numPaths: number = (n**2 + n + 2) / 2;  // shortcut for formula
  return numPaths;
}

try {
  // Read data
  let joltageList: Array <string> = fs.readFileSync(joltageFile, 'utf-8').split('\n');

  // Convert to array of numbers
  let joltages: Array <number> = [0];  // Start with '0' for our port

  joltageList.forEach((value: string) => {
    joltages.push(parseInt(value));
  });

  // End with max joltage +3 for device
  joltages.push(Math.max(...joltages) + 3);

  // Sort list
  joltages.sort((a: number, b: number) => (a - b));

  // We start with joltage '0'. Calculate differences between each interval
  let intervals: Array <number> = [];

  joltages.every((value: number, idx: number, array: Array <number>) => {
    // Skip the first index
    if (idx == 0) {
      return true;
    }

    let interval: number = value - array[idx - 1];
    intervals.push(interval);

    return true;
  });

  for (let idx: number = 0; idx < 3; idx++) {
    console.log(`${countOccurrences(intervals, idx+1)} ${idx+1} joltage differences.`);
  }
  
  // Puzzle 1: Determine num 1-jolt * num 3-jolt
  console.log(`Puzzle 1: ${countOccurrences(intervals, 1) * countOccurrences(intervals, 3)}`);

  // Puzzle 2: How many possible combinations are there?
  // Take longest possible path and find clusters of '1' differences
  let lazyCatererPaths: Array <number> = []

  for (let idx: number = 0; idx < joltages.length; idx++) {
    let lookIdx: number = 1;
    let prevIdx: number = idx;

    // Find clusters of number separated by '1'
    let singleInterval: Array <number> = [joltages[idx]];

    while (idx + lookIdx < joltages.length) {
      if (joltages[idx + lookIdx] - joltages[prevIdx] == 1) {
        // Cluster requirement satisfied
        singleInterval.push(joltages[idx + lookIdx]);
      } else {
        break;
      }

      prevIdx++;
      lookIdx++;
    }
    
    // Jump to end of cluster
    idx += singleInterval.length - 1;

    if (singleInterval.length > 1) {
      // Calculate number of paths within the cluster
      lazyCatererPaths.push(pathsInArray(singleInterval));
    }
  }

  // The maximum possible paths is the product of all the cluster paths
  let maxPaths: number = lazyCatererPaths.reduce((a: number, v: number) => a * v);
  console.log(`Puzzle 2: ${maxPaths} possible paths.`);

} catch (error) {
  console.log(error);
}
