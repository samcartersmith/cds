import fs from 'node:fs';
import * as ts from 'typescript';

export async function createAstSourceFile(filePath: string) {
  try {
    const fileContents = await fs.promises.readFile(filePath, 'utf8');
    return ts.createSourceFile(filePath, fileContents, ts.ScriptTarget.Latest, true);
  } catch {
    throw new Error(`Could not read file ${filePath}`);
  }
}
