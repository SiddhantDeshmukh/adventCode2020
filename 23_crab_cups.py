# Play the cup shuffle game with the crab
# Huge props to u/xelf for posting solution or I'd be waiting 520 hours!
# https://www.reddit.com/r/adventofcode/comments/kimluc/2020_day_23_solutions/ggsi3xw?utm_source=share&utm_medium=web2x&context=3
from dataclasses import dataclass
from tqdm import tqdm

@dataclass
class Cup:
    value: int
    next: object

def cup_game(cups, rounds):
    # Lamda function for getting the previous label from a Cup
    prev = lambda c: c.value-1 if c.value > 1 else max(cups)

    # Convert the cups input into linked list (dict) of Cup objects
    cup_dict, store = {}, None
    for val in cups[::-1]: store = cup_dict[val] = Cup(val, store)
    # Get current value
    curr_cup = cup_dict[cups[0]]
    # Assign last cup to have first cup as "next", completing the link loop
    cup_dict[cups[-1]].next = curr_cup
    
    # Iterate over the number of rounds
    for _ in tqdm(range(rounds), ascii=True):
        # Get the next 3 cups
        pick_up = [curr_cup.next, curr_cup.next.next, curr_cup.next.next.next]
        # Save the next cup along from the curr_cup
        curr_cup.next = pick_up[2].next
        
        # Find the destination cup: lower value and not in pick_up
        dest_cup = cup_dict[prev(curr_cup)]
        while dest_cup in pick_up: dest_cup = cup_dict[prev(dest_cup)]
        
        # Join dest to start pick_up and end-of-pick_up to what came after dest
        pick_up[2].next = dest_cup.next
        dest_cup.next = pick_up[0]
        # Update curr
        curr_cup = curr_cup.next
    
    # Return the entry for cup "1"
    return cup_dict[1]

# Read in original cup order
with open("rsc/23_cup_order.txt") as cup_order:
    start_cups = list(map(int, cup_order.read()))

# Run with defualt cups for 100 iterations
p1_cup1 = cup_game(start_cups.copy(), 100)
p1_string = ""
for _ in range(9): p1_string += str(p1_cup1.value); p1_cup1 = p1_cup1.next

# Create a new array, adding on all numbers up to 1e6
p2_cups = start_cups.copy() + list(range(10, 1_000_001))
p2_cup1 = cup_game(p2_cups, 10_000_001)
p2_product = p2_cup1.next.value * p2_cup1.next.next.value

# Problem Solutions
print("\n")
print(f"Part 1: Final string (wihtout 1) = {p1_string}")
print(f"Part 2: Product of two cups are 1 =  {p2_product}")
