library(tidyverse)
#df <- read.delim("day12/test_input.txt")
df <- read.delim("day12/input.txt")

commands <- df[[1]]

direction <- 90.0

radians <- function(x) {
    return( x * 3.14159265 / 180)
}

manhattan_dist <- function(p){
    return( abs(p[1]) + abs(p[2]) )
}

print(commands)

start_pos <- c(0,0)
pos <- start_pos

for(cmd in commands){
    temp_dir <- substr(cmd,1,1 )
    temp_amt <- strtoi(str_split(cmd, temp_dir)[[1]][2])
    cat(temp_dir, temp_amt, '\n')
    if(temp_dir == "F"){
        pos <- c( pos[1]+ temp_amt*sin( radians(direction) ),pos[2] + temp_amt*cos( radians(direction) )    )
    }
    else if (temp_dir == "N") {
       pos <- c( pos[1],pos[2] + temp_amt    )
    }
    else if (temp_dir == "E") {
       pos <- c( pos[1]+ temp_amt,pos[2]     )
    }
    else if (temp_dir == "S") {
       pos <- c( pos[1],pos[2] - temp_amt    )
    }
    else if (temp_dir == "W") {
       pos <- c( pos[1]- temp_amt,pos[2]   )
    }
    else if (temp_dir == "R") {
       #pos <- c( pos[1]- temp_amt,pos[2]   )
       direction <- (direction + temp_amt) %% 360
    }
    else if (temp_dir == "L") {
       direction <- (direction - temp_amt) %% 360
    }
    
}

print(manhattan_dist(pos))
