const fs = require('fs');
function readNotes(notesFile) {
    let notes;
    try {
        notes = fs.readFileSync(notesFile, 'utf-8').split('\n');
    }
    catch (e) {
        console.log(e);
    }
    let timestamp = parseInt(notes[0]);
    let buses = notes[1].match(/\d+/g).map(Number);
    return [timestamp, buses];
}
let timestamp, buses;
[timestamp, buses] = readNotes('./notes.txt');
let currentTime = timestamp;
let busFound = false;
while (!busFound) {
    let possibleBuses = [];
    buses.forEach((value) => {
        if (currentTime % value == 0) {
            possibleBuses.push(value);
        }
    });
    if (possibleBuses.length > 0) {
        let waitingMinutes = currentTime - timestamp;
        console.log(`Puzzle 1: ${waitingMinutes * possibleBuses[0]}`);
        busFound = true;
    }
    currentTime += 1;
}
let notes;
try {
    notes = fs.readFileSync('./notes.txt', 'utf-8').split('\n')[1].split(',');
}
catch (e) {
    console.log(e);
}
let startTime = 100000000000000;
currentTime = startTime;
let sequenceFound = false;
let sequenceTime;
while (!sequenceFound) {
    sequenceTime = currentTime;
    sequenceFound = notes.every((value, index) => {
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
//# sourceMappingURL=day13.js.map