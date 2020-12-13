library(tidyverse)
#df <- read.delim("day10/test_input2.txt")
df <- read.delim("day10/input.txt")

adapters <- df[[1]]
#convert to ints
for(i in seq(1, length(adapters), by=1)){
    adapters[i] <- strtoi(adapters[i])
}
print(adapters)

adapters <- sort(adapters) #not sure which sorting algo it does...

#this is inefficient and bad
rabbit_hole <- function(joltage, adapters) {
    val <- 0
    temp_diffs <- adapters - joltage
    valid <- (temp_diffs <= 3) & ( temp_diffs >0)
    possible_adapters <- adapters[which(valid)]

    if(length(possible_adapters) <1){
        if(joltage >= adapters[length(adapters)] ){
            return(1)
        }
        else{
            return(0)
        }
    }
    #cat("Possible adapters", possible_adapters, '\n')
    for (pa in possible_adapters){
        val <- val + rabbit_hole(pa, adapters)
    }
    return(val)
}

starting_joltage <- 0
current_joltage <- starting_joltage
used_adapters <- 0
n_possible <- c()

#branch object 
setClass("branch", slots=list(name="numeric",contains="numeric",contains_num="numeric" ))

initial_branch <- new("branch",name=adapters[length(adapters)], contains=0, contains_num=1)
my_branches <- c()
my_branches <- c(my_branches, initial_branch)
#recursively do a depth-first traversal
depth_first <- function(joltage, adapters) {
    #navigate to a root
    
    mysum <- 0
    temp_diffs <- adapters - joltage
    valid <- (temp_diffs <= 3) & ( temp_diffs >0)
    possible_adapters <- adapters[which(valid)]

    if(joltage == max(adapters)){
        #my_branches <- c(my_branches, new("branch",name=joltage, contains=0, contains_num=1))
        return(1) #new("branch",name=joltage, contains=0, contains_num= 1 ) )
    }

    if(length(possible_adapters) > 0){
        for(i in seq(length(possible_adapters), 1, by=-1)){
            contained <- FALSE
            #if(length(my_branches)>0){
                for(j in seq(1,length(my_branches),by=1)){
                    #cat("Testing adapter", possible_adapters[i],"against",my_branches[[j]]@name,  '\n')
                    #print(possible_adapters[i] == my_branches[[j]]@name)
                    if(possible_adapters[i] == my_branches[[j]]@name ){
                        #print(my_branches[[j]] )
                        #cat("Sum", mysum, '\n')
                        mysum <- mysum + my_branches[[j]]@contains_num
                        #print(mysum)
                        contained <- TRUE
                    }
                }   
            #}
            if(!contained){
                #my_branches <- c(my_branches, depth_first( possible_adapters[i],adapters ))
                mysum <- mysum + depth_first(possible_adapters[i],adapters )
                #print(test)
                #cat("Test Value", test, '\n')
            }
        }
    }
    else  {
        #print("gets here")
        new_branch <- new("branch",name=joltage, contains=0, contains_num= 1 )
        my_branches <<- c(my_branches,new_branch)
        #return( new("branch",name=joltage, contains=0, contains_num= 1 ) )
        return(mysum)
    }
    #print("gets here 2")
    new_branch <- new("branch",name=joltage, contains=0, contains_num= mysum )
    #print(new_branch)
    my_branches <<- c(my_branches, new_branch)
    return(mysum)#new("branch",name=joltage, contains=0, contains_num= mysum ) )
}


print(depth_first(0, adapters),digits=16)
#print(my_branches)