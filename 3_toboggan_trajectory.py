# Given the map of terrain in "3_toboggan_map.txt", which repeats to the right,
# work out how many trees you would encounter going:
import numpy as np


def count_routes_trees(hill_map, down_step, right_step):
    hill_shape = hill_map.shape
    # Get the row and column indexes of route down hill
    rows = np.arange(0, hill_shape[0], down_step)
    cols = [(val * right_step) % hill_shape[1] for val in range(len(rows))]
    # Count trees (1's) by summing up items in these rows/columns
    return sum(hill_map[[rows, cols]])


# Load in map as binary array, Tree ("#") = 1, Clear (".") = 0
with open("rsc/3_toboggan_map.txt") as map:
    map_store = np.array([list(line) for line in map.read().split("\n")])
    map_store[np.where(map_store == "#")] = 1
    map_store[np.where(map_store == ".")] = 0
    map_store = map_store.astype(int)

steps = [(1, 1), (3, 1), (5, 1), (7, 1), (1, 2)]
trees = [count_routes_trees(map_store, d, r) for r, d in steps]

# Problem Solutions
print(f"Part 1: {trees[1]} trees")
print(f"Part 2: {np.product(trees)}")
