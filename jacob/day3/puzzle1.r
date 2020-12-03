library(tidyverse)
df <- read.delim("day3/map.txt")
coord1 <- 1
coord2 <- 1
map <- df[[1]]

wid <- nchar(map[1] ) +1
len <- length(map) +1
cat(wid, len, '\n')

step1 <- 3
step2 <- 1
start_val <- substring(map[coord2],coord1,coord1 )
encounters <- start_val
n_trees <- 0


while(coord2 < len){
    val <- substring(map[coord2],coord1 ,coord1  )
    cat(val, '\n')
    if(val == '#'){
        n_trees <- n_trees + 1
        substring(map[coord2],coord1 ,coord1  ) <- 'X'
    }
    else {
       substring(map[coord2],coord1 ,coord1  ) <- 'O'
    }
    print(map[coord2] )
    coord2 <- coord2 + step2
    coord1 <- coord1 + step1   
    if(coord1 >= wid ){
        coord1 <- coord1 - wid + 1
    }
}
print(n_trees)
#print(encounters)