import { downloadImage } from '@cbhq/figma-api';

import { getRemoteSvg } from '../getRemoteSvg';

jest.mock('@cbhq/figma-api', () => ({
  downloadImage: jest.fn(),
}));

describe('getRemoteSvg', () => {
  test('getRemoteSvg returns the SVG content for the given id', async () => {
    const expected = '<svg>...</svg>';

    (downloadImage as jest.Mock).mockResolvedValue(expected);

    const result = await getRemoteSvg('https://example.com/1.svg');
    expect(result).toEqual(expected);
  });

  test('getRemoteSvg throws an error if the SVG cannot be downloaded', async () => {
    (downloadImage as jest.Mock).mockRejectedValue(new Error('Download failed'));

    await expect(getRemoteSvg('https://example.com/1.svg')).rejects.toThrow('Download failed');
  });
});
