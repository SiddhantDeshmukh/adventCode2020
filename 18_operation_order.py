# Do math, but priority left to right and shifted around. I'm tired. 
import re


class o:
    """I am sick of recursively extracting brackets, so O V E R R I D E"""
    def __init__(self, value): self.value = value
    # Make mult and add have same pref by assigning add to matrix-mul. 
    def __mul__(self, v2): return o(self.value * v2.value)
    def __matmul__(self, v2): return o(self.value + v2.value)
    # Overwrite power to be add, as it has higher precedance than multiply
    def __pow__(self, v2): return o(self.value + v2.value)


# Load in the expressions
with open('rsc/18_expressions.txt') as express_file:
    expressions = express_file.read().split('\n')

# Convert the expressions to have consequtive parenthesis then eval()
part1_total, part2_total = 0, 0
for line in expressions:
    class_substitute = re.sub(r"(\d+)", r"o(\1)", line)
    part1_line = class_substitute.replace("+", "@")
    part1_total += eval(part1_line).value

    part2_line = class_substitute.replace("+", "**")
    part2_total += eval(part2_line).value

# Problem Solutions
print(f"Part 1: Sum of answers when plus/mul equivalent = {part1_total}")
print(f"Part 2: Sum of answers when plus has priority = {part2_total}")
