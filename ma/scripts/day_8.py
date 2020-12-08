import os
import pathlib
import warnings

import pandas as pd


warnings.filterwarnings("ignore")


# Get data and preprocess
os.chdir(pathlib.Path(__file__).parent)
rules = pd.read_csv("../data/day_8.txt", header=None)
rules.rename({0: "rule"}, axis=1, inplace=True)

rules["cmd"] = [i[:i.find(" ")] for i in rules["rule"]]
rules["num"] = [int(i[i.find(" ") + 1:]) for i in rules["rule"]]


# Part 1
def execute_game():
    stop, pos, acc = 0, 0, 0
    rules["count"] = 0
    while rules["count"][pos] != 1:
        rules["count"][pos] += 1
        cmd = rules["cmd"][pos]
        if cmd == "acc":
            acc += rules["num"][pos]
            pos += 1
        elif cmd == "jmp":
            pos += rules["num"][pos]
        elif cmd == "nop":
            pos += 1
        if pos >= len(rules):
            stop = 1
            break
    return acc, stop
print("Day 8, Part 1:", execute_game()[0])


# Part 2
rules_reset = rules.copy()
for i in range(len(rules)):
    rules = rules_reset.copy()  # reset each time
    if rules["cmd"][i] == "acc":
        continue
    elif rules["cmd"][i] == "jmp":
        rules["cmd"][i] = "nop"
    elif rules["cmd"][i] == "nop":
        rules["cmd"][i] = "jmp"
    acc, stop = execute_game()
    if stop == 1:
        print("Day 8, Part 2:", acc)
        break
