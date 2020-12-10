const fs = require('fs');

let joltageFile: string = './day10.txt'

const countOccurrences = (array: Array <number>, value: number) => array.reduce((a: number, v: number) => (v === value ? a + 1 : a), 0);

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

  let num1s: number = countOccurrences(intervals, 1);
  let num2s: number = countOccurrences(intervals, 2);
  let num3s: number = countOccurrences(intervals, 3);

  console.log(`${num1s} 1 joltage differences.`);
  console.log(`${num2s} 2 joltage differences.`);
  console.log(`${num3s} 3 joltage differences.`);

  // Puzzle 1: Determine num 1-jolt * num 3-jolt
  console.log(`Puzzle 1: ${num1s * num3s}`);

} catch (error) {
  console.log(error);
}
