const fs = require('fs');


passportFile = '../res/day4.txt';

// Conditions for valid fields
const isValidByr = (value) => (value.length == 4) && (1920 <= value) && (value <= 2002);
const isValidIyr = (value) => (value.length == 4) && (2010 <= value) && (value <= 2020);
const isValidEyr = (value) => (value.length == 4) && (2020 <= value) && (value <= 2030);
const isValidHgt = function(value) {
  const height = parseInt(value);

  if (`${value}`.includes('cm')) {
    return (150 <= height) && (height <= 193);

  } else if (`${value}`.includes('in')) {
    return (59 <= height) && (height <= 76);

  } else {
    return false;
  }
}

const isValidHcl = function(value) {
  if (value[0] != '#') {
    return false;
  }

  if (value.length != 7) {
    return false;
  }

  // Check requirements with regex
  let re = /[0-9a-f]/
  return re.test(value);
}

const isValidEcl = (value) => (['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(value));
const isValidPid = (value) => (value.length == 9);

function isValidField(passport, field) {
  // Check validity of individual fields
  let value = passport[field];
  let isValid = true;
  const fieldFunctionMap = {
    'byr': isValidByr,
    'iyr': isValidIyr,
    'eyr': isValidEyr,
    'hgt': isValidHgt,
    'hcl': isValidHcl,
    'ecl': isValidEcl,
    'pid': isValidPid,
    'cid': true
  }

  isValid = fieldFunctionMap[field](value);

  return isValid;

}

function isValidPassport(passportString) {
  // Ignore 'cid'
  const requiredFields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid']

  let passport = JSON.parse(passportString);
  let isValid = true;
  
  requiredFields.every(field => {
    // console.log(field);
    if  (!(field in passport)) {
      console.log(`Field ${field} is missing!`);
      console.log(passport);
      isValid = false;
      return isValid;
    }

    if (!isValidField(passport, field)) {
      console.log(`Field ${field} is invalid!`);
      console.log(passport);
      isValid = false;
      return isValid;
    }
    
    return true;
  });

  return isValid;
}

function keyValueStringFromField(field) {
  let key, value;
  [key, value] = field.split(':');
  let keyValueString = `\"${key}\":\"${value}\"`;

  return keyValueString;
}


try {
  const data = fs.readFileSync(passportFile, 'utf-8');
  const lines = data.split(/\r?\n/);

  // Add an empty line to the end of 'lines' if the file does not contain
  // empty line at the end
  if (lines[-1] != '') {
    lines.push('');
  }

  let passportIdx = 0;
  let fieldIdx = 0;  // line in passport
  let passport;

  let numValidPassports = 0;

  lines.forEach((line, idx) => {
    let fields = line.split(/\s+/);

    // Check for empty line (new line character) or end of file
    if (fields.join('') == '' || idx == lines.length - 1) {
      // Check validity and move on to next passport
      passport += '}';

      if (isValidPassport(passport)) {
        numValidPassports++;
      }

      passportIdx++;
      passport = '';
      fieldIdx = 0;

    } else {
      fields.forEach(field => {
        keyValueString = keyValueStringFromField(field);

        if (fieldIdx == 0) {
          passport = `{${keyValueString}`
        } else {
          passport += `, ${keyValueString}`;
        }
  
        fieldIdx++;
      });
    }
  });

  console.log(`${numValidPassports} / ${passportIdx} valid passports.`)

} catch (err) {
  console.log(err);
}
