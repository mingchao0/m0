#!/usr/bin/env node

// merge two files---the incoming 1-page index and the global index (on disk)
// the details of the global index can be seen in the test cases.

const fs = require('fs');
const readline = require('readline');

// -----------------------------------------------------------------------------
// 0. global variables and helper functions
let globalIdxFile = process.argv[2];
let freqs = {}; // map token to an array of (link, freq) pairs
// function getType(variable) {
//   return Object.prototype.toString.call(variable).slice(8, -1);
// }

// 1: process the globalIdxFile
let text = fs.readFileSync(globalIdxFile, 'utf-8');
for (const line of text.split('\n')) {
  if (!line) {
    continue;
  }
  let [term, rest] = line.split(' | ');
  if (!freqs[term]) {
    freqs[term] = [];
  }
  let restWords = rest.split(' ');
  for (let i = 0; i < restWords.length; i += 2) {
    let url = restWords[i];
    let count = restWords[i + 1];
    freqs[term].push({'url': url, 'count': count});
  }
}

// -----------------------------------------------------------------------------

const rl = readline.createInterface({
  input: process.stdin,
});

rl.on('line', (line) => {
  let [term, count, url] = line.split('|').map((part) => part.trim());
  if (!freqs[term]) {
    freqs[term] = [];
  }
  freqs[term].push({'url': url, 'count': count});
});

rl.on('close', () => {
  const serializedContent = serializeFreqs(freqs);
  console.log(serializedContent);
  // fs.writeFileSync(globalIdxFile, serializedContent, 'utf-8');
});

// Serialize freqs to the desired format
const serializeFreqs = (freqs) => {
  let result = '';
  for (const token in freqs) {
    result += `${token} |`;
    for (let i = 0; i < freqs[token].length; i++) {
      let obj = freqs[token][i];
      result += ` ${obj['url']} ${obj['count']}`;
    }

    result += '\n';
  }

  return result.slice(0, -1);
};
