library(tidyverse)
df <- read.delim("day2/passwords.txt")#https://adventofcode.com/2020/day/2/input")

num <- 0
for (i in seq(1, length(df$X),by=1)  ){
    #format the line into separate strings
    line = df$X[[i]]
    vals <- str_split(line, ': ')
    first <- strtoi(str_split(vals[[1]][1],'-')[[1]][1])
    second <- strtoi(str_split(str_split(vals[[1]][1],'-')[[1]][2], ' ')[[1]][1])
    letter <- str_split(str_split(vals[[1]][1],'-')[[1]][2], ' ')[[1]][2]
    pword <- vals[[1]][2]
    #cat(min, max, letter,pword,'\n')
    
    #now check if rules are followed
    #see if letter is found on first XOR second
    if(xor(substring(pword,first,first)==letter,substring(pword,second,second)==letter  )){
        num <- num + 1
        print(line)
    }

}

print(num)