import { parseName } from '../parseName';

describe('parseName', () => {
  it('should parse the type and name from the node name', () => {
    const node = {
      document: {
        name: 'ui/close',
      },
    };

    const expected = {
      type: 'ui',
      name: 'close',
    };
    const result = parseName(node);

    expect(result).toEqual(expected);
  });

  it('should throw an error if the node name is not in the correct format', () => {
    const node = {
      document: {
        name: 'close',
      },
    };

    expect(() => parseName(node)).toThrow('close needs to use the format [type]/[name] format');
  });
});
