import fs from 'node:fs';
import { writePrettyFile } from '@cbhq/script-utils';

import { createMockComponentNode } from '../../__fixtures__/createMockComponentNode';
import { Component } from '../../tools/Component';
import { generateTypes } from '../generateTypes';

jest.mock('@cbhq/script-utils', () => ({
  ...jest.requireActual<Record<string, unknown>>('@cbhq/script-utils'),
  writePrettyFile: jest.fn().mockResolvedValue(undefined),
}));

describe('generateTypes', () => {
  jest.spyOn(fs, 'existsSync').mockReturnValue(true);

  test('generateTypes creates correct TypeScript types', async () => {
    const data = [
      {
        id: '1:123',
        name: 'accountUnderReview',
        description: '',
        height: 240,
        width: 240,
        type: 'heroSquare',
        node: createMockComponentNode({
          id: '1:123',
          name: 'Hero Square/accountUnderReview',
        }),
      },
    ];

    const items = data.map((item) => new Component(item));
    await generateTypes(items, { outputDir: 'doesnt-matter' });
    expect(writePrettyFile).toHaveBeenCalledWith(
      'doesnt-matter/HeroSquare.ts',
      `
        export type HeroSquare = 'accountUnderReview';
      `,
    );
  });
});
