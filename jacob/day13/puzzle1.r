library(tidyverse)
#df <- read.delim("day13/test_input.txt")
df <- read.delim("day13/input.txt")

notes <- df[[1]]
mytime <- strtoi(notes[1])
temp_buses <- str_split(notes[2],',')[[1]]
buses <- c()
for(i in seq(1, length(temp_buses),1 )){
    if(temp_buses[i] != "x" ){
        buses <- c(buses, strtoi(temp_buses[i]))
    }
}
print(buses)
print(mytime)
match <- 0
time <- mytime
while(match ==0){
    for(b in buses){
        if(time %% b ==0){
            match = b
            break
        }
    }
    if(match == 0){
        time <- time + 1
    }
    
}
cat(time,match,'\n' )
delta_time <- time - mytime
print(delta_time * match)


