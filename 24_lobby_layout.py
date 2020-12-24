# Work out the number of flipped tiles (w -> b) on the hexagonal lobby floor
         
# Read in flipped-tiles input
with open("rsc/24_tile_directions.txt") as tile_dirs:
    dirs = []
    for tile in tile_dirs.read().split("\n"):
        # Walk along the tile, and extract
        walk, ind = [], 0
        while ind < len(tile):
            step = 2 if tile[ind] in "ns" else 1
            walk.append(tile[ind:ind+step]); ind += step
        dirs.append(walk)

# Dictionary of hex neighbours
NEIGHBOURS = {"ne": (1, -1), "nw": (0, -1), "w": (-1, 0), 
              "sw": (-1, 1), "se": (0, 1), "e": (1, 0)}

# New way, just keep a set of black tiles
black_tiles = set()
for line in dirs:
    # Get grid coord
    pos = [0, 0]
    for d in line:
        pos = tuple([p+s for p,s in zip(pos, NEIGHBOURS[d])])
    # If already in the set, remove, else add!
    if pos in black_tiles: black_tiles.remove(pos)
    else: black_tiles.add(pos)
start_black_tiles = len(black_tiles.copy())

# Run GOL on this hexagonal grid for 100 timesteps
for _ in range(100):
    # Get all the cells to check (current and neighbours)
    all_check = []
    for c in map(list, black_tiles):
        all_check += [(c[0]+n[0], c[1]+n[1]) for n in NEIGHBOURS.values()]
    all_check = set(all_check).union(black_tiles)

    # Calculate the rules for each of these positions
    new_black_tiles = set()
    for a in all_check:
        # Get neighbour count
        n_count = sum([(a[0]+n[0], a[1]+n[1]) in black_tiles for n in NEIGHBOURS.values()])
        if (a in black_tiles) and (0 < n_count <= 2) or \
            (a not in black_tiles) and (n_count == 2):
            new_black_tiles.add(a)
    # Update current active
    black_tiles = new_black_tiles

# Problem Solutions
print(f"Part 1: Number of intial black tiles = {start_black_tiles}")
print(f"Part 2: Final black tiles after 100 iterations = {len(black_tiles)}")
