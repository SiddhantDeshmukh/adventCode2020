# Simulate the 3D and 4D Conway Cubes from 2D input
from itertools import product

def neighbours(pos, adjacent):
    """List of all the neighbour positions defined in adjacent"""
    return set(tuple(p + d for p,d in zip(pos, deltas)) for deltas in adjacent)

def conway_iterations(active, adjacent_cells, steps=3):
    """Carry out Conways GOL in n-dimensions, ensure location and neighbour
    rules are provided with the same length items"""
    for _ in range(steps):
        # Create "scan" set with active and neighbours
        scan_set = active.union(*[neighbours(c, adjacent_cells) for c in active])
        # Iterate over scan and use update rules to figure out next state
        new_active = set()
        for c in scan_set:
            # Get number of active adjacent cells
            n = len(neighbours(c, adjacent_cells).intersection(active))
            # Add to new_active if active by condensed Conway GOL rules
            if (n == 3) or (c in active and n == 2): new_active.add(c)
        # Update active with new_active
        active = new_active
    return active

# 3D/4D adjacency cell positions
ADJ_3D = [l for l in product((-1, 0, 1), repeat=3) if l != (0, 0, 0)]
ADJ_4D = [l for l in product((-1, 0, 1), repeat=4) if l != (0, 0, 0, 0)]

# Read in initial configuration
with open("rsc/17_start_configuration.txt") as start:
    cubes = list(map(list, start.read().split("\n")))
    active_slice_3D, active_slice_4D = set(), set()
    for (x, y) in product(range(len(cubes)), range(len(cubes[0]))):
        if cubes[x][y] == "#":
            active_slice_3D.add((x, y, 0))
            active_slice_4D.add((x, y, 0, 0))
    
# Run n iterations
output_3d = conway_iterations(active_slice_3D, ADJ_3D, steps = 6)
output_4d = conway_iterations(active_slice_4D, ADJ_4D, steps = 6)

# Problem Solutions
print(f"Part 1: Number of active 3D cubes = {len(output_3d)}")
print(f"Part 2: Number of active 4D cubes = {len(output_4d)}")
