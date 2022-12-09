import { prettify } from '../../format';
import { tokensTemplate } from '../tokensTemplate';

describe('tokensTemplate', () => {
  it('correctly formats a Map to sorted object', async () => {
    const mockData = new Map([
      ['foreground', 'foreground_id'],
      ['background', 'background_id'],
    ]);

    const mockContent = tokensTemplate`
      export const lightStyles = ${mockData};
    `;
    const prettifiedContent = await prettify(mockContent, 'typescript');
    const expectedContent = `export const lightStyles = { background: 'background_id', foreground: 'foreground_id' };\n`;
    expect(prettifiedContent).toEqual(expectedContent);
  });
  it('correctly formats a Set to sorted array', async () => {
    const mockData = new Set(['foreground', 'foreground', 'background']);

    const mockContent = tokensTemplate`
      export const paletteNames = ${mockData};
    `;
    const prettifiedContent = await prettify(mockContent, 'typescript');
    const expectedContent = `export const paletteNames = ['background', 'foreground'];\n`;
    expect(prettifiedContent).toEqual(expectedContent);
  });
  it('correctly formats an array to a sorted array', async () => {
    const mockData = ['foreground', 'foreground', 'background'];

    const mockContent = tokensTemplate`
      export const paletteNames = ${mockData};
    `;
    const prettifiedContent = await prettify(mockContent, 'typescript');
    const expectedContent = `export const paletteNames = ['background', 'foreground', 'foreground'];\n`;
    expect(prettifiedContent).toEqual(expectedContent);
  });
  it('correctly formats an object to a sorted object', async () => {
    const mockData = {
      foreground: 'foreground_id',
      background: 'background_id',
    };

    const mockContent = tokensTemplate`
      export const lightStyles = ${mockData};
    `;
    const prettifiedContent = await prettify(mockContent, 'typescript');
    const expectedContent = `export const lightStyles = { background: 'background_id', foreground: 'foreground_id' };\n`;
    expect(prettifiedContent).toEqual(expectedContent);
  });
  it('correctly formats an object with an inline function', async () => {
    const mockData = {
      heroSquareSvg: `() => require('./hero-symbolSquare.svg')`,
    };

    const mockContent = tokensTemplate`
      export const svgsMap = ${mockData};
    `;
    const prettifiedContent = await prettify(mockContent, 'typescript');
    const expectedContent = `export const svgsMap = { heroSquareSvg: () => require('./hero-symbolSquare.svg') };\n`;
    expect(prettifiedContent).toEqual(expectedContent);
  });

  it('correctly handles kebab case keys', async () => {
    const mockData = {
      'hero-square-svg': `() => require('./hero-symbolSquare.svg')`,
    };

    const mockContent = tokensTemplate`
      export const svgsMap = ${mockData};
    `;
    const prettifiedContent = await prettify(mockContent, 'typescript');
    const expectedContent = `export const svgsMap = { 'hero-square-svg': () => require('./hero-symbolSquare.svg') };\n`;
    expect(prettifiedContent).toEqual(expectedContent);
  });
  it('correctly formats a template with as const', async () => {
    const mockData = [
      {
        name: 'john doe',
        key: 'some_key',
      },
    ];

    const mockContent = tokensTemplate`
      export const nameToKeyMap = ${Object.fromEntries(
        mockData.map((item) => [item.name, item.key]),
      )} as const;
    `;
    const prettifiedContent = await prettify(mockContent, 'typescript');
    const expectedContent = `export const nameToKeyMap = { 'john doe': 'some_key' } as const;\n`;
    expect(prettifiedContent).toEqual(expectedContent);
  });
});
