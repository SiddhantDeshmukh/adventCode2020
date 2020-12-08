const fs = require('fs');


let accumulator: number = 0;  // a global increment/decrement
let currentLine: number = 0;  // line number in the file

// Should be an infinite loop
let commandFile: string = './test.txt';

try {
  // Read in file
  let commands: Array <string> = fs.readFileSync(commandFile, 'utf-8').split('\n');
  
  const rules : {[key: string]: Function} = {
    "acc": (value: number) => { accumulator += value; }, // increase accumulator by value
    "jmp": (value: number) => { currentLine = value; executeLine(commands[currentLine]); },  // Jump to value and immediately execute that line
    "nop": (value: number) => {}  // No operation, execute instruction below
  }

  function executeLine(line: string) {
    console.log(line);
    // Get instruction from line
    let command: string, value: number;
    command = line.split(' ')[0].trim();
    value = parseFloat(line);
  
    console.log(command, value);
    // Execute instruction
    rules[command](value);
  
    return [accumulator, currentLine];
  }
  
  let currentAcc: number, dummyLine: number;

  commands.forEach((command: string) => {
    [currentAcc, dummyLine] = executeLine(command);
    console.log(`${currentAcc}, ${dummyLine}`);
  });

} catch (error) {
  console.log(error);
}