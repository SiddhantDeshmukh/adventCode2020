const fs = require('fs');


let accumulator: number = 0;  // a global increment/decrement
let currentLine: number = 0;  // line number in the file
let visitedCommands: Array <number> = [];
let programTerminated: boolean = false;

// Should be an infinite loop
let commandFile: string = './day8.txt';

function resetGlobals() {
  accumulator = 0;
  currentLine = 0;
  visitedCommands = [];
}

function checkListBounds(currentLine: number, commandsLength: number,
  visitedCommands: Array <number>) {

  if (currentLine == commandsLength) {
    console.log(`Program terminated successfully. Accumulator is ${accumulator}.`);
    programTerminated = true;
    return true;
  }
  
  // Map to start of list if preceded and exit, since we have already seen
  // the first line
  if (currentLine < 0) { 
    currentLine = 0;
    console.log(`Repeat line. Accumulator at end is ${accumulator}`);
    return true;
  }

  // Map to end of list if exceeded
  if (currentLine >= commandsLength) {
    currentLine = commandsLength - 1;
  }

  if (visitedCommands.includes(currentLine)) {
    console.log(`Repeat line. Accumulator at end is ${accumulator}`);
    return true;
  }

  return false;
}

function getSpecifiedLines(commands: Array <string>, specifier: string) {
  // 'specifier' should be one of 'jmp', 'nop', 'acc'
  let specifiedLines: Array <number> = [];
  commands.forEach((command: string, idx: number) => {
    if (command.includes(specifier)) {
      specifiedLines.push(idx);
    }
  });

  return specifiedLines;
}

function replaceLine(commands: Array <string>, replaceList: Array <number>,
    idx: number, replacee: string, replacer: string) {
  let swapCommands: Array <string> = [...commands];
  swapCommands[replaceList[idx]] = swapCommands[replaceList[idx]].replace(replacee, replacer);

  return swapCommands;
}

try {
  // Read in file
  let commands: Array <string> = fs.readFileSync(commandFile, 'utf-8').split('\n');
  
  // define rules from instructions
  const rules : {[key: string]: Function} = {
    "acc": (value: number) => {  // increase accumulator by value
      accumulator += value;
      currentLine += 1;
    },
    "jmp": (value: number) => {  // Jump to value and immediately execute that line
      currentLine += value;
    },  
    "nop": (value: number) => {  // No operation, execute instruction below
      currentLine += 1;
    }  
  }

  function executeLine(line: string) {
    // Get instruction from line
    let command: string, value: number;
    let splitLine: Array <string> = line.split(' ');
    command = splitLine[0].trim();
    value = parseFloat(splitLine[1]);
  
    // Execute instruction
    visitedCommands.push(currentLine);
    rules[command](value);
  }

  // puzzle 1: find where the instructions repeat and return accumulator
  let done: boolean = false;


  while (!done) {
    executeLine(commands[currentLine]);
    done = checkListBounds(currentLine, commands.length, visitedCommands);
  }

  // puzzle 2: one of the 'nop' or 'jmp' instructions needs to be swapped
  // to the other so that the program will terminate by executing th
  // instruction after the last line ('currentLine' == 'command.length')
  // Find potential commands to change
  let jmpLines: Array <number> = getSpecifiedLines(commands, 'jmp');
  let nopLines: Array <number> = getSpecifiedLines(commands, 'nop');

  let jmpIdx: number = 0;
  let nopIdx: number = 0;

  while (!programTerminated) {
    // Try 'jmp' switch
    if (jmpIdx < jmpLines.length) {
      let swapCommands = replaceLine(commands, jmpLines, jmpIdx, 'jmp', 'nop');

  
      done = false;
      resetGlobals();
  
      // If this does not terminate properly, the program will keep running
      while (!done) {
        executeLine(swapCommands[currentLine]);
        done = checkListBounds(currentLine, swapCommands.length, visitedCommands)
      }
  
      jmpIdx++;
    }

    if (nopIdx < nopLines.length) {
      // Try 'nop' switch
      let swapCommands = replaceLine(commands, nopLines, nopIdx, 'nop', 'jmp');

      done = false;
      resetGlobals();
      
      // If this does not terminate properly, the program will keep running
      while (!done) {
        executeLine(swapCommands[currentLine]);
        done = checkListBounds(currentLine, swapCommands.length, visitedCommands)
      }
  
      nopIdx++;
    }

    if (!programTerminated && jmpIdx >= jmpLines.length && nopIdx >= nopLines.length) {
      console.log(`Could not replace properly!`);
      break;
    }
  }
  

} catch (error) {
  console.log(error);
}