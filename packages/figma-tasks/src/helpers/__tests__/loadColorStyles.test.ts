import { Task } from '@cbhq/mono-tasks';

import { createMockTask } from '../../__fixtures__/createMockTask';
import { ColorStyle } from '../../tools/ColorStyle';
import { ColorStyleManifestType, ColorStyles } from '../../tools/ColorStyles';
import { Manifest, ManifestShape } from '../../tools/Manifest';
import { loadColorStyles, LoadColorStylesTaskOptions } from '../loadColorStyles';

describe('loadColorStyles', () => {
  it('should load the dark and light color styles when both are provided', async () => {
    const mockTask: Task<LoadColorStylesTaskOptions> = createMockTask({
      targetName: 'sync-illustrations',
      options: {
        lightModeManifestFile: 'light-file.json',
        darkModeManifestFile: 'dark-file.json',
        manifestVersioning: false,
      },
    });

    const mockDark = new Manifest<ColorStyleManifestType>({
      filePath: '',
      task: mockTask,
      previousManifest: {
        metadata: { lastUpdated: '' },
        items: [
          [
            '2:25',
            {
              key: 'be3e3bd2911fc0f0a72c734c7151ba79ecf27b47',
              name: 'primary',
              type: 'dark',
              fill: '#588AF5',
              cssVarSetter: '--illustration-primary',
              cssVarGetter: 'var(--illustration-primary)',
            },
          ],
          [
            '2:26',
            {
              key: '5c08db6b126da225319e68fd2fc8a42a57b2f4ed',
              name: 'black',
              type: 'dark',
              fill: '#0A0B0D',
              cssVarSetter: '--illustration-black',
              cssVarGetter: 'var(--illustration-black)',
            },
          ],
        ],
      } as unknown as ManifestShape<ColorStyle>,
    });

    const mockLight = new Manifest({
      filePath: '',
      task: mockTask,
      previousManifest: {
        metadata: { lastUpdated: '' },
        items: [
          [
            '2:43',
            {
              key: '882bbfed6181d5769683efc3c76ac1c1b06fd709',
              name: 'positive',
              type: 'light',
              fill: '#00D17F',
              cssVarSetter: '--illustration-positive',
              cssVarGetter: 'var(--illustration-positive)',
            },
          ],
          [
            '2:40',
            {
              key: '3a6d095966594e4318e8142c9c298199d29598bc',
              name: 'black',
              type: 'light',
              fill: '#0A0B0D',
              cssVarSetter: '--illustration-black',
              cssVarGetter: 'var(--illustration-black)',
            },
          ],
        ],
      } as unknown as ManifestShape<ColorStyle>,
    });

    jest
      .spyOn(Manifest, 'init')
      .mockImplementationOnce(async () => Promise.resolve(mockDark))
      .mockImplementationOnce(async () => Promise.resolve(mockLight));

    const result = await loadColorStyles(mockTask);
    const expected = new ColorStyles({
      dark: mockDark,
      light: mockLight,
    });

    expect(result).toEqual(expected);
  });

  it('should return undefined if no light or dark color styles are provided', async () => {
    const mockTask: Task<LoadColorStylesTaskOptions> = createMockTask({
      targetName: 'sync-illustrations',
      options: {
        lightModeManifestFile: undefined,
        darkModeManifestFile: undefined,
        manifestVersioning: false,
      },
    });

    const result = await loadColorStyles(mockTask);
    expect(result).toBeUndefined();
  });
});
