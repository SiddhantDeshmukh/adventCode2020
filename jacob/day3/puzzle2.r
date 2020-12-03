library(tidyverse)
df <- read.delim("day3/map.txt")
map <- df[[1]]
wid <- nchar(map[1] ) +1
len <- length(map) + 1
cat(wid, len, '\n')

steps1 <- c(1,3,5,7,1)
steps2 <- c(1,1,1,1,2) 
all_trees <- 1

for (k in seq(1,length(steps1),by=1 ) ){
    coord1 <- 1
    coord2 <- 1
    step1 <- steps1[k]
    step2 <- steps2[k]
    cat("Steps: ", step1,step2,'\n')
    start_val <- substring(map[coord2],coord1,coord1 )
    encounters <- start_val
    n_trees <- 0
    while(coord2 < len){
        val <- substring(map[coord2],coord1 ,coord1  )
       
        if(val == '#'){
            n_trees <- n_trees + 1
            #substring(map[coord2],coord1 ,coord1  ) <- 'X'
        }
        else {
            #substring(map[coord2],coord1 ,coord1  ) <- 'O'
        }
        #print(map[coord2] )
        coord2 <- coord2 + step2
        coord1 <- coord1 + step1   
        if(coord1 >= wid ){
            coord1 <- coord1 - wid + 1
        }
    }
    cat("N trees: ",n_trees, '\n')
    all_trees <- c(all_trees, n_trees)
}
print(all_trees)
print(all_trees[2] * all_trees[3] * all_trees[4] * all_trees[5] * all_trees[6] )
#print(encounters)