# Iteratively apply the seating rules to a layout, finding the stable state
from itertools import product
import numpy as np

def part1_occupied(array, pos, this_state):
    y, x = pos
    sub_state = array[y-1:y+2, x-1:x+2]
    occupied = np.count_nonzero(sub_state == "#") - int(this_state == "#")
    return occupied

def part2_occupied(array, pos, this_state):
    # Use new rules to find occupied count
    STEP_DIRS = [(1, -1), (1, 0), (1, 1), (0, -1), \
                (0, 1), (-1, -1), (-1, 0), (-1, 1)]
    occupied = 0
    for dir in STEP_DIRS:
        ray = np.array(pos) + dir
        while (0 <= ray[0] < array.shape[0] and 0 <= ray[1] < array.shape[1]):
            step_label = array[ray[0], ray[1]]
            # If unoccupied, break
            if step_label == "L":
                break
            # If occupied, add to occupied count
            elif step_label == '#':
                occupied += 1
                break
            # Step
            ray += dir
    return occupied

def find_stable(seating, rule, seated_tol):
    stable = False
    while not stable:
        # Update
        new_seating = seating.copy()
        # Try an iteration
        for (y, x) in product(range(1, seating.shape[0]), repeat=2):
            seat_state = seating[y, x]
            if seat_state != ".":
                # Work out the new value at this position
                occupied_count = rule(seating, (y, x), seat_state)
                # Update based on current value and number of occupied
                if seat_state == "L" and occupied_count == 0:
                    new_seating[y, x] = "#"
                elif seat_state == "#" and occupied_count >= seated_tol:
                    new_seating[y, x] = "L"
        # Test if stable
        if np.all(new_seating == seating): stable = True
        # Update values
        seating = new_seating
    return np.count_nonzero(seating == "#")

# Load in initial config
with open("rsc/11_seating_plan.txt") as seats:
    seating = list(map(list, seats.read().split('\n')))
seating = np.pad(np.matrix(seating), 1, mode='constant', constant_values=("."))

# Run with the two different rulesets
stableseats_1 = find_stable(seating.copy(), rule=part1_occupied, seated_tol=4)
stableseats_2 = find_stable(seating.copy(), rule=part2_occupied, seated_tol=5)

# Problem Solutions
print(f"Part 1: {stableseats_1} seats in the first stable configuration")
print(f"Part 2: {stableseats_2} seats in the second stable configuration")
