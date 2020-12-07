"""Not the most elegant solution but it works"""
import os
import pathlib
import warnings

import numpy as np
import pandas as pd


warnings.filterwarnings("ignore")


# Get data
os.chdir(pathlib.Path(__file__).parent)
with open("../data/day_7.txt") as day_7_file:
    rules = day_7_file.read().split("\n")[:-1]
bags = [i[:i.find(" bag")] for i in rules]


# Preprocess (turn strings into bag x bag dataframe with counts in rows)
bags_df = pd.DataFrame({"bag": bags})
for bag in bags:
    bags_df[bag] = 0
    
for i in range(len(bags)):
    rule = rules[i]
    contents = rule[rule.find("contain") + 8:].split(", ")
    if contents == ["no other bags."]:
        continue
    for content in contents:
        bag = content[content.find(" ") + 1:content.find(" bag")]
        num = content[:content.find(" ")]
        bags_df[bag][i] = int(num)
        

# Part 1
bag_list = list(bags_df[bags_df["shiny gold"] > 0]["bag"])
curr_bags = bag_list.copy()
while len(curr_bags) != 0:
    new_curr_bags = []
    for bag in curr_bags:
        new_curr_bags += list(bags_df[bags_df[bag] > 0]["bag"])
    bag_list += new_curr_bags
    curr_bags = new_curr_bags.copy()
print("Day 7, Part 1:", len(np.unique(bag_list)))


# Part 2
count = 0
bags_df.index = bags_df["bag"]
def bag_count(bag):
    bag_row = bags_df.loc[bag][1:]  # [1:] to get rid of 'bag' column
    count = bag_row.sum()
    if count == 0:  # Base case (i.e. final stop of recursion)
        return count
    new_bags = list(bags_df[bag_row > 0].index)  # bags contained in current bag
    for new_bag in new_bags:
        count += bag_row[new_bag] * bag_count(new_bag)  # recursion!
    return count
print("Day 7, Part 2:", bag_count("shiny gold"))
