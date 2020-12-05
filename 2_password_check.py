# Read in password file and determine how many don't fit the different rules


def test_valid_password(pass_string, rule_set="range"):
    """pass_string given as [number range] [letter]: [password]"""
    # Split up the password string into counts, letter, password
    nums, letter, pwd = pass_string.split(" ")
    # Clean each element
    nums = [int(n) for n in nums.split("-")]
    letter = letter.replace(":", "")
    pwd = pwd.replace("\n", "")
    # Perform password test, specified by rule_set
    validity_result = eval(RULES[rule_set])
    return int(validity_result)


RULES = {"range": "nums[0] <= pwd.count(letter) <= nums[1]",
        "position": "(pwd[nums[0]-1] == letter) ^ (pwd[nums[1]-1] == letter)"}

# Read in file line by line
with open("rsc/2_passwords.txt") as password_file:
    passwords = password_file.read().split("\n")

range_valid_count, position_valid_count = 0, 0
for password in passwords:
    range_valid_count += test_valid_password(password, rule_set="range")
    position_valid_count += test_valid_password(password, rule_set="position")

# Problem Solutions
print(f"Part 1: {range_valid_count} are valid")
print(f"Part 2: {position_valid_count} are valid")
