#!/usr/bin/env node

const readline = require('readline');
const { JSDOM } = require('jsdom');
const { URL } = require('url');

// Example usage:
let baseURL = process.argv[2] + "/";
let indexLen = "index.html/".length
if (baseURL.slice(-indexLen) === "index.html/") {
  baseURL = baseURL.slice(0, -indexLen)
}

const rl = readline.createInterface({
  input: process.stdin,
});

// TODO some code

rl.on('line', (line) => {
  // Process each line of the HTML stream
  const dom = new JSDOM(line)
  const document = dom.window.document
  const anchors = document.querySelectorAll('a')

  for (const anchor of anchors) {
    const href = anchor.getAttribute('href')
    if (href) {
      // Check if href is a relative URL
      const isRelativeURL = !/^https?:\/\//i.test(href)
      // Resolve relative URLs relative to the baseURL
      if (isRelativeURL) {
        console.log(new URL(href, baseURL).href)
      } else {
        console.log(href)
      }
    }
  }
});

rl.on('close', () => {
  // TODO some code
});
