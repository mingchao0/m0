#!/usr/bin/env node

// use Porter Stemmer to stem individual terms in a streaming fashion

var readline = require('readline');
var natural = require('natural');

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

rl.on('line', function(line) {
  // split the line into words
  var words = line.split(/\s+/);
  // use the Porter Stemmer library
  var stemmedWords = words.map((word) => natural.PorterStemmer.stem(word));
  // output the stemmed words to stdout
  console.log(stemmedWords.join(' '));
});
