const fs = require('fs');


function splitPassword(line) {
  // Split based on colon: Left of colon is reqauirement, right is password
  let splitLine = line.split(':');

  // First part of condition is numeric, second is a character
  let condition = splitLine[0].split(" ");
  let character = condition[1];

  let password = splitLine[1];

  return [password, condition, character];
}

function isValidPuzzle1(line) {
  let password, condition, character;
  [password, condition, character] = splitPassword(line);

  let min, max;
  [min, max] = condition[0].split('-');
  
  // Check number of occurrences of 'character' in the password
  let numOccurrences = password.split(character).length - 1;

  return (min <= numOccurrences && numOccurrences <= max ? true: false);
}

function isValidPuzzle2(line) {
  let password, condition, character;
  [password, condition, character] = splitPassword(line);

  let positions;
  positions = condition[0].split('-')

  let numOccurrences = 0;

  positions.forEach(position => {
    if (password[position] == character){
      numOccurrences++;
    }
  });

  return (numOccurrences == 1 ? true: false);
}

passwordFile = './day2.txt';

try {
  const data = fs.readFileSync(passwordFile, 'utf8');
  const lines = data.split(/\r?\n/);
  let count = 0;

  // puzzle 1
  console.log("Puzzle 1:")
  lines.forEach(element => {
    if (isValidPuzzle1(element)) {
      count++;
    }
  });

  console.log(`There are ${count} valid passwords.\n`);

  // puzzle 2
  console.log("Puzzle 2:");
  count = 0;
  lines.forEach(element => {
    if (isValidPuzzle2(element)) {
      count++;
    }
  });

  console.log(`There are ${count} valid passwords.\n`);

} catch (err) {
  console.log(err);
}