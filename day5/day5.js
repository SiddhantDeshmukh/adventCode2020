const fs = require('fs');


boardingFile = './day5.txt';

function binaryBinSplit(minBin, maxBin, string, lowerKey) {
  string.split('').forEach(character => {
    if (character == lowerKey) {
      // Take lower half, so move maximum bin
      maxBin = (minBin + maxBin - 1) / 2;
    } else {
      // Take upper half, so move minimum bin
      minBin = (minBin + maxBin + 1) / 2;
    }
  });

  return Math.floor(minBin);
}


function parseBoardingPass(line) {
  // Slice string into 'rows' and 'columns' specifiers
  let rowString = line.slice(0, 7);
  let colString = line.slice(7);
  
  // Find row and column indices of seat through binary splits
  let minRowBin = binaryBinSplit(0, 127, rowString, 'F');
  let minColBin = binaryBinSplit(0, 7, colString, 'L');
  
  return [minRowBin, minColBin];
}

try {
  const data = fs.readFileSync(boardingFile, 'utf-8');
  const lines = data.split(/\r?\n/);

  let seatIDs = [];

  let maxSeatID = 0;
  lines.forEach(line => {
    let row, column;
    [row, column] = parseBoardingPass(line);

    let seatID = (row * 8) + column;
    seatIDs.push(seatID);
    
    if (seatID > maxSeatID) {
      maxSeatID = seatID;
    }
  });

  console.log(`Max seat ID is ${maxSeatID}.`);

  // Find your seat!
  let allIDs = [...Array(maxSeatID).keys()];
  allIDs.every(id => {
    if ((!seatIDs.includes(id)) && (seatIDs.includes(id - 1)) && (seatIDs.includes(id + 1))){
      console.log(`Your seat is ${id}.`);
      return false;
    } else {
      return true;
    }
  });

} catch (err) {
  console.log(err);
}
