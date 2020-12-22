# Play a game of combat against the friendly crab


def Combat(deck1, deck2):
    """Run main game loop for non-recursive combat"""
    while len(deck1) != 0 and len(deck2) != 0:
        # Compare first numbers
        d1 = deck1[0]; del deck1[0]
        d2 = deck2[0]; del deck2[0]
        # Append to array (in order) depending who won
        if d1 > d2: deck1 += [d1, d2]
        else: deck2 += [d2, d1]
    # Calculate score
    winner = ("1", deck1) if len(deck1) > 0 else ("2", deck2)
    score = sum([(len(winner[1])-ind)*c for ind, c in enumerate(winner[1])])
    return winner[0], score


def RecursiveCombat(deck1, deck2):
    """Run main game loop for recursive combat"""
    deck1_history, deck2_history = [], []
    while len(deck1) != 0 and len(deck2) != 0:
        deck1_str = "".join(str(n) for n in deck1)
        deck2_str = "".join(str(n) for n in deck2)
        # Check if these decks have appeared in this game's history
        if deck1_str in deck1_history or deck2_str in deck2_history:
            # Player 1 wins
            deck2 = []; break
        # else, add them to the history
        else: 
            deck1_history.append(deck1_str)
            deck2_history.append(deck2_str)

        # Otherwise, Compare first numbers
        d1 = deck1[0]; del deck1[0]
        d2 = deck2[0]; del deck2[0]
        
        # If both players have at least as many cards remaining in their deck 
        # as the value they just played ...
        if len(deck1) >= d1 and len(deck2) >= d2:
            # ... round winner determined by new game of Recursive combat...
            r_winner, _ = RecursiveCombat(deck1[:d1].copy(), deck2[:d2].copy())
        else:
            # ... else play the round normally.
            r_winner = "1" if d1 > d2 else "2"

        # Append to array (in order) depending who won
        if r_winner == "1": deck1 += [d1, d2]
        else: deck2 += [d2, d1]

    # Calculate score
    winner = ("1", deck1) if len(deck1) > 0 else ("2", deck2)
    score = sum([(len(winner[1])-ind)*c for ind, c in enumerate(winner[1])])
    return winner[0], score


# Load in the two decks
with open("rsc/22_card_decks.txt") as decks:
# with open("rsc/22_example.txt") as decks:
    deck1, deck2 = decks.read().split("\n\n")
    deck1 = list(map(int, deck1.split("\n")[1:]))
    deck2 = list(map(int, deck2.split("\n")[1:]))

# Play a game of Combat against the crab
victor1, game1_score = Combat(deck1.copy(), deck2.copy())
# Defend your honour in a game of Recursive Combat!
victor2, game2_score = RecursiveCombat(deck1.copy(), deck2.copy())

# Problem Solutions
print(f"Part 1: Round 1 won by Player {victor1} with score {game1_score}")
print(f"Part 2: Round 1 won by Player {victor2} with score {game2_score}")
