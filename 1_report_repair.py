# Find the numbers in the list that sum to 2020, and get the product
# Input file is expenses .csv
# converted copied values to .csv by:
# sed '$!s/$/,/' original.csv > corrected.csv
from itertools import product
from timeit import timeit
import pandas as pd


def target_sum_product_two(number_list, target_sum=2020):
    # Find three numbers that sum to 2020, and print product
    for (n1, n2) in product(number_list, number_list): 
        if n1+n2 == target_sum: return(n1*n2)


def target_sum_product_three(number_list, target_sum=2020):
    # Find three numbers that sum to 2020, and print product
    for (n1, n2, n3) in product(number_list, number_list, number_list): 
        if n1+n2+n3 == target_sum: return(n1*n2*n3)


# Read in expenses
expenses = pd.read_csv("rsc/1_expenses.csv", header=None)[0].values
two_solution = target_sum_product_two(expenses)
three_solution = target_sum_product_three(expenses)

# Problem Solutions
print(f"Part 1: {two_solution}")
print(f"Part 2: {three_solution}")

# Timing; for fun!
n_runs = 10
setup = """from __main__ import target_sum_product_two, expenses"""
run = """target_sum_product_two(expenses)"""
a = timeit(setup=setup, stmt=run, number=n_runs)/n_runs
print(a)