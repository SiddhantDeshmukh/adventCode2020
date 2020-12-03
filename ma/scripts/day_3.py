import os
import pathlib
import warnings

import numpy as np
import pandas as pd


warnings.filterwarnings("ignore")


# Get data and preprocess
os.chdir(pathlib.Path(__file__).parent)
trees = pd.read_csv("../data/day_3.txt", header=None)
trees.rename({0: "map"}, axis=1, inplace=True)

cols = len(trees["map"][0])
rows = len(trees)

def col_calculator(rows, cols, right):
    needed_rows = (rows - 1) * right + 1
    return int(np.ceil(needed_rows / cols))

trees["map"] = [i * col_calculator(rows, cols, 7) for i in trees["map"]]


# Part 1
trees["char_2"] = "."
for i in range(1, len(trees)):
    trees["char_2"][i] = trees["map"][i][i * 3]
    
print("Day 3, Part 1:", trees["char_2"].value_counts()["#"])


# Part 2
trees["char_1"], trees["char_3"], trees["char_4"] = ".", ".", "."
for i in range(1, len(trees)):
    trees["char_1"][i] = trees["map"][i][i]
    trees["char_3"][i] = trees["map"][i][i * 5]
    trees["char_4"][i] = trees["map"][i][i * 7]
    
trees["char_5"] = "."
for i in range(2, len(trees) + 1, 2):
    trees["char_5"][i] = trees["map"][i][int(i / 2)]
    
tree_mult = 1
for route in np.arange(1, 6).astype(int):
    tree_mult *= trees["char_{}".format(route)].value_counts()["#"]
print("Day 3, Part 2:", tree_mult)
