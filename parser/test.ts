import * as fs from 'fs';
import { Marked, Renderer, MarkedOptions } from '@ts-stack/markdown'; 
const SHELLFILENAME = "postCreate.sh";
fs.writeFileSync(SHELLFILENAME, "")

function escapeHtml(html: string) {
  return html.replace(/[&<>"']/g, (match) => {
    switch (match) {
      case '&':
        return '&';
      case '<':
        return '<';
      case '>':
        return '>';
      case '"':
        return '"';
      case "'":
        return '';
      default:
        return match;
    }
  });
}

class CustomRenderer extends Renderer 
{
  protected options: MarkedOptions
  constructor(options?: MarkedOptions) {
    
    super(options); // Call the base class constructor
    this.options = options || Marked.options;
  }

  code(code: string, lang?: string, escaped?: boolean, meta?: string): string;

  code(code: string, lang?: string, escaped?: boolean, meta?: string): string {
    console.log("escaped before: ", escaped)
    
    if (this.options.highlight) {
      const out = this.options.highlight(code, lang);

      if (out != null && out !== code) {
        escaped = true;
        code = out;
      }
    }

    console.log("lang: ", lang)
    console.log("escaped after: ", escaped)
    console.log("meta: ", meta)

    const escaper = this.options.escape !== undefined ? this.options.escape : escapeHtml
    
    const escapedCode = (escaped ? code : escaper(code, true));
    
    type validMeta = "show-run" | "hide-run" | "show" | "hide"
    
    function isValidMeta(meta: string | undefined): meta is validMeta {
      if (meta === undefined) return false
      const isValid = ["show-run", "hide-run", "show", "hide"].includes(meta);
      console.log("Meta Valid? :", isValid)
      return isValid
    }

    function processMeta(str?: string) {
      const regex = /^[a-zA-Z]+\s([a-zA-Z]+-?[a-zA-Z]*)$/;
      if(str === undefined) return undefined
      const match = str.match(regex);
      if (match) {
        return match[1];
      } else {
        return undefined;
      }
    }
    
    const processed = processMeta(meta)
    const iVM = isValidMeta(processed)
    console.log("processed meta: ", processed)
  
    if (!iVM) return `<h2>INVALID META ARGUMENT FOR CODE BLOCK.</h2>\n<p>META INPUT: ${meta} </p>`

    function getShowRun(processed: string): Array<Boolean> {

      switch (processed) {
        case "show-run":
          console.log("Processing 'show-run' meta");
          return [true,true]
          break;
        case "hide-run":
          console.log("Processing 'hide-run' meta");
          return [false, true]
          break;
        case "show":
          console.log("Processing 'show' meta");
          return [true, false]
          break;
        case "hide":
          console.log("Processing 'hide' meta");
          return [false, false]
          break;
        default:
          console.log("Invalid meta, treating as 'hide'");
          return [false, false]
          break;
      }

    }
      const [show, run] = getShowRun(processed)

      function splitTextIntoLines(text: string): string[] {
        const lines = text.split(/\r?\n/);
        const lastLineIndex = lines.length - 1;
        return lines.map((line, index) => {
          const isLastLine = index === lastLineIndex;
          const lineEnding = isLastLine ? "" : "\/";
          return index === 0 ? line + lineEnding : "&& " + line + lineEnding;
        });
      }


      function appendTextToFile(lines: string[], fileName: string): void {
        const fileExists = fs.existsSync(fileName);
      
        if (!fileExists) fs.writeFileSync(fileName, "#!/bin/bash\n");

      
        let fileContent = fs.readFileSync(fileName, "utf-8");
        if (fileContent === "") fs.writeFileSync(fileName, "#!/bin/bash\n");
        
        fileContent = fs.readFileSync(fileName, "utf-8");
        
        if (fileContent === "#!/bin/bash\n") {
          fs.appendFileSync(fileName, lines.join("\n"));
          console.log(`File content is: ${fileContent}` )
        } else {
          console.log("File content is not #!/bin/bash\n")
          console.log("Instead, file content is: ", fileContent)
          fs.appendFileSync(fileName, " / \n&& " + lines.join("\n"));
        }
      }
      

    if (run) {
      console.log("code:")
      const lines = splitTextIntoLines(code)
      appendTextToFile(lines, SHELLFILENAME)
    }
    const showString = show ? "" : "style=display:none"


    if (!lang) {
      return `\n<pre><code ${showString}>${escapedCode}\n</code></pre>\n`;
    }

    const className = this.options.langPrefix + escaper(lang, true);
    return `\n<pre><code ${showString} class="${className}">${escapedCode}\n</code></pre>\n`;
  }
}

Marked.setOptions({
  renderer: new CustomRenderer,
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false
});

// Read the content of the test.md file
const markdownContent = fs.readFileSync('test.md', 'utf8');


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
fs.writeFileSync('out/test.html', htmlPage);