#!/usr/bin/env node

// Extract text from a web page

const {convert} = require('html-to-text');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
});

let fullHtml = '';

rl.on('line', (line) => {
  // Accumulate the full HTML content from each line
  fullHtml += line + '\n';
});

rl.on('close', () => {
  // Convert the accumulated HTML to text using html-to-text
  const textContent = convert(fullHtml, {
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

  // Print the extracted text
  console.log(textContent);
});
