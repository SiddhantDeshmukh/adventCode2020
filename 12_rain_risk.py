# Work out the navigation end-point of the ferry around the storm

def move_point(point, dir, dist):
    if dir == "N":
        point[0] += dist
    elif dir == "S":
        point[0] -= dist
    elif dir == "E":
        point[1] += dist
    elif dir == "W":
        point[1] -= dist
    return point

def rotate_point(point, degrees):
    # Convert rotation to counterclockwise
    rot = degrees if degrees < 0 else -360 + degrees
    # Carry out known rotations
    if rot == -90:
        point = [-point[1], point[0]]
    elif rot == -180:
        point = [-point[0], -point[1]]
    elif rot == -270:
        point = [point[1], -point[0]]
    return point

# Read in the navigation data
with open("rsc/12_navigation_data.txt") as nav_data:
    instruc = [(l[0], int(l[1:])) for l in nav_data.read().split('\n')]

ROT_TO_DIR = {0: "N", 90:"E", 180:"S", 270:"W"}
DIR_TO_ROT = {"N":0, "E":90, "S":180, "W":270}
# Part 1
ship_pos1 = [0, 0]
current_dir = "E"
for dir, val in instruc:
    if dir in ["N", "S", "E", "W"]:
        ship_pos1 = move_point(ship_pos1, dir, val)
    elif dir == "L":
        current_dir = ROT_TO_DIR[(DIR_TO_ROT[current_dir] - val) % 360]
    elif dir == "R":
        current_dir = ROT_TO_DIR[(DIR_TO_ROT[current_dir] + val) % 360]
    elif dir == "F":
        ship_pos1 = move_point(ship_pos1, current_dir, val)

# Part 2
waypoint_pos, ship_pos2 = [1, 10], [0, 0]
for dir, val in instruc:
    if dir in ["N", "S", "E", "W"]:
        waypoint_pos = move_point(waypoint_pos, dir, val)
    elif dir == "L":
        waypoint_pos = rotate_point(waypoint_pos, val)
    elif dir == "R":
        waypoint_pos = rotate_point(waypoint_pos, -val)
    elif dir == "F":
        ship_pos2 = [v + (w * val) for v, w in zip(ship_pos2, waypoint_pos)]

# Problem Solutions
print(f"Part 1: Manhatten distance is {abs(ship_pos1[0]) + abs(ship_pos1[1])}")
print(f"Part 2: Manhatten distance is {abs(ship_pos2[0]) + abs(ship_pos2[1])}")
