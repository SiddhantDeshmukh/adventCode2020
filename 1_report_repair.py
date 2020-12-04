# Find the numbers in the list that sum to 2020, and get the product
from itertools import product
from timeit import timeit
from functools import reduce
from operator import mul


def target_sum_product(number_list, target_sum=2020, n = 2):
    # Find three numbers that sum to 2020, and print product
    for vals in product(number_list, repeat = n): 
        if sum(vals) == target_sum: return(reduce(mul, vals, 1))


# Read in expenses
with open("rsc/1_expenses.txt") as expenses_file:
    expenses = [int(n) for n in expenses_file.read().split("\n")]

# Problem Solutions
print(f"Part 1: {target_sum_product(expenses, n = 2)}")
print(f"Part 2: {target_sum_product(expenses, n = 3)}")

# Timing; for fun!
n_runs = 10
setup = """from __main__ import target_sum_product, expenses"""
run = """target_sum_product(expenses, n=3)"""
print(timeit(setup=setup, stmt=run, number=n_runs)/n_runs)
