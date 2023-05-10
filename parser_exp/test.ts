import { Marked, Renderer } from '@ts-stack/markdown'
import { readFileSync, writeFileSync } from 'fs'

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

const markdown = readFileSync('test.md', 'utf-8')
const html = Marked.parse(markdown)
writeFileSync('test.html', html)
