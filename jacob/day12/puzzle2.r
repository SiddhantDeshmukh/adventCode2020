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
waypoint_pos <- c(10,1)
cat(waypoint_pos, pos, '\n')

for(cmd in commands){
    temp_dir <- substr(cmd,1,1 )
    temp_amt <- strtoi(str_split(cmd, temp_dir)[[1]][2])
    if(temp_dir == "F"){
        for(i in seq(1,temp_amt,1)){
            #move to the waypoint
            dx <- waypoint_pos[1] - pos[1]
            dy <- waypoint_pos[2] - pos[2]
            pos <- waypoint_pos
            waypoint_pos <- c(pos[1] + dx, pos[2]+dy )
        }
        
    }
    else if (temp_dir == "N") {
       waypoint_pos <- c( waypoint_pos[1],waypoint_pos[2] + temp_amt    )
    }
    else if (temp_dir == "E") {
       waypoint_pos <- c( waypoint_pos[1]+ temp_amt,waypoint_pos[2]     )
    }
    else if (temp_dir == "S") {
       waypoint_pos <- c( waypoint_pos[1],waypoint_pos[2] - temp_amt    )
    }
    else if (temp_dir == "W") {
       waypoint_pos <- c( waypoint_pos[1]- temp_amt,waypoint_pos[2]   )
    }
    else if (temp_dir == "R") {
       dx <- waypoint_pos[1] - pos[1]
       dy <- waypoint_pos[2] - pos[2]
       #calculate the rotation matrix
       xp <- dx*cos( radians(temp_amt) ) + dy*sin(radians(temp_amt))
       yp <- -dx*sin( radians(temp_amt) ) + dy*cos(radians(temp_amt))
       waypoint_pos <- c(pos[1] + xp, pos[2] + yp  )
       
    }
    else if (temp_dir == "L") {
       dx <- waypoint_pos[1] - pos[1]
       dy <- waypoint_pos[2] - pos[2]
       #calculate the rotation matrix
       xp <- dx*cos( radians(-temp_amt) ) + dy*sin(radians(-temp_amt))
       yp <- -dx*sin( radians(-temp_amt) ) + dy*cos(radians(-temp_amt))
       waypoint_pos <- c(pos[1] + xp, pos[2] + yp  )
    }
    #print(pos)
}

print(manhattan_dist(pos))
