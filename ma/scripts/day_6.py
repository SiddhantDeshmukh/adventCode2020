import csv
import os
import pathlib
import warnings

import numpy as np
import pandas as pd


warnings.filterwarnings("ignore")


# Get data
os.chdir(pathlib.Path(__file__).parent)
with open("../data/day_6.txt") as day_6_file:
    answers = day_6_file.read().split("\n\n")[:-1]  # -1 to get rid of last newline
groups = pd.DataFrame(index=np.arange(len(answers)))
groups["answers"] = answers


# Part 1
groups["unique"] = [len(set(groups["answers"][i].replace("\n", ""))) 
                    for i in range(len(answers))]
print("Day 6, Part 1:", groups["unique"].sum())


# Part 2
groups["overlap"] = None
for i, answers in enumerate(groups["answers"]):
    answers_set = [set(x) for x in answers.split("\n")]
    overlap = answers_set[0]
    for j in range(1, len(answers_set)):
        overlap = overlap & answers_set[j]
    groups["overlap"][i] = len(overlap)
print("Day 6, Part 2:", groups["overlap"].sum())
