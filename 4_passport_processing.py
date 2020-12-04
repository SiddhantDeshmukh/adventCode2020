# Read in passports file and determine which passport entries are "valid"
# Valid rule for step 1 is must contain all 8 fields OR all fields except cid

def check_valid_passport(passport_string, field_valid=False):
    # Separate fields from passport_string
    clean_passport = passport_string.replace("\n", " ").split(" ")
    # Extract data from each field into dictionary
    clean_fields = {f.split(":")[0]:f.split(":")[1] for f in clean_passport}
    # Check if the required fields are present
    valid_test = all(item in clean_fields for item in FIELD_RULES)
    # If has required fields and data validation needed, check validation rules 
    if valid_test and field_valid:
        # Try each of the field rules
        for field in FIELD_RULES:
            # Extract this field's value (v)
            v = clean_fields[field]
            valid_test = eval(FIELD_RULES[field])
            # If a test fails, don't try the rest
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
    correct_fields += int(check_valid_passport(passport, field_valid=False))
    valid_fields += int(check_valid_passport(passport, field_valid=True))

# Problem Solutions
print(f"Part 1: {correct_fields} passwords with 'correct' fields")
print(f"Part 2: {valid_fields} passwords with 'correct' and validated fields")
