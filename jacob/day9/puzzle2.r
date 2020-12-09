library(tidyverse)
#read in the input
#df <- read.delim("day9/test_input.txt")
df <- read.delim("day9/input.txt")
vals <- df[[1]]

#format the preamble
n_before <- 25
preamble <- vals[1 : (1+n_before)]

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

check_consecutive <- function(start_index, target, arr) {
    if(arr[start_index]  > target){ #if the first number is larger than our target, we can't really sum to it can we
        return(c(0,0) )
    }
    else{
        for(k in seq(start_index + 1, length(arr),by=1 )  ){
            mysum <- sum(arr[start_index : k])
            if(mysum > target){
                return(c(0,0))
            }
            else if (mysum == target) {
               return(c(start_index, k))
            }
        }
        return(c(0,0)) #failure case
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
    preamble <- vals[(i - n_before) : i  ] #update the preamble
}
#print results
cat(vals[wrong_index], wrong_index, '\n')


#find the encryption weakness
smallest <- 0
largest <- 0
for(i in seq(1, length(vals), by=1)){
    #check if any consecutive numbers starting from index i can reach the previously found value
    res <- check_consecutive(i, vals[wrong_index], vals )
    if(res[1] > 0 && res[2] >0  ){
        smallest <- min( vals[res[1] : res[2] ]  )
        largest <- max( vals[res[1] : res[2] ]  )
        break
    }
}

cat(smallest, largest, largest+smallest,'\n'    )
