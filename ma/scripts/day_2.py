import warnings

import numpy as np
import pandas as pd


warnings.filterwarnings("ignore")


# Get data
codes = pd.read_csv("../data/day_2.txt", header=None)
codes.rename({0: "code"}, axis=1, inplace=True)


# Part 1
codes["min_num"] = [i[:i.find("-")] for i in codes["code"]]
codes["min_num"] = codes["min_num"].astype(int)

codes["max_num"] = [i[i.find("-") + 1: i.find(" ")] for i in codes["code"]]
codes["max_num"] = codes["max_num"].astype(int)

codes["letter"] = [i[i.find(":") - 1] for i in codes["code"]]
codes["string"] = [i[i.find(":") + 2:] for i in codes["code"]]

codes["pass"] = 0
for i, code in enumerate(codes["code"]):
    count = codes["string"][i].count(codes["letter"][i])
    if (count >= codes["min_num"][i] and
        count <= codes["max_num"][i]):
        codes["pass"][i] = 1
print("Day 2, Part 1:", codes["pass"].sum())


# Part 2 - remember to decrease index by 1
codes["pass_2"] = 0
for i, string in enumerate(codes["string"]):
    if (string[codes["min_num"][i] - 1] == codes["letter"][i] and
        string[codes["max_num"][i] - 1] != codes["letter"][i]):
        codes["pass_2"][i] = 1
    if (string[codes["min_num"][i] - 1] != codes["letter"][i] and
        string[codes["max_num"][i] - 1] == codes["letter"][i]):
        codes["pass_2"][i] = 1
print("Day 2, Part 2:", codes["pass_2"].sum()) 
