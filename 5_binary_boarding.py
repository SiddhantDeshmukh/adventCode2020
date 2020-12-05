# Decode row, column and ID from the boarding passes


class Tree():
    """Recursively generate binary tree for decoding, storing lower value
    and assigning childen lower/upper halves of parent range respectively"""
    def __init__(self, vmin, vmax, layer=0):
        self.value = vmin
        # Don't make another if this is the leaf
        if vmin != vmax and layer <= 7:
            half = int(vmin + (vmax-vmin)/2)
            self.L = Tree(vmin=vmin, vmax=half, layer=layer+1)
            self.U = Tree(vmin=half+1, vmax=vmax, layer=layer+1)


def decode_boardingpass(pass_string):
    """Decode row, col and id from boarding pass string using decoder trees"""
    # Get row and column eval strings from pass_string
    row_eval = pass_string[:7].replace("F", ".L").replace("B", ".U")
    col_eval = pass_string[7:].replace("L", ".L").replace("R", ".U")
    row = eval(f"ROW_TREE{row_eval}.value")
    col = eval(f"COL_TREE{col_eval}.value")
    # Return ID for this seat
    return (row * 8) + col


# Generate trees for row (0 - 127) and column (0 - 7) decoding
ROW_TREE = Tree(0, 127)
COL_TREE = Tree(0, 7)

# Read in boarding pass data
with open("rsc/5_boarding_passes.txt") as boarding_passes:
    passes = boarding_passes.read().split("\n")

# Calculate the seat ids for each
ids = [decode_boardingpass(boarding_pass) for boarding_pass in passes]
# Find the missing id (mine) by removing sum of full range from sum of ids
missing = sum(range(min(ids), max(ids)+1)) - sum(ids)

# Problem Solutions
print(f"Part 1: {max(ids)} is the largest ID")
print(f"Part 2: {missing} is my seat ID")
