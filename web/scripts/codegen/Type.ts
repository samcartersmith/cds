import { DEFAULT_SCALE, scales } from '@cb/design-system-web/primitives/scale/scale';
import { typography } from '@cb/design-system-web/primitives/typography/typography';

import { generateTypeStyles } from './generateTypeStyles';

export const Type = {
  generateStylesForAllScales: () => generateTypeStyles(scales, typography),
  generateGenericStyles: () => {
    const stylesForAllScales = Type.generateStylesForAllScales();
    const genericTypeStyles: Record<string, Record<string, string>> = {};
    // Use style for a scale to extrapolate styles for each type using CSS variables
    for (const [typePascal, styles] of Object.entries(stylesForAllScales[DEFAULT_SCALE])) {
      const type = typePascal.toLowerCase();
      genericTypeStyles[type] = {};
      for (const attr of Object.keys(styles)) {
        genericTypeStyles[type][attr] = `var(--${type}-${attr})`;
      }
    }
    return {
      genericTypeStyles,
      allTypeStyles: stylesForAllScales,
    };
  },
  generateScaleTable: () => {
    const styles = Type.generateStylesForAllScales();

    // include type names
    const tableBody = Object.keys(typography).map(typeName => [`\`${typeName}\``]);
    // concat type styles with corresponding type name
    Object.values(styles).forEach(typeStylesAtScale => {
      Object.values(typeStylesAtScale).forEach((style, index) =>
        tableBody[index].push(`${style['font-size']} / ${style['line-height']}`)
      );
    });

    return mdTable([
      Object.entries(scales).map(
        ([scale, offset]) => `${scale} (${offset > 0 ? `+${offset}` : offset})`
      ),
      ...tableBody,
    ]);
  },
};

const mdTable = ([header, ...rows]: string[][]) => {
  const numCol = header.length;
  header.unshift('', '');
  header.push('');
  const divider = Array(numCol).fill('---');
  divider.unshift('');
  divider.push('');
  const tableBody = rows.map(row => {
    row.unshift('');
    row.push('');
    return `${row.join(' | ')}`;
  });

  return `${header.join(' | ')}
  ${divider.join(' | ')}
  ${tableBody.join('\n')}
  `;
};
