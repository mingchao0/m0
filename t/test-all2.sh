#!/bin/bash

cd "$(dirname "$0")" || exit

./test_getURLs2.sh
./test_getText2.sh
./test_process2.sh
./test_stem2.sh
./test_combine2.sh