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

check_los <- function(x,y,map) {
    if(grepl(".",map[[y]][x],fixed=TRUE )){
        return(c(0,0) )
    }
    minus_indices <- seq(-1, -length(map[[1]] ),by=-1)
    plus_indices <- seq(1, length(map[[1]] ),by=1)
    xvals_left <- x + minus_indices
    xvals_left <- xvals_left[xvals_left >0]
    xvals_right <- x + plus_indices
    xvals_right <- xvals_right[xvals_right <= length(map[[1]])]
    minus_indices <- seq(-1, -length(map ),by=-1)
    plus_indices <- seq(1, length(map ),by=1)
    yvals_up <- y + minus_indices
    yvals_up <- yvals_up[yvals_up > 0]
    yvals_down <- y + plus_indices
    yvals_down <- yvals_down[yvals_down <= length(map)]

    left <- map[[y]][xvals_left ] 
    if(x==1){
        left <- NA
    }  
    right <- map[[y]][xvals_right]  
    if(x== length(map[[1]])){
        right <- NA
    } 
    up <- c()
    ul <- c()
    ur <- c()
    if(y > 1){
        for( i in seq(1, length(yvals_up),1 )){
            j <- yvals_up[i]
            up <- c(up,map[[j]][x]   )
            ul <- c(ul,map[[j]][xvals_left[i] ])
            ur <- c(ur,map[[j]][xvals_right[i] ])
        }
    }
    
    down <- c()
    dl <- c()
    dr <- c()
    if(length(yvals_down) >0 ){
        for( i in seq(1, length(yvals_down),1 )){
            j <- yvals_down[i]
            down <- c(down,map[[j]][x]   )
            dl <- c(dl,map[[j]][xvals_left[i] ])
            dr <- c(dr,map[[j]][xvals_right[i] ])
        }
    }
    

    #now find the first in each array that is not floor
    n_adj <- 0
    n_possible <- 0
    
    
    #print(c(left[left != "."][1], right[right != "."][1], up[up != "."][1], down[down != "."][1], dr[dr != "."][1], dl[dl != "."][1], ul[ul != "."][1], ur[ur != "."][1]))
    for(opt in c(left[left != "."][1], right[right != "."][1], up[up != "."][1], down[down != "."][1], dr[dr != "."][1], dl[dl != "."][1], ul[ul != "."][1], ur[ur != "."][1])){
        if(grepl("L",opt,fixed=TRUE) ){
            n_possible <- n_possible + 1
        }
        else if(grepl("#",opt,fixed=TRUE) ){
            n_adj <- n_adj + 1
            n_possible <- n_possible + 1
            #cat("WTF", opt, '\n')
        }
    }

    return( c(n_adj, n_possible) )

}

update <- function(map_matrix) {
    temp_map <- map_matrix
    for(x in seq(1,length(map_matrix[[1]]),1)   ){
        for(y in seq(1,length(map_matrix),1)   ){
            #seat is occupied
            val <- check_los(x,y,map_matrix)
            #cat(x,y,val, '\n')
            if(grepl("#",map_matrix[[y]][x],fixed=TRUE )){
                
                if(val[1] >= 5){# && val[2] > 0){
                    temp_map[[y]][x] <- "L"
                }
            }
            else{ #seat is empty or floor 
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
    #print(new_map[[1]] )
    #print(new_map[[2]] )
    #print(new_map[[3]] )
}
print( count_occupied(old_map) )
#print( check_los(3,1,map )  )


