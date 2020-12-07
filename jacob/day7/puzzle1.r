library(tidyverse)
#s <- readChar("day7/test_input.txt", file.info("day7/test_input.txt")$size)
s <- readChar("day7/input.txt", file.info("day7/input.txt")$size)

#process the raw text file
parts <- str_split(s,"\r" )[[1]]
for(i in seq(1,length(parts),by=1)){
    parts[i] <- str_trim(parts[i])
}
parts <- parts[1:(length(parts)-1)]

#outline of bag class
setClass("bag", slots=list(name="character",contains_color="character",contains_num="integer" ))

all_bags <- c()

#make bag objects for each "rule" in the list
for(i in seq(1, length(parts),by=1)){
    main_bag <- str_trim(str_split(str_split(parts[i],"contain" )[[1]][1], "bag")[[1]][1] )
    rules <- str_split(str_split(parts[i],"contain" )[[1]][2], ',')[[1]] 
    bags <- ""
    nums <- strtoi("0")

    for (rule in rules){
        temp <- str_split( rule,  "bag")[[1]][1]
        num <- str_split( temp,  ' ')[[1]][2]
        bag <- str_split( temp,  num)[[1]][2]
        if (grepl("no",num, fixed=TRUE)){
            num <- "0"
        }
        bags <- c(bags, str_trim(bag) )
        nums <- c(nums, strtoi(num) )
    }
    bags <- bags[2:length(bags) ]
    nums <- nums[2:length(nums) ]

    test <- new("bag",name=main_bag, contains_color=bags, contains_num=nums)
    all_bags <- c(all_bags,test)
}

#breadth first recursive search
bf_search <- function(color, rules, bags ) {
    #error catching
    if( is.na(color)  || color == ""){
        return( c() )
    }

    new_colors <- c()
    for(i in seq(1, length(rules), by=1)){
        if(color %in% rules[[i]]@contains_color){
            #cat("Can be found in ",rules[[i]]@name, '\n')
            if(! (rules[[i]]@name %in% bags)  ){
                new_colors <- c(new_colors, rules[[i]]@name)
                bags <- c(bags, rules[[i]]@name )
            }
        }
    }
    #base case
    if(length(new_colors) < 1 ){
        return(c() ) 
    }

    for (i in seq(1, length(new_colors), by=1)){
        temp <- bf_search(new_colors[i], rules, bags)
        bags <- union(bags, temp) #do this so there are no repeats
    }
    return(bags)
}

mybags <- bf_search("shiny gold",all_bags, c() ) 

cat(mybags,'\n', length(temp))

