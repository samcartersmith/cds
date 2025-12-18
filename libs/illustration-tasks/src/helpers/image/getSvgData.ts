import type { ChildNode, NodeWithMetadata, PathGeometry } from '../fetchIllustrationLibrary';

import type { ColorStyles } from '../../tools/ColorStyles';
import { getPaintFromNode } from '../getPaintFromNode';
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
  { document, styles = {} }: NodeWithMetadata,
  colorStyles?: ColorStyles,
): SvgData {
  const paths: Path[] = [];

  const { width, height } = getSize(document);

  if ('children' in document) {
    document.children.forEach((child: ChildNode) => {
      let fill: string | undefined;

      if ('styles' in child && child.styles !== undefined && 'fill' in child.styles) {
        const matchingStyle = styles[child.styles.fill];
        // lookup color style
        if (matchingStyle && colorStyles) {
          const match = colorStyles.light.nameMap.get(matchingStyle.name);
          if (match?.paint.type === 'solid') {
            fill = match.paint.value;
          }
        }
        // convert fill directly
        if (fill === undefined) {
          const paint = getPaintFromNode(child);
          if (paint?.type === 'solid') {
            fill = paint.value;
          }
        }
      }
      if ('fillGeometry' in child && child.fillGeometry !== undefined) {
        child.fillGeometry.forEach((geometry: PathGeometry) => {
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
