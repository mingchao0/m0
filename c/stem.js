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
  // Tokenize the line into words
  var words = line.split(/\s+/);

  // Stem each word using Porter Stemmer
  var stemmedWords = words.map((word) => natural.PorterStemmer.stem(word));

  // Output the stemmed words
  console.log(stemmedWords.join(' '));
});
