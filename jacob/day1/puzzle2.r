#read the text file
df <- read.delim("./day1/puzzle1.txt")

#empty output vector
output <- 0
#iterate from i=1..N-2, j=i+1..N-1, k=j+1..N
#prevents checking same combinations twice 
for (i in seq(1,length(df$X)-2 )) { 
    for (j in seq(i+1, length(df$X)-1,by=1) ){
        for (k in seq(j+1, length(df$X),by=1) ){
            #if the sum of the three is 2020, print and save the product
            if( df$X[[i]] + df$X[[j]]+df$X[[k]] == 2020){
                cat(i,j,k," ")
                cat(df$X[[i]], df$X[[j]], df$X[[k]])
                output <- c(output, df$X[[i]]*df$X[[j]]*df$X[[k]] )
            }
        }
    }          
  
}
print("Done")
output
