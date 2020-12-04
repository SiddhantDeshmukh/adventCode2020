# Find the numbers in the list that sum to 2020, and get the product
# Input file is expenses .csv
# converted copied values to .csv by:
# sed '$!s/$/,/' original.csv > corrected.csv
from itertools import product
from timeit import timeit


def target_sum_product_two(number_list, target_sum=2020):
    # Find three numbers that sum to 2020, and print product
    for (n1, n2) in product(number_list, number_list): 
        if n1+n2 == target_sum: return(n1*n2)


def target_sum_product_three(number_list, target_sum=2020):
    # Find three numbers that sum to 2020, and print product
    for (n1, n2, n3) in product(number_list, number_list, number_list): 
        if n1+n2+n3 == target_sum: return(n1*n2*n3)


# Read in expenses
with open("rsc/1_expenses.txt") as expenses_file:
    expenses = [int(n) for n in expenses_file.read().split("\n")]

# Problem Solutions
print(f"Part 1: {target_sum_product_two(expenses)}")
print(f"Part 2: {target_sum_product_three(expenses)}")

# Timing; for fun!
n_runs = 10
setup = """from __main__ import target_sum_product_two, expenses"""
run = """target_sum_product_two(expenses)"""
a = timeit(setup=setup, stmt=run, number=n_runs)/n_runs
print(a)