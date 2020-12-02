#read the text file
df <- read.delim("./day1/puzzle1.txt")

#make an "empty" output list
output <- 0
#iterate from i=1..N-1 and j=i+1..N to prevent double checking
for (i in seq(1,length(df$X)-1 )) { 
    for (j in seq(i+1, length(df$X),by=1) ){
        #if sum is 2020, print and save product
        if( df$X[[i]] + df$X[[j]] == 2020){
            print(i)
            print(j)
            print(df$X[[i]])
            print(df$X[[j]])
            output <- c(output, df$X[[i]]*df$X[[j]] )
        }
    }          
}
print("Done")
output
