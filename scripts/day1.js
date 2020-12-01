/*
  We want to sum the list of numbers contained in the input file and find
  1) two values that sum to 2020 -> What is their product?
  2) three values that sum to 2020 -> What is their product?
*/

const fs = require('fs');
const { PerformanceObserver, performance } = require('perf_hooks');

input_file = "../res/input.txt";

// (Puzzle 1)
console.log("Puzzle 1");
let t0 = performance.now();

// Read file sync
try {
  const data = fs.readFileSync(input_file, 'utf8');
  
  // Split data into lines
  const lines = data.split(/\r?\n/);
  for (let i = 0; i < lines.length; i++){
    let value1 = Number(lines[i]);

    for (let j = i + 1; j < lines.length; j++){
      let value2 = Number(lines[j]);

      // Calculate sum, and if it equals '2020', calculate the product
      let sum = value1 + value2;

      if (sum == 2020){
        let product = value1 * value2;
        console.log(product);
      }
    }
  }

} catch (err) {
  console.log(err);
}

let t1 = performance.now();
console.log(t1 - t0);

// (Puzzle 2)
console.log("Puzzle 2");
t0 = performance.now();

// Read file sync
try {
  const data = fs.readFileSync(input_file, 'utf8');
  
  // Split data into lines
  const lines = data.split(/\r?\n/);
  for (let i = 0; i < lines.length; i++) {
    let value1 = Number(lines[i]);

    for (let j = i + 1; j < lines.length; j++) {
      let value2 = Number(lines[j]);

      for (let k = j + 1; k < lines.length; k++) {
        let value3 = Number(lines[k]);

        // Calculate sum, and if it equals '2020', calculate the product
        let sum = value1 + value2 + value3;

        if (sum == 2020){
          let product = value1 * value2 * value3;
          console.log(product);
        }
      }
    }
  }

} catch (err) {
  console.log(err);
}


t1 = performance.now();
console.log(t1 - t0);