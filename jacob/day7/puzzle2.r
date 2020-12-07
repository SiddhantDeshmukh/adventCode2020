library(tidyverse)
#s <- readChar("day7/test_input2.txt", file.info("day7/test_input2.txt")$size)
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

all_names <- c()
for(bag in all_bags){
    all_names <- c(all_names, bag@name)
}

#recursive depth-first traversal
df_search <- function(mybag, bagrules, bagnames, nbags) {
    inside_bags <- c()

    #base case
    if(mybag@contains_color[1] == "other"){
        return(1)
    }

    for(i in seq(1, length(mybag@contains_color), by=1)){
        x = match(mybag@contains_color[i], bagnames)   
        if(!is.na(x)){
            nbags <- nbags + mybag@contains_num[i]* df_search(bagrules[[x]],bagrules,bagnames,1)
        }
    }

    return(nbags)

}


x <- match( "shiny gold",all_names)
mybags <- df_search(all_bags[[x]],all_bags, all_names, 0 ) 
cat(mybags,'\n', length(temp))


