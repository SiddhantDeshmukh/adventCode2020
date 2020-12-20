# Read in the rules and messages and work out how many meet Rule 0
# Major thanks to iiTsGiga for their implementation, which this is adapted from
# https://github.com/iiTsGiga/advent-of-code-2020/blob/main/day%2019/day19_2.py
import re

def parse_rules(rule_num):
    # If this rule is "a" or "b", return that
    if rule_dict[rule_num] in "ab":
        return rule_dict[rule_num]
    # Else, it it either two rules, or a pair of two rules, so split them 
    sub_rules = rule_dict[rule_num].split(" | ")
    for ind, part in enumerate(sub_rules):
        # Update the sub_rules with a search regex with recursive calling
        collect_sub_parse = ''.join(parse_rules(int(n)) for n in part.split())
        sub_rules[ind] = "(" + collect_sub_parse + ")"
    return "(" + "|".join(sub_rules) + ")"

with open("rsc/19_message_rules.txt") as message_info:
    rules, messages = message_info.read().split("\n\n")
    # Parse rules into dictionary
    rule_dict = {}
    for r in rules.split("\n"):
        rule_number, rule = r.split(": ")
        rule_dict[int(rule_number)] = rule.strip('"')
    # Seprate messages by line
    messages = messages.split("\n")

# Parse rule 0, then test the matching messages
rule0_regex = parse_rules(0)
part1_count = sum(bool(re.match(f"^{rule0_regex}$", m) or 0) for m in messages)

# Rules for 8 and 11 can now loop ("8: 42 | 42 8", "11: 42 31 | 42 11 31") so
# iteratively express to a fixed depth and see if the number of matches changes
current_matches, previous_matches, depth = 0, -1, 2
while current_matches != previous_matches:
    # Updates rule 8 and 11 at this depth
    rule_dict[8] = "| ".join("42 "*d for d in range(1, depth)).strip()
    rule_dict[11] = "| ".join("42 "*d+"31 "*d for d in range(1, depth)).strip()
    # Evalute and count matches
    depth_regex = parse_rules(0)
    count = sum(bool(re.match(f"^{depth_regex}$", m) or 0) for m in messages)
    # Update storage
    previous_matches = current_matches
    current_matches = count
    # Update depth
    depth += 1
    
# Problem Solutions
print(f"Part 1: Valid messages with simple rules = {part1_count}")
print(f"Part 2: Valid messages with looping rules = {current_matches}")
