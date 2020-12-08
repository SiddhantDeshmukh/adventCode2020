library(tidyverse)
#df <- read.delim("day8/test_input.txt")
df <- read.delim("day8/input.txt")

commands <- df[[1]]

#iterate over all commands, if it is nop or jmp, switch it to see if it terminates
terminated <- FALSE
changed <- 0
final_acc <- 0

for(j in seq(1, length(commands), by=1)){
    print(j)
    temp_commands <- commands 
    if (grepl("nop", temp_commands[j],  fixed = TRUE) || grepl("jmp", commands[j],  fixed = TRUE)){
        
        if(grepl("nop", temp_commands[j],  fixed = TRUE)){
            #if(strtoi(str_split(commands[j]," "  )[[1]][2]) != 0 ){
            temp_commands[j] <- str_replace(temp_commands[j], "nop","jmp" )
            #}
        }
        else{
            temp_commands[j] <- str_replace(temp_commands[j], "jmp","nop" )
        }
        cat("Changed command ", temp_commands[j], '\n')
        acc <- 0
        pos <- 1
        values <- list(pos)
        cont <- TRUE
        while( cont ){
            cmd = str_trim(temp_commands[pos])
            #print(cmd)
            if(grepl("nop", cmd,  fixed = TRUE)){
                #just continue
                pos <- pos + 1
            }
            else if (grepl("jmp",cmd,fixed=TRUE ) ) {
                #jump
                amnt <- strtoi(str_split(cmd," "  )[[1]][2])
                pos <- pos + amnt
            }
            else if (grepl("acc",cmd,fixed=TRUE ) ) {
                #accumulate
                amnt <- strtoi(str_split(cmd," "  )[[1]][2])
                acc <- acc + amnt
                pos <- pos + 1
            }

            if(pos %in% values){
                cont <- FALSE
                cat("Finished", acc, '\n')
            }
            else{
                values <- c(values, pos)
            }
            if(pos > length(commands)){
                terminated <- TRUE
                cont <- FALSE
                changed <- j 
                final_acc <- acc
            }
        }
    }
    if(terminated){
        break
    }
}

cat(changed, final_acc, '\n')
