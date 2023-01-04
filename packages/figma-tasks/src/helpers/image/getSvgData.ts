import { NodeResponseWithMetadata } from '@cbhq/figma-api';

import type { ColorStyles } from '../../tools/ColorStyles';
import { getFillFromNode } from '../getFillFromNode';
import { getSize } from '../getSize';

type PathFillRule = 'nonzero' | 'evenodd';

export type Path = {
  d: string;
  fill?: string;
  fillRule: PathFillRule;
};

export type SvgData = {
  name?: string;
  width: number;
  height: number;
  paths: Path[];
};

export function getSvgData(
  { document, styles = {} }: NodeResponseWithMetadata,
  colorStyles?: ColorStyles,
): SvgData {
  const paths: Path[] = [];

  const { width, height } = getSize(document);

  if ('children' in document) {
    document.children.forEach((child) => {
      let fill: string | undefined;

      if ('styles' in child && child.styles !== undefined && 'fill' in child.styles) {
        const matchingStyle = styles[child.styles.fill];
        // lookup color style
        if (matchingStyle && colorStyles) {
          const match = colorStyles.light.nameMap.get(matchingStyle.name);
          if (match) {
            fill = match.fill;
          }
        }
        // convert fill directly
        if (fill === undefined) {
          fill = getFillFromNode(child);
        }
      }
      if ('fillGeometry' in child && child.fillGeometry !== undefined) {
        child.fillGeometry.forEach((geometry) => {
          const shared = {
            d: geometry.path,
            fillRule: geometry.windingRule.toLowerCase() as PathFillRule,
          };

          paths.push({
            ...shared,
            fill,
          });
        });
      }
    });
  }

  return {
    name: document.name,
    width,
    height,
    paths,
  };
}
