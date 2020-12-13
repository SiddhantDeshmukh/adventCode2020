# Sort out your shuttles to the airport, a universal nightmare!

# Read in the shuttle notes
with open("rsc/13_shuttle_notes.txt") as note_data:
    note = note_data.read().split("\n")
    start_time = int(note[0])
    bus_row = note[1].split(',')
    bus_data = [(int(b), i) for i, b in enumerate(bus_row) if b != "x"]
print(bus_data)

# For each bus, work out number of minutes to wait and find minimum
wait, bus_id = min((bus - (start_time % bus), bus) for bus, _ in bus_data)

# Par 2 solution lies in the Chinese Remainder Theorem, which is based on 
# modulo mathematics I am reading now! Done, let's go!
bus_ids = [bus for bus, _ in bus_data]
offsets = [-index for _, index in bus_data]

P, t = 1, 0
for val in bus_ids:
    P *= val
for offs, id in zip(offsets, bus_ids):
    n = P // id
    inv = pow(n, -1, id)
    t = (t + offs * n * inv) % P

# Problem Solutions
print(f"Part 1: Product of wait-time and ID is {wait * bus_id}")
print(f"Part 2: Time when all busses leave in id-seqence is {t}")
