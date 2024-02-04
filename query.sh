#!/bin/bash

# Provided an appropriate index, the query could be implemented using grep
# along  with appropriate stemming of the input strings and stripping of the 
# index metadata

term=$1
index_file="d/global-index.txt"

result=$(grep -i -o ".*$term.*" "$index_file")
echo "$result"