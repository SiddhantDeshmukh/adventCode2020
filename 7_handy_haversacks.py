# Parse bag packing rules and answer queries
import networkx as nx
import numpy as np


def num_bags_inside(name):
    # From this bag type, get the sub_bags types and counts of each
    name_row = np.array(mat)[np.where(bag_names == name)[0][0],: ]
    bag_test = np.where(name_row > 0)
    sub_bags = bag_names[bag_test]
    counts = name_row[bag_test]
    # Recursively count number of bags that fit inside this bag
    inner_count = [num_bags_inside(b) for b in sub_bags]
    # Accumulate number of bags within, accounting for the count of this bag
    output = sum([c + (c * inner) for c, inner in zip(counts, inner_count)])
    return int(output)


TARGET = "shiny gold"

# Read in bag rules file
with open("rsc/7_haversack_rules.txt") as bag_rules:
    ruleset = bag_rules.read().split('\n')

# Parse all the rules into edge descriptions
all_edges = []
for rule in ruleset:
    # Remove "bag" and "bags"
    clean_rule = rule.replace(" bags", "").replace(" bag", "").replace(".", "")
    # Split by "contain" and get bag data
    bag, contents = clean_rule.split(" contain ")
    inside_bags = contents.split(", ")
    # Calculate graph edge data from this rule and add to storage
    edges = [(bag, b[2:], int(b[0])) for b in inside_bags if b != "no other"]
    all_edges += edges

# Compute connection graph
G = nx.DiGraph()
G.add_weighted_edges_from(all_edges)
bag_names = np.array(G.nodes())
# Try paths to shiny gold...
path_count = 0
for bag_node in bag_names:
    if bag_node != TARGET:
        # ...store if not a NetworkXNoPath error
        valid_path = True
        try:
            path = nx.shortest_path(G, source=bag_node, target=TARGET)
        except nx.NetworkXNoPath:
            valid_path = False
        path_count += int(valid_path)

# Calcualte internal bags using bag-link matrix
mat = nx.to_numpy_matrix(G)
internal_bags = num_bags_inside(TARGET)

# Problem Solutions
print(f"Part 1: {path_count} bags eventually contain '{TARGET}'")
print(f"Part 2: {internal_bags} bags required within '{TARGET}'")
