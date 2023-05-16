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
var htmlPage = "<!DOCTYPE html>\n<html>\n  <head>\n    <meta charset=\"UTF-8\">\n    <title>Your page title here</title>\n    <link rel=\"stylesheet\" href=\"test.css\">\n    <script src=\"script.js\"></script>\n    <link rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css\">\n  </head>\n  <body>\n  <div class=\"sidebar\">\n  <h2>Tests</h2>\n  <p>tests</p>\n  <!-- Add your test content here -->\n</div>\n    <header class=\"header\">\n      <div class=\"header-top\">\n        <a class=\"github-link\" href=\"https://github.com/your-github-page\">\n          <i class=\"fab fa-github\"></i>\n        </a>\n      </div>\n      <div class=\"header-bottom\">\n        <h1 class=\"header-title\">My Tutorial</h1>\n        <p class=\"header-subtitle\">Learn something new every day</p>\n      </div>\n    </header>\n    <div class=\"container\">\n      ".concat(htmlContent, "\n    </div>\n    <footer class=\"footer\">\n      <p>&copy; 2023 My Tutorial. All rights reserved.</p>\n    </footer>\n  </body>\n</html>\n");
// Write the HTML page to a file
fs.writeFileSync('parser_exp/out/test.html', htmlPage);
