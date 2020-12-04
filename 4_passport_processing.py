# Read in passports file and determine which passport entries are "valid"


def check_passport(passport_string, validate_fields=False):
    # Separate fields from passport_string into dictionary
    clean_passport = passport_string.replace("\n", " ").split(" ")
    clean_fields = {f.split(":")[0]:f.split(":")[1] for f in clean_passport}
    # Check if the required fields are present
    valid_test = all(item in clean_fields for item in FIELD_RULES)
    # If has fields and data validation needed, check each validation rule 
    if valid_test and validate_fields:
        for field in FIELD_RULES:
            # Extract field value (v) and evaluate rule
            v = clean_fields[field]
            valid_test = eval(FIELD_RULES[field])
            # If this test fails, don't try the rest
            if not valid_test: break
    return valid_test


# Required set of passport fields and corresponding rules
FIELD_RULES = {
    "byr": "(1920 <= int(v) <= 2002)",
    "iyr": "(2010 <= int(v) <= 2020)",
    "eyr": "(2020 <= int(v) <= 2030)",
    "hgt": "(('cm' in v) and (150 <= int(v[:-2]) <= 193)) or \
            (('in' in v) and (59 <= int(v[:-2]) <= 76))",
    "hcl": "(len(v) == 7) and (v[0] == '#') and \
            all(l in 'abcdef0123456789' for l in v[1:])",
    "ecl": "v in ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth']",
    "pid": "(len(v) == 9) and type(int(v)) == int"
}

# Read in passports
with open("rsc/4_passports.txt") as pass_file:
    passports = pass_file.read().split("\n\n")

# Iterate over the entries, clean, and determine if valid
correct_fields, valid_fields = 0, 0
for passport in passports:
    correct_fields += int(check_passport(passport, validate_fields=False))
    valid_fields += int(check_passport(passport, validate_fields=True))

# Problem Solutions
print(f"Part 1: {correct_fields} passwords with 'correct' fields")
print(f"Part 2: {valid_fields} passwords with 'correct' and validated fields")
