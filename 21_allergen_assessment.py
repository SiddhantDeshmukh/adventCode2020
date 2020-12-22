# Make determinations about ingredient allergen content, with language barrier
from collections import defaultdict

# Storage arrays
all_ingredients, all_allergens, all_data = set(), set(), []
ingredient_counts = defaultdict(int)
# Read in allergen info
with open("rsc/21_allergen_notes.txt") as allergen_notes:
    allergen_data = allergen_notes.read().split("\n")
    for line in allergen_data:
        ingredients, allergens = line.split("(contains ")
        # Clean inputs
        ingredients = ingredients.strip().split()
        allergens = allergens.strip(")").split(", ")
        # Store
        all_data.append([ingredients, allergens])
        all_ingredients.update(ingredients)
        all_allergens.update(allergens)
        # Update counts
        for ing in ingredients: ingredient_counts[ing] += 1

# Find the list of potential allergens from this data
potential_allergens, allergen_dict = set(), {}
for allergen in all_allergens:
    # Count ingredients that could be allergen containing
    poss = [set(line[0]) for line in all_data if allergen in line[1]]
    # if just this set, add it as these are the only places allergen seen
    if len(poss) == 0: 
        potential_allergens.update(poss)
        allergen_dict[allergen] = poss
    # else, add all the shared items between places where allergen seen
    else: 
        potential_allergens.update(poss[0].intersection(*poss[1:]))
        allergen_dict[allergen] = poss[0].intersection(*poss[1:])
# Find not potential allergens and corresponding count
not_allergens = all_ingredients - potential_allergens
not_allergen_counts = sum(ingredient_counts[n] for n in not_allergens)

from pprint import pprint
# Time to sieve out the solution!
sorted_al = {s:list(allergen_dict[s]) for s in sorted(allergen_dict, key=lambda key: len(allergen_dict[key]))}
save_al = {}
# For each of the elements in the dictionary
for v in range(len(sorted_al)):
    # Get the first in the key list (shortest list)
    shortest_key = list(sorted_al.keys())[0]
    value = sorted_al[shortest_key].copy()[0]
    # Put this in the save_al
    save_al[shortest_key] = sorted_al[shortest_key][0]
    # Remove this item from the rest of the dict
    del sorted_al[shortest_key]
    for key in sorted_al:
        if value in sorted_al[key]:
            sorted_al[key].remove(value)
    # Re-sort
    sorted_al = {s:sorted_al[s] for s in sorted(sorted_al, key=lambda key: len(sorted_al[key]))}

# Sort by key
alergen_ing_dict = {s:save_al[s] for s in sorted(save_al, key=lambda key: key)}
dangerous_list = ",".join(alergen_ing_dict[s] for s in alergen_ing_dict)

# Problem Solutions
print(f"Part 1: Number impossible to be allergens = {not_allergen_counts}")
print(f"Part 2: Dangerous ingredient list: '{dangerous_list}'")
