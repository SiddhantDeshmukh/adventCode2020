# Run this strange initialisation code, by masking and storing values to memory
from itertools import product
import re


def bitmask_v1(bin, mask):
    return int(''.join([b if m == "X" else m for b, m in zip(bin, mask)]), 2)


def bitmask_v2(bin, mask):
    return ''.join([b if m == "0" else m for b, m in zip(bin, mask)])


# Read in docking initialisation instructions
with open("rsc/14_docking_program.txt") as dock_data:
    instruc = dock_data.read().split('\n')

# Part 1: Use the original bitmask, and masked value to single location
mask = "X" * 36
mem_v1 = {}
for line in instruc:
    # Split line by the = sign to get instruction and value 
    cmnd, value = line.split('=')
    # If mask, update the bitmask, else add value to correct mem location
    if cmnd.strip() == "mask":
        mask = value.strip()
    elif "mem" in cmnd:
        # Get location and value from line
        mem_loc = ''.join(re.findall("[(0-9)*]", cmnd))
        binary_int = format(int(value.strip()), 'b').zfill(36)
        # Mask and save to mem
        mem_v1[mem_loc] = bitmask_v1(binary_int, mask)


# Part 2: Use new bitmask, store single value to multiple memory locations
mask = "X" * 36
mem_v2 = {}
for line in instruc:
    # Split line by the = sign to get instruction and value 
    cmnd, value = line.split('=')
    # If mask, update the bitmask, else add value to correct mem locations
    if cmnd.strip() == "mask":
        mask = value.strip()
    elif "mem" in cmnd:
        # Get value (as int) and unmasked memory location (binary) from line
        integer_value = int(value.strip())
        mem_loc = int(''.join(re.findall("[(0-9)*]", cmnd)))
        bin_mem_loc = format(mem_loc, 'b').zfill(36)
        floating_locmask = bitmask_v2(bin_mem_loc, mask)
        # Location of X's in floating memory location + generate binary options
        x_locs = [m.start() for m in re.finditer("X", floating_locmask)]
        replacements = product((0, 1), repeat=floating_locmask.count("X"))
        # Iterate over these floating options and save value to that memory loc
        for r in replacements:
            temp = list(floating_locmask).copy()
            for ind, loc in enumerate(x_locs):
                temp[loc] = str(r[ind])
            mem_v2[int("".join(temp), 2)] = integer_value


# Problem Solutions
print(f"Part 1: Sum of memory with decode V1: {sum(mem_v1.values())}")
print(f"Part 2: Sum of memory with decode V2: {sum(mem_v2.values())}")
