#!/bin/bash
#
# Combine terms to create  n-grams (for n=1,2,3) and then count and sort them

# create an array for unigrams, bigrams, and trigrams
# initially, it contains unigrams from stdin
IFS=' ' read -ra terms <<< "$(cat - | tr '\n' ' ')"

# bigrams
bigrams=()
for ((i = 0; i < ${#terms[@]} - 1; i++)); do
    bigram="${terms[i]}-${terms[i + 1]}"
    bigrams+=("$bigram")
done

# trigrams
trigrams=()
for ((i = 0; i < ${#terms[@]} - 2; i++)); do
    trigram="${terms[i]}-${terms[i + 1]}-${terms[i + 2]}"
    trigrams+=("$trigram")
done

# echo "${terms[@]}"
# echo "${bigrams[@]}"
# echo "${trigrams[@]}"

# combine unigrams, bigrams, and trigrams
combined=("${terms[@]}" "${bigrams[@]}" "${trigrams[@]}")

# sort and count the combined terms
mapfile -t sorted_output < <(printf "%s\n" "${combined[@]}" | sort)

# replace '-' with ' ' in each element
for ((i = 0; i < ${#sorted_output[@]}; i++)); do
    sorted_output[i]="${sorted_output[i]//-/ }"
done

# Print the sorted output
printf "%s\n" "${sorted_output[@]}"