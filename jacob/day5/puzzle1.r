library(tidyverse)
s <- readChar("day5/passes.txt", file.info("day5/passes.txt")$size)

#process the raw text file
parts <- str_split(s,"\r" )[[1]]
for(i in seq(1,length(parts),by=1)){
    parts[i] <- str_trim(parts[i])
}
parts <- parts[1:(length(parts)-1)]


#function to take either the front or back half of a list
bin_split <- function(arr,front) {
    if(front){
        return( arr[1:(length(arr) /2)]  )
    }
    else{
        return( arr[(length(arr) /2+1):length(arr) ]  )
    }
}

rows <- seq(0,127,by=1)
seats <- seq(0,7,by=1)
vals <- 0
for(i in seq(1,length(parts),by=1)){
    temp_rows <- rows
    temp_seats <- seats
    #find the row
    for(j in seq(1,7,by=1) ){
        temp_rows <- bin_split(temp_rows, substring(parts[i],j,j)=='F')
    }
    #find the seat
    for(j in seq(8,10,by=1) ){
        temp_seats <- bin_split(temp_seats, substring(parts[i],j,j)=='L')
    }
    #append the seat id to the list
    vals <- c(vals,8*temp_rows + temp_seats)
}
print(vals)
#print the max value
print(max(vals))


