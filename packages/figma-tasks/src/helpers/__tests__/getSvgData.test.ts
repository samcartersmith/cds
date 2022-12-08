import { Node, NodeStyles } from '@cbhq/figma-api';

import { ColorStyles } from '../../tools/ColorStyles';
import { getSvgData } from '../getSvgData';

describe('getSvgData', () => {
  test('returns SVG data for the document', () => {
    const document = {
      name: 'Test Document',
      size: {
        x: 1000,
        y: 1000,
      },
      children: [
        {
          styles: {
            fill: 'Fill 1',
          },
          fillGeometry: [
            {
              path: 'Path 1',
              windingRule: 'NONZERO',
            },
          ],
        },
        {
          styles: {
            fill: 'Fill 2',
          },
          fillGeometry: [
            {
              path: 'Path 2',
              windingRule: 'EVENODD',
            },
          ],
        },
      ],
    } as unknown as Node;

    const styles = {
      'Fill 1': {
        name: 'Fill 1',
        type: 'SOLID',
        color: {
          r: 0.5,
          g: 0.5,
          b: 0.5,
          a: 1,
        },
      },
      'Fill 2': {
        name: 'Fill 2',
        type: 'SOLID',
        color: {
          r: 0.2,
          g: 0.2,
          b: 0.2,
          a: 1,
        },
      },
    } as unknown as NodeStyles;

    const colorStyles = {
      light: {
        nameMap: new Map([
          ['Fill 1', { fill: 'Light Fill 1 hex' }],
          ['Fill 2', { fill: 'Light Fill 2 hex' }],
        ]),
      },
      dark: {
        nameMap: new Map([
          ['Fill 1', { fill: 'Dark Fill 1 hex' }],
          ['Fill 2', { fill: 'Dark Fill 2 hex' }],
        ]),
      },
    } as ColorStyles;

    const expected = {
      name: 'Test Document',
      width: 1000,
      height: 1000,
      paths: [
        {
          d: 'Path 1',
          fill: 'Light Fill 1 hex',
          fillRule: 'nonzero',
        },
        {
          d: 'Path 2',
          fill: 'Light Fill 2 hex',
          fillRule: 'evenodd',
        },
      ],
      darkPaths: [
        {
          d: 'Path 1',
          fill: 'Dark Fill 1 hex',
          fillRule: 'nonzero',
        },
        {
          d: 'Path 2',
          fill: 'Dark Fill 2 hex',
          fillRule: 'evenodd',
        },
      ],
    };

    expect(getSvgData({ document, styles }, colorStyles)).toEqual(expected);
  });
});
