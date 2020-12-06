# Resolve the customs questions

# Read in the file
with open("rsc/6_customs_answers.txt") as customs_file:
    customs_answers = customs_file.read().split("\n\n")

# Split the individual answers, count number of:
# 1. Unique question yes' in group
# 2. Shared yes' per group
unique_yes_count, shared_yes_count = 0, 0
for answers in customs_answers:
    # Get individuals answers within group
    indiv_answers = answers.split("\n")

    # Join to find count of uniques yes' across group
    unique_yes_count += len(set(''.join(indiv_answers)))

    # Find shared yes by comparing first answer content to all others
    first_answer = indiv_answers[0]
    # Check each letter in this answer ...
    for letter in first_answer:
        # is in all the other letters
        letter_test = [letter in word for word in indiv_answers[1:]]
        # If found all, add one to the shared_yes_count
        if sum(letter_test) == len(indiv_answers)-1:
            shared_yes_count += 1

# Problem Solutions
print(f"Part 1: {unique_yes_count} unique 'yes's across all groups")
print(f"Part 2: {shared_yes_count} shared within group 'yes's")
