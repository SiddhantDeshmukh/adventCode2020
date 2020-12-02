library(tidyverse)
df <- read.delim("day2/passwords.txt")#https://adventofcode.com/2020/day/2/input")

num <- 0
for (i in seq(1, length(df$X),by=1)  ){
    #format the line into separate strings
    line = df$X[[i]]
    vals <- str_split(line, ': ')
    min <- strtoi(str_split(vals[[1]][1],'-')[[1]][1])
    max <- strtoi(str_split(str_split(vals[[1]][1],'-')[[1]][2], ' ')[[1]][1])
    letter <- str_split(str_split(vals[[1]][1],'-')[[1]][2], ' ')[[1]][2]
    pword <- vals[[1]][2]
    #cat(min, max, letter,pword,'\n')

    #now check if rules are followed
    #split password on the letter and count length
    s <- str_split(pword, letter)[[1]]
    num_occur <- length(s)-1
    if ( num_occur >= min && num_occur <= max){
        num <- num + 1
        #cat(s, num_occur, '\n')
    }
}

print(num)