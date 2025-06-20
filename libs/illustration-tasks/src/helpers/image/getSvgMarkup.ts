import { NodeResponseWithMetadata } from '@cbhq/figma-api';

import { ColorStyles } from '../../tools/ColorStyles';

import { getSvgData, SvgData } from './getSvgData';
import { optimizeSvg } from './optimizeSvg';

export type SvgMarkup = {
  light: string;
  dark?: string;
  themeable?: string;
};

function createSvgMarkup({ width, height, paths }: Omit<SvgData, 'darkPaths'>) {
  const svgString = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 ${width} ${height}">
  ${paths
    .map((path) => {
      return `<path fill="${path.fill}" d="${path.d}" fill-rule="${path.fillRule}" />`;
    })
    .join('\n')}
  </svg>`;

  return optimizeSvg(svgString);
}

export function getSvgMarkup(node: NodeResponseWithMetadata, colorStyles?: ColorStyles): string {
  const params = getSvgData(node, colorStyles);
  return createSvgMarkup(params);
}
