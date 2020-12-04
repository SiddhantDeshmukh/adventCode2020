library(tidyverse)
s <- readChar("day4/passports.txt", file.info("day4/passports.txt")$size)

parts <- str_split(s,"\r" )[[1]]
entries <- 0

#loop to parse the text file into grouped entries, separated by '\r'
subgroup <- ""
for (i in seq(1,length(parts),by=1 )){
    if(parts[i] != "\n")
    {
        #concatenate strings to form subgroups
        subgroup <- paste(subgroup,str_trim(parts[i]),sep=" ") #c(subgroup, " " ,str_trim(parts[i]))
    }
    else{
        #clear the subgroup and add to entries
        entries <- c(entries, subgroup )
        subgroup <- ""
    }
}
entries <- entries[1:length( entries)] #remove the initial 0 

n_valid <- 0
#parse each entry to see which fields are there
for (i in seq(1,length(entries),by=1)){
    parts <- str_split(entries[i], " ")[[1]]
    if(length(parts) >= 7 ){

        valid <-  (grepl("byr", entries[i],fixed=TRUE) 
                && grepl("iyr", entries[i],fixed=TRUE) 
                && grepl("eyr", entries[i],fixed=TRUE)
                && grepl("hgt", entries[i],fixed=TRUE)
                && grepl("hcl", entries[i],fixed=TRUE) 
                && grepl("ecl", entries[i],fixed=TRUE)
                && (grepl("pid", entries[i],fixed=TRUE) || grepl("cid", entries[i],fixed=TRUE) )   )
        cat(entries[i], valid, '\n')
        if(valid){
            n_valid <- n_valid + 1
        }
    }
    
}

print(n_valid)
