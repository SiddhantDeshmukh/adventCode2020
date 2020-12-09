library(tidyverse)
#df <- read.delim("day9/test_input.txt")
df <- read.delim("day9/input.txt")

vals <- df[[1]]

n_before <- 25

preamble <- vals[1 : (1+n_before)]
print(preamble)

check_sum <- function(x, arr) {
    #for the number x, see if a sum of any two numbers in arr can make it
    sums <- c()
    #first check if it is larger than the max value * 2
    if(x >= (max(arr)*2) ){
        return(FALSE)
    }
    else if(x < (min(arr)) ){ #similarly see if it is less than the min value
        return(FALSE)
    }
    else{
        #now we need to make the sums
        for(j in seq(1, length(arr)-1, by=1)){
            for(k in seq(j+1, length(arr), by=1)){
                sums <- c(sums, arr[j]+arr[k] )
            }
        }
        return( x %in% sums )
    }
}

wrong_index <- 0
#start from after the original preamble
for(i in seq(1+n_before, length(vals), by=1)){
    valid <- check_sum(vals[i], preamble )
    if(! valid){
        wrong_index <- i
        break
    }
    preamble <- vals[(i - n_before) : i  ]

}

cat(vals[wrong_index], wrong_index, '\n')
