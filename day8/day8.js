const fs = require('fs');
let accumulator = 0;
let currentLine = 0;
let commandFile = './test.txt';
try {
    let commands = fs.readFileSync(commandFile, 'utf-8').split('\n');
    const rules = {
        "acc": (value) => { accumulator += value; },
        "jmp": (value) => { currentLine = value; executeLine(commands[currentLine]); },
        "nop": (value) => { }
    };
    function executeLine(line) {
        console.log(line);
        let command, value;
        command = line.split(' ')[0].trim();
        value = parseFloat(line);
        console.log(command, value);
        rules[command](value);
        return [accumulator, currentLine];
    }
    let currentAcc, dummyLine;
    commands.forEach((command) => {
        [currentAcc, dummyLine] = executeLine(command);
        console.log(`${currentAcc}, ${dummyLine}`);
    });
}
catch (error) {
    console.log(error);
}
//# sourceMappingURL=day8.js.map