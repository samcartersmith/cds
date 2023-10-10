import { prettify } from '../prettify';

describe('prettifies', () => {
  it('incorrect object formatting', async () => {
    const mockContent = `const data = {hi: 'hello'}`;
    const prettified = `const data = { hi: 'hello' };\n`;
    expect(await prettify(mockContent, 'typescript')).toEqual(prettified);
  });
  it('incorrect tabbing and returns', async () => {
    const mockContent = `
              
        const data = 'hello';
              
    `;
    const prettified = `const data = 'hello';\n`;
    expect(await prettify(mockContent, 'typescript')).toEqual(prettified);
  });
});
