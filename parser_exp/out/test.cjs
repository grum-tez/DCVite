"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var markdown_1 = require("@ts-stack/markdown");
// Set options for the markdown parser
markdown_1.Marked.setOptions({
    renderer: new markdown_1.Renderer(),
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
});
// Read the content of the test.md file
var markdownContent = fs.readFileSync('parser_exp/test.md', 'utf8');
// Generate the markdown content
var htmlContent = markdown_1.Marked.parse(markdownContent);
// Generate the full HTML page
var htmlPage = "<!DOCTYPE html>\n<html>\n  <head>\n    <meta charset=\"UTF-8\">\n    <title>Your page title here</title>\n    <link rel=\"stylesheet\" href=\"test.css\">\n  </head>\n  <body>\n    ".concat(htmlContent, "\n  </body>\n</html>");
// Write the HTML page to a file
fs.writeFileSync('parser_exp/out/test.html', htmlPage);
