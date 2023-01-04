import { optimize } from 'svgo';
import { NodeResponseWithMetadata } from '@cbhq/figma-api';

import { ColorStyles } from '../../tools/ColorStyles';

import { getSvgData, SvgData } from './getSvgData';
import svgoConfig from './svgoConfig';

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

  const optimizedSvg = optimize(svgString, svgoConfig);
  if ('data' in optimizedSvg) {
    return optimizedSvg.data;
  }

  if ('modernError' in optimizedSvg) {
    console.log(optimizedSvg.modernError);
    throw new Error(`${name} is not valid svg`);
  }

  return svgString;
}

export function getSvgMarkup(node: NodeResponseWithMetadata, colorStyles?: ColorStyles): string {
  const params = getSvgData(node, colorStyles);
  return createSvgMarkup(params);
}
