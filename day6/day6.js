const fs = require('fs');


const countOccurrences = (arr, val) => arr.reduce((a, v) => (v === val ? a + 1 : a), 0);

formFile = './day6.txt';

try {
  const data = fs.readFileSync(formFile, 'utf-8');
  const lines = data.split(/\r?\n/);

  // Add an empty line to the end of 'lines' if the file does not contain
  // empty line at the end
  if (lines[-1] != '') {
    lines.push('');
  }

  let groupIdx = 0;
  let personIdx = 0;

  let groupAnswers1 = [];  // puzzle 1, combine answers in group with 'OR'
  let groupAnswers2 = [];  // puzzle 2, combine answers in group with 'AND'
  let answers = [];
  lines.forEach((line) => {
    // Check for empty line (new line character) or end of file
    // Group finished, analyse results of group
    if (line == '') {
      // Puzzle 1 - OR: push number of unique answers to 'groupAnswers'
      let uniqueAnswerCount = [...new Set(answers)].length;
      groupAnswers1.push(uniqueAnswerCount);

      // Puzzle 2 - AND: Count answers where number of occurrences is the
      // length of the list (so everyone answered 'yes')
      let allAnswerCount = 0;
      let checkedAnswers = [];
      answers.forEach(answer => {
        if (!checkedAnswers.includes(answer) && countOccurrences(answers, answer) === personIdx) {
          allAnswerCount++;
          checkedAnswers.push(answer);
        }
      });
      
      groupAnswers2.push(allAnswerCount);

      groupIdx++;
      answers = [];
      personIdx = 0;

    } else {
      // Add person's answers to 'answers'
      answers.push(...line);
      personIdx++;  
    }
  });

  let uniqueSum = groupAnswers1.reduce((a, v) => a + v);
  let exclusiveSum = groupAnswers2.reduce((a, v) => a + v);
  console.log(`Puzzle 1: There were ${uniqueSum} 'yes' answers.`);
  console.log(`Puzzle 2: There were ${exclusiveSum} 'yes' answers.`);

} catch (err) {
  console.log(err);
}
