import * as ts from 'typescript';
import fs from 'fs';

export async function createAstSourceFile(filePath: string) {
  try {
    const fileContents = await fs.promises.readFile(filePath, 'utf8');
    return ts.createSourceFile(filePath, fileContents, ts.ScriptTarget.Latest, true);
  } catch (err) {
    throw new Error(`Could not read file ${filePath}`);
  }
}
