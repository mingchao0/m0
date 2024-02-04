#!/bin/bash
# Invert index to create a mapping from terms to URLs containing that term
# The details of the index structure can be seen in the test cases

# Read the URL from the command line argument
url=$1

declare -A freqs
# Read input from stdin
while IFS= read -r line; do
    if [[ -v freqs["$line"] ]]; then
        freqs["$line"]=$((freqs["$line"] + 1))
    else
        freqs["$line"]=1
    fi
done

# Put all keys into an array
keys=("${!freqs[@]}")

mapfile -t sorted_keys < <(printf "%s\n" "${keys[@]}" | sort)
for key in "${sorted_keys[@]}"; do
    echo "$key | ${freqs[$key]} | $url"
done
