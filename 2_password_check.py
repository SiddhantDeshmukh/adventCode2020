# Read in password file and determine how many don't fit the different rules


def extract_password_content(password_line):
    # Split up the password string into counts, letter, password
    numbers, letter, password = password_line.split(" ")
    # Clean each element
    numbers = [int(n) for n in numbers.split("-")]
    letter = letter.replace(":", "")
    password = password.replace("\n", "")
    return numbers, letter, password


def test_valid_range(pass_string, show=False):
    """Rule is given as [count of occurances range] [letter]: [password]"""
    # Extract the data for this password string
    counts, letter, password = extract_password_content(pass_string)
    # Perform password test
    validity_test = counts[0] <= password.count(letter) <= counts[1]
    # Display if wanted
    if show:
        print(f" Counts: {counts}\n",
            f"Letter: {letter}\n",
            f"Password: {password}\n",
            f"Valid: {int(validity_test)}\n")
    return (int(validity_test))


def test_valid_position(pass_string, show=False):
    """Rule is given as [exlusive positions] [letter]: [password]"""
    # Extract the data for this password string
    pos, letter, pwd = extract_password_content(pass_string)
    # Perform password test
    validity_test = (pwd[pos[0]-1] == letter) ^ (pwd[pos[1]-1] == letter)
    # Display if wanted
    if show:
        print(f" Positions: {pos}\n",
            f"Letter: {letter}\n",
            f"Password: {pwd}\n",
            f"Valid: {int(validity_test)}\n")

    return (int(validity_test))


# Read in file line by line
with open("rsc/2_passwords.csv") as password_file:
    range_valid_count, position_valid_count = 0, 0
    for line in password_file.readlines():
        range_valid_count += test_valid_range(line, show=False)
        position_valid_count += test_valid_position(line, show=False)

# Problem Solutions
print(f"Part 1: {range_valid_count} are valid")
print(f"Part 2: {position_valid_count} are valid")