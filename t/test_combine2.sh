#!/bin/bash
T_FOLDER=${T_FOLDER:-t}
R_FOLDER=${R_FOLDER:-}

cd "$(dirname "$0")/..$R_FOLDER" || exit 1

DIFF=${DIFF:-diff}
# cat "$T_FOLDER"/mydata/stemOut.txt | c/combine.sh | sed 's/\t*$//' | sed 's/\s/ /g' | sort | uniq
if $DIFF <(cat "$T_FOLDER"/mydata/stemOut.txt | c/combine.sh | sed 's/\t*$//' | sed 's/\s/ /g' | sort | uniq) <(cat "$T_FOLDER"/mydata/combineOut.txt | sed 's/\t*$//' | sed 's/\s/ /g' | sort | uniq) > /dev/null;
then
    echo "$0 success: ngrams are identical"
else
    echo "$0 failure: ngrams are not identical"
fi
