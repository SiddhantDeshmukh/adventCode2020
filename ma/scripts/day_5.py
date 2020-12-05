import os
import pathlib

import numpy as np
import pandas as pd


# Get data 
os.chdir(pathlib.Path(__file__).parent)
ids = pd.read_csv('../data/day_5.txt', header=None)
ids.rename({0: "id"}, axis=1, inplace=True)


# Part 1
def binary_split(id_: str, min_bin: int, max_bin: int, lower_half: str) -> int:
    for j in range(len(id_)):
        if id_[j] == lower_half:
            max_bin = (min_bin + max_bin - 1) / 2
        else:
            min_bin = (min_bin + max_bin + 1) / 2      
    return int(min_bin)


ids["row"], ids["seat"] = None, None
for i, id_ in enumerate(ids["id"]):
    ids["row"][i] = binary_split(id_[:7], 0, 127, "F")
    ids["seat"][i] = binary_split(id_[7:], 0, 7, "L")  

ids["seat_id"] = ids["row"] * 8 + ids["seat"]
print("Day 5, Part 1:", ids["seat_id"].max())


# Part 2
seat_ids = np.array(ids["seat_id"]).astype(int)
for id_ in range(ids["seat_id"].max()):
    if id_ not in seat_ids and id_ + 1 in seat_ids and id_ - 1 in seat_ids:
        print("Day 5, Part 2:", id_)
