from itertools import permutations
import os
import pathlib

import numpy as np
import pandas as pd


# Get data
os.chdir(pathlib.Path(__file__).parent)
nums = np.array(pd.read_csv("../data/day_9.txt", header=None)[0])


# Part 1
for i in range(25, len(nums)):
    if np.all([j + k != nums[i] for j, k in permutations(nums[i - 25:i], 2)]):
        print("Day 9, Part 1:", nums[i])
        break


# Part 2
bad_num = nums[i]
for k in range(2, len(nums)):
    sums = [np.sum(nums[i: i + k]) for i in range(len(nums) - k)]
    if bad_num in sums:
        idx = np.where(np.array(sums) == bad_num)[0][0]
        print("Day 9, Part 2:", max(nums[idx:idx + k]) + min(nums[idx:idx + k]))
        break
