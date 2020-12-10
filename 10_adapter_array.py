# Create a rediculous chain of adapters to charge your phone
# Every adapater must connect to one which is 1-3 higher that in

# Read in adapter information
with open("rsc/10_adapters.txt") as adapter_data:
    adapters = list(map(int, adapter_data))

# Find a valid chain and return product of number of 1-jolt and 3-jolt steps
chain = [0] + sorted(adapters) + [max(adapters)+3]
diffs = [val - chain[ind] for ind, val in enumerate(chain[1:])]
jolt_product = diffs.count(1) * diffs.count(3)

# Valid ways to reach a given jolt is sum of ways to reach 3 prev jolts
paths = {v: 0 for v in range(-3, max(chain)+1)}
paths[0] = 1
for i in range(1, len(chain)):
    paths[chain[i]] = sum(paths[chain[i]-v] for v in [1,2,3])

# Problem Solutions
print(f"Part 1: Product of 1 and 3 jolt step counts = {jolt_product}")
print(f"Part 2: Number of valid other chains = {paths[max(chain)]}")
