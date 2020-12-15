# Play the memory game with the elves!

def memory_game(start_nums, n):
    # Store existing words
    spoken_store = {num: start_nums.index(num) + 1 for num in start_nums}
    # Play the game
    turn = len(start_nums) + 1
    last_spoken = start_nums[-1]
    while turn <= n:
        if last_spoken in spoken_store:
            new_number = turn - 1 - spoken_store[last_spoken]
            spoken_store[last_spoken] = turn - 1
            last_spoken = new_number
        else:
            spoken_store[last_spoken] = turn - 1
            last_spoken = 0
        # Iterate turn
        turn += 1
    return last_spoken

# Load in the starting numbers
with open("rsc/15_starting_numbers.txt") as num:
    numbers = list(map(int, num.read().split(',')))

# Problem Solutions
print(f"Part 1: 2020th spoken number {memory_game(numbers, n=2020)}")
print(f"Part 2: 3e7th spoken number {memory_game(numbers, n=int(3e7))}")
