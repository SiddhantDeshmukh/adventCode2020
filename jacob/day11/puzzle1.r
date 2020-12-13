library(tidyverse)
#df <- read.delim("day11/test_input.txt")
df <- read.delim("day11/input.txt")

#reformat into a matrix of chars
map <- data.matrix(df$map)#  [[1]]
rows <- c()
for(i in seq(1,length(map),1) ){
    rows <- c(rows,str_split(map[i,],'' ))
}
map <- data.matrix(rows)
#does it work like a matrix?
print(map[[1]][2] )

check_adj <- function(x,y,map) {
    n_adj <- 0
    n_possible <- 0
    #print(map[[y]][x] )
    if(grepl(".",map[[y]][x],fixed=TRUE )){
        return(c(0,0) )
    }
    
    for(i in seq( max(x-1,1), min(x+1, length(map[[1]])),by=1 )){
        for(j in seq( max(y-1,1), min(y+1, length(map)),1 )){
            if(i != x || j != y){
                val <- map[[j]][i]
                #cat(i,j,val,'\n')
                if(! grepl(".", val, fixed = TRUE)){
                    n_possible <- n_possible + 1
                }
                if(grepl("#", val, fixed = TRUE)){
                    n_adj <- n_adj + 1
                }
            }
        }
    }
    return(c(n_adj, n_possible) )
}

update <- function(map_matrix) {
    temp_map <- map_matrix
    for(x in seq(1,length(map_matrix[[1]]),1)   ){
        for(y in seq(1,length(map_matrix),1)   ){
            #seat is occupied
            if(grepl("#",map_matrix[[y]][x],fixed=TRUE )){
                val <- check_adj(x,y,map_matrix)
                if(val[1] >= 4 && val[2] > 0){
                    temp_map[[y]][x] <- "L"
                }
            }
            else{ #seat is empty or floor 
                val <- check_adj(x,y,map_matrix)
                #print(val)
                if(val[1] == 0 && val[2] > 0){
                    temp_map[[y]][x] <- "#"
                }
            }
        }
    }
    return(temp_map)
}

is_same <- function(matrix1,matrix2) {
    for(i in seq(1, length(matrix1[[1]]),by=1 )  ){
        for(j in seq(1, length(matrix1),by=1 )  ){
            if( matrix1[[j]][i] != matrix2[[j]][i]   ){
                return(FALSE)
            }
        }
    }
    return(TRUE)
}

count_occupied <- function(mat) {
    n_occ <- 0
    for(i in seq(1, length(mat[[1]]),by=1 )  ){
        for(j in seq(1, length(mat),by=1 )  ){
            if(grepl("#",mat[[j]][i],fixed=TRUE )){
                n_occ <- n_occ + 1
            }
        }
    }
    return(n_occ)
}

continue <- TRUE
old_map <- map
k <- 0
while(continue){
    new_map <- update(old_map)
    if (is_same(new_map, old_map)) {
       continue <- FALSE
    }
    old_map <- new_map
    print(k)
    k <- k + 1
}
print(old_map[[1]])
print(old_map[[2]])
print( count_occupied(old_map) )

