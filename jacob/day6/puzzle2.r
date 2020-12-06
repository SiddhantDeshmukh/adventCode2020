library(tidyverse)
library(gtools)
s <- readChar("day6/input.txt", file.info("day6/input.txt")$size)

parts <- str_split(s,"\r" )[[1]]
entries <- 0

#loop to parse the text file into grouped entries, separated by '\r'
subgroup <- ""
for (i in seq(1,length(parts),by=1 )){
    if(parts[i] != "\n")
    {
        #concatenate strings to form subgroups
        subgroup <- paste(subgroup,str_trim(parts[i]),sep=" ")
    }
    else{
        #clear the subgroup and add to entries
        entries <- c(entries, subgroup )
        subgroup <- ""
    }
}
entries <- entries[2:length( entries)] #remove the initial 0 
print(entries)

num_yes <- function(group) {
    num <- 0
    for(i in seq( as.numeric(asc('a')),as.numeric(asc('z')),by=1 )){
        letter <- chr(i)
        if(grepl(letter, group, fixed=TRUE)){
            num <- num + 1
        }
    }
    return (num)
}

num_all_yes <- function(group) {
    all_num <- 0
    people <- str_split(group,' ')[[1]]
    people <- people[2:length(people)]
    
    for(i in seq( as.numeric(asc('a')),as.numeric(asc('z')),by=1 )){
        letter <- chr(i)
        num <- 0
        for(person in people){
            if(grepl(letter, person, fixed=TRUE)){
                num <- num + 1
            }
        }
        
        if(num == length(people)){
            all_num <- all_num + 1
        }
    }
    #print(all_num)
    return (all_num)
}


total_num <- 0
for (i in seq(1, length(entries),by=1 )){
    total_num <- total_num + num_all_yes(entries[i])
    #num_all_yes(entries[i])
}
print(total_num)