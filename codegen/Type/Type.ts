import { pascalCase } from '@cbhq/cds-utils';

import { scaleConfig } from '../configs/scaleConfig';
import {
  typographyCss,
  typographyScaleMapWithCssVariables,
  typographyScaleMapForWeb,
  typographyPascalCaseConfig,
  typographyScaleMapForMobile,
} from './generateTypeStyles';

import {
  typographyScaleMapForMobile as typographyScaleMapForMobileBeta,
  typographyScaleMapWithCssVariables as typographyScaleMapWithCssVariablesBeta,
} from './generateTypeStylesBeta';

const mdTable = ([header, ...rows]: string[][]) => {
  const numCol = header.length;
  header.unshift('', '');
  header.push('');
  const divider = Array(numCol).fill('---');
  divider.unshift('');
  divider.push('');
  const tableBody = rows.map((row) => {
    row.unshift('');
    row.push('');
    return `${row.join(' | ')}`;
  });

  return `${header.join(' | ')}
  ${divider.join(' | ')}
  ${tableBody.join('\n')}
  `;
};

export const Type = {
  mobile: typographyScaleMapForMobile,
  mobileBeta: typographyScaleMapForMobileBeta,
  pascalCaseConfig: typographyPascalCaseConfig,
  css: typographyCss,
  scaleCss: typographyScaleMapWithCssVariables,
  scaleCssBeta: typographyScaleMapWithCssVariablesBeta,
  generateScaleTable: () => {
    // include type names
    const tableBody = Object.keys(typographyPascalCaseConfig).map((typeName) => [
      `\`${pascalCase(typeName)}\``,
    ]);
    // concat type styles with corresponding type name
    Object.values(typographyScaleMapForWeb).forEach((typeStylesAtScale) => {
      Object.values(typeStylesAtScale).forEach((style, index) =>
        tableBody[index].push(`${style['font-size']} / ${style['line-height']}`),
      );
    });

    return mdTable([
      Object.entries(scaleConfig).map(
        ([scale, offset]) => `${scale} (${offset > 0 ? `+${offset}` : offset})`,
      ),
      ...tableBody,
    ]);
  },
};
