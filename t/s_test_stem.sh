#!/bin/bash

T_FOLDER=${T_FOLDER:-t}
R_FOLDER=${R_FOLDER:-}

cd "$(dirname "$0")/..$R_FOLDER" || exit 1

DIFF=${DIFF:-diff}
# cat "$T_FOLDER"/mydata/processOut.txt | c/stem.js | sort
if $DIFF <(cat "$T_FOLDER"/mydata/processOut.txt | c/stem.js | sort) <(sort "$T_FOLDER"/mydata/stemOut.txt) > /dev/null;
then
    echo "$0 success: stemmed words are identical"
else
    echo "$0 failure: stemmed words are not identical"
fi
