# Parse bootcode and find/fix the infinite loop
from dataclasses import dataclass
import copy

@dataclass 
class Command:
    """Dataclass to store commands. Makes fetching information nicer!"""
    command: str
    value: int
    visited: bool = False


def run_instructions(instruction_set):
    acc, index, complete = 0, 0, False
    # Iterate, storing accumulator, until loop found or finishes
    while True:
        # Terminate if meets end condition (tries to run command after end)
        if index == len(instruction_set): complete = True; break
        # Get this instruction
        inst = instruction_set[index]
        # If visited, breakout as loop and return acc, or mark as visited
        if inst.visited: break
        inst.visited = True
        # Run instructions at this index
        acc = eval(COMMAND_DICT[inst.command][0])
        index = eval(COMMAND_DICT[inst.command][1])
    return [complete, acc]


COMMAND_DICT = {"acc": ["acc + inst.value", "index + 1"],
                "jmp": ["acc", "index + inst.value"],
                "nop": ["acc", "index + 1"]}
FLIP_DICT = {"acc":"acc", "jmp":"nop", "nop":"jmp"}

# Read in bootcode
with open("rsc/8_bootcode.txt") as boot: 
    bootcode = boot.read().split("\n")

# Parse bootcode commands
instructions = [Command(l.split(" ")[0], int(l.split(" ")[1])) for l in bootcode]

# Part 1
_, loop_acc = run_instructions(copy.deepcopy(instructions))

# Part 2: Try to fix by flipping one jmp <-> nop
fixed_acc, row = 0, 0
for ind, inst in enumerate(instructions):
    # Make temporary copy of instructions and flip jmp <-> nop
    temp_inst = copy.deepcopy(instructions)
    temp_inst[ind].command = FLIP_DICT[temp_inst[ind].command]
    # Try running "fixed" code
    complete, acc = run_instructions(temp_inst)
    if complete: fixed_acc, row = acc, ind

# Problem Solutions
print(f"Part 1: Accumulator has value {loop_acc} before loop-point")
print(f"Part 2: Accumulator has value {fixed_acc} after fix at row {row}")
