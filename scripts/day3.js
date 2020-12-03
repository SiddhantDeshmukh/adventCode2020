const fs = require('fs');


treeFile = '../res/day3.txt';
treeCharacter = '#'

function convertTo2DArray(lines) {
  // Convert lines to a 2D array
  let array = []

  lines.forEach(line => {
    array.push(line.split(''));
  });

  return array;
}

function isTree(character) {
  return (character == treeCharacter ? true: false);
}

try {
  data = fs.readFileSync(treeFile, 'utf-8');
  const lines = data.split(/\r?\n/);
  let array = convertTo2DArray(lines);

  // Start conditions
  const horizontal_start_idx = 0;
  const vertical_start_idx = 0;

  // End condition
  const end_vertical_idx = array.length - 1;

  // Constraints
  const max_horizontal_idx = array[0].length - 1;
  
  // Shifts
  const horizontal_shifts = [1, 3, 5, 7, 1];
  const vertical_shifts   = [1, 1, 1, 1, 2];

  let treeProduct = 1;
  
  for (let i = 0; i < horizontal_shifts.length; i++) {
    // Current conditions
    let horizontal_idx = horizontal_start_idx;
    let vertical_idx = vertical_start_idx;

    let treeCount = 0;
    let spaceCount = 0;

    while (vertical_idx < end_vertical_idx) {
      // Toboggan down the array using the specified shifts
      // Horizontal shift (rows, dim 0)
      horizontal_idx += horizontal_shifts[i];

      // Wrap horizontal index if it exceeds line
      // periodic boundary conditions! (on the right side)
      if (horizontal_idx > max_horizontal_idx) {
        horizontal_idx -= (max_horizontal_idx + 1);
      }

      // Vertical shift (columns, dim 1)
      vertical_idx += vertical_shifts[i];

      // console.log(horizontal_idx, vertical_idx, array[vertical_idx][horizontal_idx]);

      if (isTree(array[vertical_idx][horizontal_idx])) {
        treeCount++;
      } else {
        spaceCount++;
      }
    }

    console.log(`You hit ${treeCount} trees and ${spaceCount} empty spaces!`);

    treeProduct *= treeCount;
  }

  console.log(`Product of all trees from routes is ${treeProduct} - much pain!`);

} catch (err) {
  console.log(err);
}
