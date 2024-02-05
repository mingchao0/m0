#!/usr/bin/env node

// Extract text from a web page

const {convert} = require('html-to-text');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
});

let allHtml = '';

rl.on('line', (line) => {
  // get all html from the input
  allHtml += line + '\n';
});

rl.on('close', () => {
  // convert the accumulated HTML to text
  // heading and anchor elements should have different formats
  const textContent = convert(allHtml, {
    wordwrap: false,
    format: {
      heading: function(node, fn, options) {
        const hText = fn(node.children, options);
        return hText.toUpperCase();
      },
      anchor: function(node, fn, options) {
        const href = options.linkHref(node);
        const text = fn(node.children, options);
        return text + ' [' + href + ']';
      },
    },
  });

  // print to stdout for the next component of the engine
  console.log(textContent);
});
