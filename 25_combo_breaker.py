# Crack the encryption on the hotel door keys

def get_loop_size(pub_key, subject_number):
    loop_size, val = 0, 1
    while val != pub_key:
        val = (val*subject_number) % 20201227
        loop_size += 1
    return loop_size 

def get_encryption_key(other_pub_key, this_loop_size):
    val = 1
    for _ in range(this_loop_size):
        val = (val*other_pub_key) % 20201227
    return val

# Read in encrytion inputs
with open("rsc/25_encryption_inputs.txt") as keys:
    pub_key1, pub_key2 = list(map(int, keys.read().split("\n")))

# Get loop size for 1 and 2
loop1 = get_loop_size(pub_key1, 7)
loop2 = get_loop_size(pub_key2, 7)

# Use this to get the encryption key
encryption_key1 = get_encryption_key(pub_key2, loop1)
encryption_key2 = get_encryption_key(pub_key1, loop2)
# Check this is correct by testing if both equal
assert(encryption_key1 == encryption_key2)

# Problem Solutions
print(f"Part 1: Encryption key for door = {encryption_key1}")
print(f"Part 2: S O L V E D")

