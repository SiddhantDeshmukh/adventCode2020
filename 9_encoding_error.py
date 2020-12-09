# Attack the XMAS encoding of the inflight data


def two_sum_target(array, target):
    """Check if two numbers in the array sum to target"""
    # Sort list
    sort_array = list(sorted(array))
    low_ind, high_ind = 0, len(sort_array)-1
    while low_ind < high_ind:
        two_sum = sort_array[low_ind] + sort_array[high_ind]
        if two_sum < target:
            low_ind += 1
        elif two_sum > target:
            high_ind -= 1
        else:
            return True
    return False


def find_break_number(array, window_size = 25):
    """Iterate window over array, check if next number has two sum in window"""
    for start in range(0, len(array) - window_size):
        window = array[start:start + window_size]
        next_num = array[start + window_size]
        if not two_sum_target(window, next_num):
            return next_num
    return False


def contiguous_sum_minmax(array, target, max_contig_len = 50):
    """Find contiguous sub-array that sums to target, return sum(min/max)"""
    for contig_length in range(2, max_contig_len):
        # Try all contiguous sequences of this length from the valid array
        for ind in range(len(array) - contig_length):
            valid_range = array[ind:ind + contig_length]
            if sum(valid_range) == target:
                return min(valid_range) + max(valid_range)
    return False


# Read in the data stream
with open("rsc/9_encoded_stream.txt") as stream:
    encoded = [int(s) for s in stream.read().split("\n")]
    # encoded = list(map(int, stream))  # Got this off the subreddit, so neat!

# Part 1: Scan with a 25 long window, check next number is sum of two in window
break_num = find_break_number(encoded, 25)
# Part 2: Find sum of min and max of contiguous range that sum to break_num
min_max_sum = contiguous_sum_minmax(encoded, break_num)

# Problem Solutions
print(f"Part 1: XMAS encoding breaks at value {break_num}")
print(f"Part 2: XMAS encryption weakness is {min_max_sum}")
