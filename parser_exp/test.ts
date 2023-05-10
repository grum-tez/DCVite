import * as fs from 'fs'
import { Marked, Renderer } from '@ts-stack/markdown'

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
})

// Read the content of the test.md file
const markdownContent = fs.readFileSync('parser_exp/test.md', 'utf8')

// Generate the markdown content
const htmlContent = Marked.parse(markdownContent)

// Generate the full HTML page
const htmlPage = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Your page title here</title>
    <link rel="stylesheet" href="test.css">
  </head>
  <body>
    ${htmlContent}
  </body>
</html>`

// Write the HTML page to a file
fs.writeFileSync('parser_exp/out/test.html', htmlPage)
