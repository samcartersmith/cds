import { prettify } from '../../format';
import { typescriptTypesTemplate } from '../typescriptTypesTemplate';

describe('typescriptTypesTemplate template', () => {
  it('correctly creates union from an array of strings', async () => {
    const mockArray = ['orange', 'apple', 'pear'];
    const content = typescriptTypesTemplate`
      export type MockArray = ${mockArray};
    `;
    const prettifiedContent = await prettify(content, 'typescript');
    const expectedContent = `export type MockArray = 'apple' | 'orange' | 'pear';\n`;
    expect(prettifiedContent).toEqual(expectedContent);
  });

  it('correctly creates union from an array of numbers', async () => {
    const mockArray = [1, 2, 3];
    const content = typescriptTypesTemplate`
      export type MockArray = ${mockArray};
    `;
    const prettifiedContent = await prettify(content, 'typescript');
    const expectedContent = `export type MockArray = 1 | 2 | 3;\n`;
    expect(prettifiedContent).toEqual(expectedContent);
  });
});
