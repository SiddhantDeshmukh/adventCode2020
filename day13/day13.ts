const fs = require('fs');

// 'notes.txt' contains the bus notes - line 1 is the earliest possible
// timestamp, line 2 contains the possible buses ('x' is out of service)
function readNotes(notesFile: string): [number, Array <number>] | null {
  let notes: Array <string>;
  try {
    notes = fs.readFileSync(notesFile, 'utf-8').split('\n');
  } catch (e) {
    console.log(e);
  }

  let timestamp: number = parseInt(notes[0]);

  // Parse possible buses
  let buses: Array <number> = notes[1].match(/\d+/g).map(Number);

  return [timestamp, buses];
}


let timestamp: number, buses: Array <number>;

[timestamp, buses] = readNotes('./notes.txt');

// Puzzle 1
let currentTime: number = timestamp;
let busFound: boolean = false;

while (!busFound) {
  // Check divisibility of buses
  let possibleBuses: Array <number> = [];
  buses.forEach((value: number) => {
    if (currentTime % value == 0) {
      possibleBuses.push(value);
    }
  })

  if (possibleBuses.length > 0) {
    let waitingMinutes: number = currentTime - timestamp;
    console.log(`Puzzle 1: ${waitingMinutes * possibleBuses[0]}`);
    busFound = true;
  }

  currentTime += 1;
}

// Puzzle 2
let notes: Array <string>;

try {
  notes = fs.readFileSync('./notes.txt', 'utf-8').split('\n')[1].split(',');
} catch (e) {
  console.log(e);
}

let startTime: number = 100000000000000;
currentTime = startTime;
let sequenceFound: boolean = false;
let sequenceTime: number;

while (!sequenceFound) {
  sequenceTime = currentTime;
  sequenceFound = notes.every((value: string, index: number) => {
    if (value == 'x') {
      sequenceTime++;
      return true;
    }

    if (sequenceTime % parseInt(value) == 0) {
      if (index < notes.length - 1) {
        sequenceTime++;
      }

      return true;
    }

    sequenceTime += 1;
    return false;
  });

  currentTime += 1;
}

console.log(`Puzzle 2: ${sequenceTime}`);
