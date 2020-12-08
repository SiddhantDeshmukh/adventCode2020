library(tidyverse)
#df <- read.delim("day8/test_input.txt")
df <- read.delim("day8/input.txt")

commands <- df[[1]]
#print(commands)


acc <- 0
pos <- 1
values <- list(pos)
cont <- TRUE
while( cont ){
    cmd = str_trim(commands[pos])
    print(cmd)
    if(grepl("nop", cmd,  fixed = TRUE)){
        #just continue
        pos <- pos + 1
    }
    else if (grepl("jmp",cmd,fixed=TRUE ) ) {
       #jump
       amnt <- strtoi(str_split(cmd," "  )[[1]][2])
       cat("Jump", amnt,pos, '\n')
       pos <- pos + amnt
    }
    else if (grepl("acc",cmd,fixed=TRUE ) ) {
       #accumulate
       amnt <- strtoi(str_split(cmd," "  )[[1]][2])
       acc <- acc + amnt
       cat("Acc", amnt,acc, '\n')
       pos <- pos + 1
    }

    if(pos %in% values){
        cont <- FALSE
    }
    else{
        values <- c(values, pos)
    }
}

print(acc)
