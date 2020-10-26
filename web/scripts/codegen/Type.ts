import { DEFAULT_SCALE, scales } from '@cb/design-system-web/primitives/scale/scale';
import { generateTypeStyles } from '@cb/design-system-web/primitives/typography/generateTypeStyles';
import { typography } from '@cb/design-system-web/primitives/typography/typography';

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
};
