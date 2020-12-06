import os
import pathlib


# Get data
os.chdir(pathlib.Path(__file__).parent)
with open("../data/day_6.txt") as day_6_file:
    answers = day_6_file.read().split("\n\n")[:-1]  # -1 to get rid of last newline


# Part 1
print("Day 6, Part 1:", sum([len(set(i.replace("\n", ""))) for i in answers]))


# Part 2
overlap_count = 0
for answer in answers:
    answer_set = [set(x) for x in answer.split("\n")]
    overlap = answer_set[0]
    for j in range(1, len(answer_set)):
        overlap = overlap & answer_set[j]
    overlap_count += len(overlap)
print("Day 6, Part 2:", overlap_count)
