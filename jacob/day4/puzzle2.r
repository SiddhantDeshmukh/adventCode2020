library(tidyverse)
library(gtools)
s <- readChar("day4/passports.txt", file.info("day4/passports.txt")$size)

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
entries <- entries[1:length( entries)] #remove the initial 0 

n_valid <- 0
#parse each entry to see which fields are there
for (i in seq(1,length(entries),by=1)){
    valid <-  (grepl("byr", entries[i],fixed=TRUE) 
                && grepl("iyr", entries[i],fixed=TRUE) 
                && grepl("eyr", entries[i],fixed=TRUE)
                && grepl("hgt", entries[i],fixed=TRUE)
                && grepl("hcl", entries[i],fixed=TRUE) 
                && grepl("ecl", entries[i],fixed=TRUE)
                && grepl("pid", entries[i],fixed=TRUE))
    if(valid){

        
        parts <- str_split(entries[i], " ")[[1]]
        #skip those that obviously don't have enough parts
        valid = TRUE 
        if(length(parts) >= 7 ){
            for (j in seq(1,length(parts),by=1)){
                key <- str_split(parts[j],':' )[[1]][1]
                value <- str_split(parts[j],':' )[[1]][2]
                cat(key, value,'\n')
                if(key == "byr"){
                    if(nchar(value) != 4){
                        valid <- c(valid, FALSE)
                    }
                    else{
                        valid <- c(valid, as.double(value) >= 1920 && as.double(value) <= 2002 )
                    }
                }
                if(key == "iyr"){
                    if(nchar(value) != 4){
                        valid <- c(valid, FALSE)
                    }
                    else{
                        valid <- c(valid, as.double(value) >= 2010 && as.double(value) <= 2020 )
                    }
                }
                if(key == "eyr"){
                    if(nchar(value) != 4){
                        valid <- c(valid, FALSE)
                    }
                    else{
                        valid <- c(valid, as.double(value) >= 2020 && as.double(value) <= 2030 )
                    }
                }
                if(key == "hgt"){
                    isValid <- FALSE
                    if(grepl("cm", value,fixed=TRUE)){
                        #check if between given values
                        isValid <- as.double(substring(value,1,nchar(value)-2)) >= 150 && as.double(substring(value,1,nchar(value)-2)) <= 193
                    }
                    else if(grepl("in", value,fixed=TRUE)){
                        isValid <- as.double(substring(value,1,nchar(value)-2)) >= 59 && as.double(substring(value,1,nchar(value)-2)) <= 76
                    }
                    else{
                        isValid <- FALSE
                    }
                   
                    valid <- c(valid, isValid)
                }
                if(key == "pid"){
                    valid <- c(valid, nchar(value) == 9  )
                }
                if(key == "hcl"){
                    #does it start with #
                    isHex <- substring(value,1,1) == '#'
                    #is it 6 digits long
                    isSix <- nchar(value) == 7
                    isAlphaNum <- TRUE 
                    if(isHex && isSix){
                        for(k in seq(2, 7,by=1 ) ){
                            #convert to ascii and see if values larger than f are there
                            if( as.numeric(asc(substring(value,k,k )) ) > as.numeric(asc('f')) ){
                                isAlphaNum <- FALSE
                            }
                        }
                    }
                    
                    valid <- c(valid, isHex && isSix && isAlphaNum)
                }
                if(key == "ecl"){
                #only specific values are allowed
                #amb blu brn gry grn hzl oth
                isValid <-   xor(grepl("blu", value,fixed=TRUE),
                                xor(grepl("hzl", value,fixed=TRUE),
                                xor(grepl("grn", value,fixed=TRUE),
                                xor(grepl("gry", value,fixed=TRUE),
                                xor(grepl("brn", value,fixed=TRUE),
                                xor(grepl("amb", value,fixed=TRUE), 
                                    grepl("oth", value,fixed=TRUE)  ))))))
                    
                    
                    valid <- c(valid,isValid)
                }
            }
            
        }

        #check whether all criteria have been met
        if (length(valid) >=7 && !(FALSE %in% valid)){
            n_valid <- n_valid + 1
        }
    }
}

print(n_valid)
