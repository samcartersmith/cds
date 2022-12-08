import fs from 'node:fs';
import path from 'node:path';

import { PrettierParser, prettify } from '../format/prettify';

function getPrettierParser(file: string): PrettierParser {
  const ext = path.extname(file);
  switch (ext) {
    case '.md':
      return 'markdown';
    case '.mdx':
      return 'mdx';
    case '.js':
      return 'babel';
    case '.json':
      return 'json';
    case '.css':
      return 'css';
    case '.html':
    case '.svg':
      return 'html';
    default:
      return 'typescript';
  }
}

/**
 * Mirrors the native fs.promises.writeFile, but automatically applies prettier to
 * the content based on the extension of the destination.
 *
 * Optionally, you can override the prettier parser used by passing in a third argument.
 */
export async function writePrettyFile(dest: string, contents: string, parser?: PrettierParser) {
  const formattedContent = await prettify(contents, parser ?? getPrettierParser(dest));
  return fs.promises.writeFile(dest, formattedContent, 'utf-8');
}
