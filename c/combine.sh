#!/bin/bash
#
# Combine terms to create  n-grams (for n=1,2,3) and then count and sort them

# Create an array for unigrams, bigrams, and trigrams
terms=($(cat - | tr '\n' ' '))

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

# Combine unigrams, bigrams, and trigrams
combined=("${terms[@]}" "${bigrams[@]}" "${trigrams[@]}")

# Sort and count the combined terms
sorted_output=($(printf "%s\n" "${combined[@]}" | sort | uniq -c | sort -rn | awk '{print $2}'))
# Replace '-' with ' ' in each element
for ((i = 0; i < ${#sorted_output[@]}; i++)); do
    sorted_output[i]="${sorted_output[i]//-/ }"
done

# Print the sorted output
printf "%s\n" "${sorted_output[@]}"