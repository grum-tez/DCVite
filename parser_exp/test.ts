import * as fs from 'fs';
import { Marked, Renderer } from '@ts-stack/markdown'; 

// Set options for the markdown parser
Marked.setOptions({
  renderer: new Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
});

// Read the content of the test.md file
const markdownContent = fs.readFileSync('parser_exp/test.md', 'utf8');

// Generate the markdown content
const htmlContent = Marked.parse(markdownContent);

// Generate the full HTML page
const htmlPage = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Your page title here</title>
    <link rel="stylesheet" href="test.css">
    <script src="script.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
  </head>
  <body>
  <div class="sidebar">
  <h2>Tests</h2>
  <p>tests</p>
  <!-- Add your test content here -->
</div>
    <header class="header">
      <div class="header-top">
        <a class="github-link" href="https://github.com/your-github-page">
          <i class="fab fa-github"></i>
        </a>
      </div>
      <div class="header-bottom">
        <h1 class="header-title">My Tutorial</h1>
        <p class="header-subtitle">Learn something new every day</p>
      </div>
    </header>
    <div class="container">
      ${htmlContent}
    </div>
    <footer class="footer">
      <p>&copy; 2023 My Tutorial. All rights reserved.</p>
    </footer>
  </body>
</html>
`;

// Write the HTML page to a file
fs.writeFileSync('parser_exp/out/test.html', htmlPage);
