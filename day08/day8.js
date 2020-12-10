const fs = require('fs');
let accumulator = 0;
let currentLine = 0;
let visitedCommands = [];
let programTerminated = false;
let commandFile = './day8.txt';
function resetGlobals() {
    accumulator = 0;
    currentLine = 0;
    visitedCommands = [];
}
function checkListBounds(currentLine, commandsLength, visitedCommands) {
    if (currentLine == commandsLength) {
        console.log(`Program terminated successfully. Accumulator is ${accumulator}.`);
        programTerminated = true;
        return true;
    }
    if (currentLine < 0) {
        currentLine = 0;
        console.log(`Repeat line. Accumulator at end is ${accumulator}`);
        return true;
    }
    if (currentLine >= commandsLength) {
        currentLine = commandsLength - 1;
    }
    if (visitedCommands.includes(currentLine)) {
        console.log(`Repeat line. Accumulator at end is ${accumulator}`);
        return true;
    }
    return false;
}
function getSpecifiedLines(commands, specifier) {
    let specifiedLines = [];
    commands.forEach((command, idx) => {
        if (command.includes(specifier)) {
            specifiedLines.push(idx);
        }
    });
    return specifiedLines;
}
function replaceLine(commands, replaceList, idx, replacee, replacer) {
    let swapCommands = [...commands];
    swapCommands[replaceList[idx]] = swapCommands[replaceList[idx]].replace(replacee, replacer);
    return swapCommands;
}
try {
    let commands = fs.readFileSync(commandFile, 'utf-8').split('\n');
    const rules = {
        "acc": (value) => {
            accumulator += value;
            currentLine += 1;
        },
        "jmp": (value) => {
            currentLine += value;
        },
        "nop": (value) => {
            currentLine += 1;
        }
    };
    function executeLine(line) {
        let command, value;
        let splitLine = line.split(' ');
        command = splitLine[0].trim();
        value = parseFloat(splitLine[1]);
        visitedCommands.push(currentLine);
        rules[command](value);
    }
    let done = false;
    while (!done) {
        executeLine(commands[currentLine]);
        done = checkListBounds(currentLine, commands.length, visitedCommands);
    }
    let jmpLines = getSpecifiedLines(commands, 'jmp');
    let nopLines = getSpecifiedLines(commands, 'nop');
    let jmpIdx = 0;
    let nopIdx = 0;
    while (!programTerminated) {
        if (jmpIdx < jmpLines.length) {
            let swapCommands = replaceLine(commands, jmpLines, jmpIdx, 'jmp', 'nop');
            done = false;
            resetGlobals();
            while (!done) {
                executeLine(swapCommands[currentLine]);
                done = checkListBounds(currentLine, swapCommands.length, visitedCommands);
            }
            jmpIdx++;
        }
        if (nopIdx < nopLines.length) {
            let swapCommands = replaceLine(commands, nopLines, nopIdx, 'nop', 'jmp');
            done = false;
            resetGlobals();
            while (!done) {
                executeLine(swapCommands[currentLine]);
                done = checkListBounds(currentLine, swapCommands.length, visitedCommands);
            }
            nopIdx++;
        }
        if (!programTerminated && jmpIdx >= jmpLines.length && nopIdx >= nopLines.length) {
            console.log(`Could not replace properly!`);
            break;
        }
    }
}
catch (error) {
    console.log(error);
}
//# sourceMappingURL=day8.js.map