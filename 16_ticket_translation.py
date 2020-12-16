# Parse and validate the unknown fields in the tickets
import numpy as np
import re 

# Read in file with ticket information
with open("rsc/16_ticket_data.txt") as ticket_data:
    # Divide into 3 key sections
    rules, my_ticket, nearby = ticket_data.read().split("\n\n")
    # Rules parsing
    rule_dict = {}
    for l in rules.split("\n"):
        field, values = l.split(":")
        v1, v2, v3, v4 = re.findall(r"\d+", values)
        rule_dict[field] = f"({v1} <= val <= {v2}) or ({v3} <= val <= {v4})" 
    # Extract my_ticket data to list
    my_ticket = list(map(int, my_ticket.split("\n")[1].split(",")))
    # Extract nearby to list of lists of ints
    nearby = [list(map(int, l.split(","))) for l in nearby.split("\n")[1:]]

# Evalute nearby tickets, sum up invalid values
invalid_count, valid_nearby = 0, nearby.copy()
for ticket in nearby:
    for val in ticket:
        if sum([eval(rule_dict[rule]) for rule in rule_dict]) == 0:
            invalid_count += val
            valid_nearby.remove(ticket)

# Identify potential fields checking consistent truth in valid_nearby tickets
rule_cols, valid_array = {}, np.array(valid_nearby)
for rule in rule_dict:
    # Find the column numbers for which this rule is always true
    candidate_columns = []
    for col in range(len(my_ticket)):
        # Get truth of this test for all values from col of valid_nearby
        if np.all([eval(rule_dict[rule]) for val in valid_array[:, col]]):
            candidate_columns.append(col)
    rule_cols[rule] = candidate_columns
        
# Collapse down the fields, iteratively finding the certain column + removing
sorted_ri = {s: rule_cols[s] for s in sorted(rule_cols, key=lambda k: len(rule_cols[k]))}
rule_keys = list(sorted_ri.keys())
for ind, rule in enumerate(rule_keys):
    val = sorted_ri[rule][0]
    sorted_ri[rule] = val
    for cleanup_rule in rule_keys[ind+1:]:
        if val in sorted_ri[cleanup_rule]:
            sorted_ri[cleanup_rule].remove(val)

# Find product of departure fields in my ticket
departure_product = 1
for field in sorted_ri:
    if "departure" in field:
        departure_product *= my_ticket[sorted_ri[field]]

# Problem Solutions
print(f"Part 1: Product of invalid ticket values = {invalid_count}")
print(f"Part 2: Product of my departure fields = {departure_product}")
