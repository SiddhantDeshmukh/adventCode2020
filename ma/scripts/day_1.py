import numpy as np
import pandas as pd

nums = np.array(pd.read_csv("../data/day_1.txt", header=None)[0])

for num in nums:
    if np.any(nums == 2020 - num):
        print("Day 1, Part 1:", num * (2020 - num))
        break
stop = 0
for i, num in enumerate(nums):
    nums_2 = np.delete(nums, i)
    if stop == 1:
        break
    for j, num_2 in enumerate(nums_2):
        if np.any(nums == 2020 - num - num_2):
            print("Day 1, Part 2:", num * num_2 * (2020 - num - num_2))
            stop = 1
            break
