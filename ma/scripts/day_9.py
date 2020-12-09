from itertools import permutations
import os
import pathlib


# Get data
os.chdir(pathlib.Path(__file__).parent)
with open("../data/day_9.txt") as f:
    nums = [int(line) for line in f.readlines()]


# Part 1
for i in range(25, len(nums)):
    if all([j + k != nums[i] for j, k in permutations(nums[i - 25:i], 2)]):
        print("Day 9, Part 1:", nums[i])
        break


# Part 2
bad_num = nums[i]
for k in range(2, len(nums)):
    sums = [sum(nums[i: i + k]) for i in range(len(nums) - k)]
    if bad_num in sums:
        idx = sums.index(bad_num)
        print("Day 9, Part 2:", max(nums[idx:idx + k]) + min(nums[idx:idx + k]))
        break
