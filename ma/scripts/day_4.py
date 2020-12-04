"""Quite messy - I should change this to using dictionaries and not strings at some point."""
import csv
import os
import pathlib
import warnings

import numpy as np
import pandas as pd


warnings.filterwarnings("ignore")


# Get data and preprocess
# Can't just do pd.read_csv() as structure of each id is different
os.chdir(pathlib.Path(__file__).parent)
ids = [""]
with open('../data/day_4.txt', 'r') as fd:
    reader = csv.reader(fd)
    i = 0
    for row in reader:
        if row == []:
            ids[-1] += " "
            ids.append("")
            i += 1
        else:
            ids[-1] += " " + row[0]
            
passports = pd.DataFrame(index=np.arange(len(ids)))
passports["id"] = ids


# Part 1
passports["valid"] = 0
for i in range(len(passports)):
    if np.all([key in passports["id"][i] 
               for key in ["byr:", "iyr:", "eyr:", "hgt:", "hcl:", "ecl:", "pid:"]]):
        passports["valid"][i] = 1
print("Day 4, Part 1:", passports["valid"].sum())


# Part 2
passports["valid_2"] = 0
for i in range(len(passports)):
    pass_id = passports["id"][i]
    if not np.all([key in pass_id 
                   for key in ["byr:", "iyr:", "eyr:", "hgt:", "hcl:", "ecl:", "pid:"]]):
        continue
    
    field = pass_id[pass_id.find("byr:") + 4:]
    field = int(field[:field.find(" ")])
    if field >= 1920 and field <= 2002:
        passports["valid_2"][i] += 1

    field = pass_id[pass_id.find("iyr:") + 4:]
    field = int(field[:field.find(" ")])
    if field >= 2010 and field <= 2020:
        passports["valid_2"][i] += 1    
        
    field = pass_id[pass_id.find("eyr:") + 4:]
    field = int(field[:field.find(" ")])
    if field >= 2020 and field <= 2030:
        passports["valid_2"][i] += 1  
        
    field = pass_id[pass_id.find("hgt:") + 4:]
    field = field[:field.find(" ")]
    if field[-2:] in ["cm", "in"] and field[:-2].isdigit():
        if field[-2:] == "in" and int(field[:-2]) >= 59 and int(field[:-2]) <= 76:
            passports["valid_2"][i] += 1  
        elif field[-2:] == "cm" and int(field[:-2]) >= 150 and int(field[:-2]) <= 193:
            passports["valid_2"][i] += 1  
        
    field = pass_id[pass_id.find("hcl:") + 4:]
    field = field[:field.find(" ")]
    if field[0] == "#" and np.all([i.isdigit() or i in ["a", "b", "c", "d", "e", "f"] for i in field[1:]]):
        passports["valid_2"][i] += 1  
        
    field = pass_id[pass_id.find("ecl:") + 4:]
    field = field[:field.find(" ")]
    if field in ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"]:
        passports["valid_2"][i] += 1  
    
    field = pass_id[pass_id.find("pid:") + 4:]
    field = field[:field.find(" ")]
    if field.isdigit() and len(field) == 9:
        passports["valid_2"][i] += 1  
print("Day 4, Part 2:", (passports["valid_2"] == 7).sum())
