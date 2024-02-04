#!/bin/bash
T_FOLDER=${T_FOLDER:-t}
R_FOLDER=${R_FOLDER:-}

cd "$(dirname "$0")/..$R_FOLDER" || exit 1

DIFF=${DIFF:-diff}
# cat "$T_FOLDER"/mydata/getTextOut.txt | c/process.sh | sort
if $DIFF <(cat "$T_FOLDER"/mydata/getTextOut.txt | c/process.sh | sort) <(sort "$T_FOLDER"/mydata/processOut.txt) > /dev/null;
then
    echo "$0 success: texts are identical"
else
    echo "$0 failure: texts are not identical"
fi
