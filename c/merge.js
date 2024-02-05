#!/usr/bin/env node

// merge two files---the incoming 1-page index and the global index (on disk)
// the details of the global index can be seen in the test cases.

const fs = require('fs');
const readline = require('readline');

// -----------------------------------------------------------------------------
// 0. global variables and helper functions
let globalIdxFile = process.argv[2];
let freqs = {}; // map token to an array of (link, freq) pairs

// 1: process the globalIdxFile
let text = fs.readFileSync(globalIdxFile, 'utf-8');
for (const line of text.split('\n')) {
  if (!line) {
    continue;
  }
  let [term, rest] = line.split(' | ');
  if (!freqs[term]) {
    freqs[term] = {};
  }
  let restWords = rest.split(' ');
  for (let i = 0; i < restWords.length; i += 2) {
    let url = restWords[i];
    let count = restWords[i + 1];
    freqs[term][url] = parseInt(count);
  }
}

// -----------------------------------------------------------------------------

const rl = readline.createInterface({
  input: process.stdin,
});

rl.on('line', (line) => {
  let [term, count, url] = line.split('|').map((part) => part.trim());
  if (!freqs[term]) {
    freqs[term] = {};
  }
  if (!freqs[term][url]) {
    freqs[term][url] = parseInt(count);
  } else {
    freqs[term][url] += parseInt(count);
  }
});

rl.on('close', () => {
  const serializedContent = serializeFreqs(freqs);
  console.log(serializedContent);
});

// serialize freqs to the desired format
const serializeFreqs = (freqs) => {
  let result = '';
  for (const token of Object.keys(freqs)) {
    // sort URLs based on counts in decreasing order
    const sortedUrls = Object.keys(
        freqs[token]).sort((a, b) => freqs[token][b] - freqs[token][a]);

    result += `${token} |`;

    // append sorted (url, count) pairs
    for (const url of sortedUrls) {
      result += ` ${url} ${freqs[token][url]}`;
    }

    result += '\n';
  }

  return result.slice(0, -1);
};
