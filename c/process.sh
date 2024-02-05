#!/bin/bash
# process text to convert it to maintain one word per 
# line, convert it to lowercase ascii, and remove any stopwords 
# useful commands: tr, iconv, grep

stopwords_file="d/stopwords.txt"
# 1: replace non-alphabetic characters with '\n'
# 2: change upper chars to lower chars
# 3: removes empty lines
# 4: remove common words in stopwords_file
tr -cs A-Za-z '\n' | tr '[:upper:]' '[:lower:]' | awk 'NF' | grep -vwF -f "$stopwords_file"
