import fs from 'fs';
import path from 'path';

import { ASTParser } from '../ASTParser';

describe('ASTParser', () => {
  const dummyFilePath = path.join(__dirname, 'dummyFile.ts');

  beforeEach(() => {
    fs.writeFileSync(
      dummyFilePath,
      `
      it('passes a11y', () => {
        render(<MockAccordion />);
    
        expect(screen.getByTestId('mock-accordion-item1-header')).toBeAccessible();
      });
    `,
    );
  });

  afterEach(() => {
    fs.unlinkSync(dummyFilePath);
  });

  it('should return a SourceFile for a valid file name', () => {
    const parser = new ASTParser([dummyFilePath]);
    const sourceFile = parser.fileNameToSourceFile(dummyFilePath);
    expect(sourceFile).toBeDefined();
    expect(sourceFile.fileName).toBe(dummyFilePath);
  });

  it('should throw an error for an invalid file name', () => {
    const parser = new ASTParser([dummyFilePath]);
    expect(() => parser.fileNameToSourceFile('nonexistent.ts')).toThrow(
      'Source file is undefined. Nothing to traverse through',
    );
  });

  it('should find the render identifier in the file', () => {
    const parser = new ASTParser([dummyFilePath]);
    const view = parser.hasRenderIdentifier(dummyFilePath);
    expect(view).toBe(true);
  });

  it('should find the toBeAccessible identifier in the file', () => {
    const parser = new ASTParser([dummyFilePath]);
    const hasToBeAccessible = parser.hasToBeAccessible(dummyFilePath);
    expect(hasToBeAccessible).toBe(true);
  });
});
