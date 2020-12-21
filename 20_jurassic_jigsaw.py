# Assemble the images from the satellite array
from dataclasses import dataclass
import numpy as np

@dataclass
class Tile:

    id: int 
    contents: np.ndarray
    location: np.ndarray = np.zeros(2)

    @property
    def all_edges(self):
        edges = [self.contents[0, :], self.contents[-1, :], 
                 self.contents[:, 0], self.contents[:, -1]]
        return {d: "".join(s) for d, s in zip(DIRS.keys(), edges)}

    def rotate_90(self, num_turns=0):
        self.contents = np.rot90(self.contents, k=num_turns)
    
    def flip(self):
        self.contents = np.fliplr(self.contents)

    def copy(self):
        return Tile(self.id, self.contents, self.location)
        

@dataclass
class Jigsaw:
    
    saved_tiles: list

    def check_edge_match(self, tile):
        """Test for valid edges for a given tile to attach to """
        for jigsaw_tile in self.saved_tiles:
            # Iterate over all possible tile flips and rotations
            for rot in list(range(4)) * 2:
                # Flip or rotate the tile, flip if rotate is 0
                if rot == 0: tile.flip()
                else: tile.rotate_90(rot)
                # Look over all edges to identify matches and check directions                
                for dir1, edge in tile.all_edges.items():
                    for dir2, in_edge in jigsaw_tile.all_edges.items():
                        if edge == in_edge and dir1 == DIRS[dir2]["opposite"]:
                            # If this is a match, calculate new location 
                            new_loc = jigsaw_tile.location + DIRS[dir2]["step"]
                            tile.location = new_loc
                            # Add this tile in, if not in already
                            if tile.id not in [s.id for s in self.saved_tiles]: 
                                self.saved_tiles.append(tile.copy())

    def grid_min_max(self):
        # Get min and max x/y coordinates
        xs, ys = [], []
        for tile in self.saved_tiles:
            xs.append(tile.location[1])
            ys.append(tile.location[0])
        return (min(xs), max(xs)), (min(ys), max(ys))

    def get_id_grid(self):
        # Get min and max x/y coordinates
        (minx, maxx), (miny, maxy) = self.grid_min_max()
        # Make an array and fill with ids
        grid = np.zeros(shape=(int(maxx-minx+1), int(maxy-miny+1)))
        for tile in self.saved_tiles:
            loc = (tile.location - np.array([miny, minx])).astype(int)
            grid[loc[0], loc[1]] = tile.id
        # Calculate corner product, as a bonus ;P 
        corner_prod = int(grid[0,0]*grid[0,-1]*grid[-1, 0]*grid[-1, -1])
        return grid, corner_prod

    def get_full_grid(self, sep=-1, remove_border=False):
        """Get the current grid configuration, default sep=-1 to overlap"""
        w = 10
        if remove_border: w, sep = 8, 0
        (minx, maxx), (miny, maxy) = self.grid_min_max()
        # Output =  np.array full of " " with max size
        nx, ny = int(maxx - minx + 1), int(maxy - miny + 1)
        out = np.array([[" " for _ in range((nx*w)+sep*(nx-1))] 
                             for _ in range((ny*w)+sep*(ny-1))])
        # Overwrite output with each contents
        for tile in self.saved_tiles:
            loc = tile.location 
            # Translate location to top left corner location
            tl = [(loc[0] - miny)*(w+sep), (loc[1] - minx)*(w+sep)]
            # Write to array
            content = tile.contents
            if remove_border: content = content[1:-1,1:-1]
            out[int(tl[0]):int(tl[0]+w), int(tl[1]):int(tl[1]+w)] = content
        return out      

    def detect_monsters(self):
        seamon = [["                  # "],
          ["#    ##    ##    ###"],
          [" #  #  #  #  #  #   "]]
        seamon_hash = [(y, x) for y in range(len(seamon)) 
                              for x in range(len(seamon[y][0])) 
                              if seamon[y][0][x] == "#"]
        monster_count = 0
        g = self.get_full_grid(remove_border=True)
        # Iterate over all possible tile flips and rotations
        for rot in list(range(4)) * 2:
            if rot == 0: g = np.fliplr(g)
            else: g = np.rot90(g, k=rot)
            # Try all valid start positions 
            for y in range(len(g)-3):
                for x in range(len(g[0])-20):
                    if all([g[y+dy, x+dx] == "#" for dy, dx in seamon_hash]):
                        monster_count += 1
        return g, monster_count    

    def __str__(self):
        """Display the current grid configuration with spacing"""
        return "\n".join("".join(row) for row in self.get_full_grid(sep=1))


DIRS = {"top": {"step": np.array([-1, 0]), "opposite": "bottom"},
        "bottom": {"step": np.array([1, 0]), "opposite": "top"},
        "left": {"step": np.array([0, -1]), "opposite": "right"},
        "right": {"step": np.array([0, 1]), "opposite": "left"}}

# Read in the satellite images
with open("rsc/20_satellite_image.txt") as sat:
    tile_data = sat.read().split("\n\n")
    # Parse each image into a dict
    tile_dict = {}
    for tile in tile_data:
        tile_id = int(tile[5:9])
        tile_image = np.array([list(l) for l in tile.split("\n")[1:]])
        # Create tile object from this data
        tile_dict[tile_id] = Tile(tile_id, tile_image)

# Create a solution, iterating the options and adding as we goooooo
j = Jigsaw(saved_tiles=[tile_dict[1777].copy()])
while len(j.saved_tiles) < len(list(tile_dict.keys())):
    for tile in tile_dict:
        if tile not in [t.id for t in j.saved_tiles]:
            j.check_edge_match(tile_dict[tile])
# Get the corner ID's by generating the ID array
grid, corner_product = j.get_id_grid()
# Count SEA MONSTERS
clean_grid, monster_count = j.detect_monsters()
non_monster_hashes = np.count_nonzero(clean_grid == "#") - (15*monster_count)

# Problem Solutions
print(f"Part 1: Product of corner IDs = {corner_product}")
print(f"Part 2: Sea roughness (number of # just sea) = {non_monster_hashes}")
