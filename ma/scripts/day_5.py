import os
import pathlib

import numpy as np
import pandas as pd


# Get data 
os.chdir(pathlib.Path(__file__).parent)
ids = pd.read_csv('../data/day_5.txt', header=None)
ids.rename({0: "id"}, axis=1, inplace=True)


# Part 1
ids["row"], ids["seat"] = None, None
for i, id_ in enumerate(ids["id"]):
    row_min, row_max = 0, 127
    for j in range(7):
        if id_[j] == "F":
            row_max = (row_min + row_max - 1) / 2
        else:
            row_min = (row_min + row_max + 1) / 2
    ids["row"][i] = int(row_min)
        
    seat_min, seat_max = 0, 7
    for j in range(7, 10):
        if id_[j] == "L":
            seat_max = (seat_min + seat_max - 1) / 2
        else:
            seat_min = (seat_min + seat_max + 1) / 2
    ids["seat"][i] = int(seat_min)   
    
ids["seat_id"] = ids["row"] * 8 + ids["seat"]
print("Day 5, Part 1:", ids["seat_id"].max())


# Part 2
seat_ids = np.array(ids["seat_id"]).astype(int)
for id_ in range(ids["seat_id"].max()):
    if id_ not in seat_ids and id_ + 1 in seat_ids and id_ - 1 in seat_ids:
        print("Day 5, Part 2:", id_)
