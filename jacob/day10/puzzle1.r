library(tidyverse)
#df <- read.delim("day10/test_input2.txt")
df <- read.delim("day10/input.txt")

adaptors <- df[[1]]
#convert to ints
for(i in seq(1, length(adaptors), by=1)){
    adaptors[i] <- strtoi(adaptors[i])
}
print(adaptors)


starting_joltage <- 0
current_joltage <- starting_joltage

adaptors <- sort(adaptors) #not sure which sorting algo it does...
used_adaptors <- c()
vals <- c()
diff_1 <- 0
diff_3 <- 0

#now go through my adaptors, find all within 3 of the current_joltage, and take the next
#why can't we skip adaptors???
for(i in seq(1, length(adaptors), by=1)){
    temp_diffs <- adaptors - current_joltage
    valid <- (temp_diffs <= 3) & ( temp_diffs >0)
    #print(diffs)
    possible_adaptors <- adaptors[which(valid)]
    cat("Possible Adaptors", possible_adaptors, '\n')
    vals <- c(vals, min(temp_diffs[which(valid)])  )
    if(min(temp_diffs[which(valid)]) ==1){
        diff_1 <- diff_1 + 1
    }
    else if(min(temp_diffs[which(valid)]) == 3){
        diff_3 <- diff_3 + 1
    }
    used_adaptors <- possible_adaptors[1]
    current_joltage <- possible_adaptors[1]
    cat("Current Joltage ", current_joltage, "Used Adaptor", possible_adaptors[1],'\n' )
}
diff_3 <- diff_3 + 1
cat("Diff 1", diff_1,"Diff 3", diff_3,'\n')
cat("Soln 1:", diff_1 * diff_3 ,'\n')