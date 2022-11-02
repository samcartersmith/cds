import { CustomSet } from '../CustomSet';

describe('CustomSet', () => {
  it('asArray', async () => {
    const mockSet = new CustomSet(['foreground', 'foreground', 'background']);
    expect(mockSet.asArray).toEqual(['foreground', 'background']);
  });

  it('asSortedArray', async () => {
    const mockSet = new CustomSet(['foreground', 'foreground', 'background']);
    expect(mockSet.asSortedArray).toEqual(['background', 'foreground']);
  });
});
