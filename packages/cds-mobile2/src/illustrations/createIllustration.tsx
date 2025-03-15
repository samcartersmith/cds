import React, { memo, useMemo } from 'react';
import { AccessibilityProps } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { IllustrationVariant } from '@cbhq/cds-common2';
import { IllustrationBaseProps } from '@cbhq/cds-common2/types/IllustrationProps';
import { convertDimensionToSize } from '@cbhq/cds-common2/utils/convertDimensionToSize';
import { convertSizeWithMultiplier } from '@cbhq/cds-common2/utils/convertSizeWithMultiplier';
import { getDefaultSizeObjectForIllustration } from '@cbhq/cds-common2/utils/getDefaultSizeObjectForIllustration';
import { isDevelopment } from '@cbhq/cds-utils';

import { useTheme } from '../hooks/useTheme';

type IllustrationConfigShape = Record<string, { light: () => string; dark: () => string }>;

export type IllustrationA11yProps = Pick<
  AccessibilityProps,
  'accessibilityLabel' | 'accessibilityHint'
>;

export type IllustrationBasePropsWithA11y<Type extends IllustrationVariant> =
  IllustrationBaseProps<Type> & IllustrationA11yProps;

export function createIllustration<
  Variant extends IllustrationVariant,
  Config extends IllustrationConfigShape,
>(variant: Variant, config: Config) {
  const defaultSize = getDefaultSizeObjectForIllustration(variant);

  type IllustrationProps = IllustrationBasePropsWithA11y<Variant>;

  const Illustration = memo(function Illustration({
    fallback = null,
    name,
    dimension,
    scaleMultiplier,
    testID,
    accessibilityHint,
    accessibilityLabel,
  }: IllustrationProps) {
    const { colorScheme } = useTheme();
    const requireFn = config[name]?.[colorScheme];

    const xml = useMemo(() => requireFn?.(), [requireFn]);

    const style = useMemo(() => {
      let size = defaultSize;
      if (dimension) {
        size = convertDimensionToSize(dimension);
      }
      if (scaleMultiplier) {
        size = convertSizeWithMultiplier(size, scaleMultiplier);
      }
      return size;
    }, [dimension, scaleMultiplier]);

    if (!xml) {
      if (isDevelopment()) {
        console.error(`Unable to find illustration with name: ${name}`);
      }
      return fallback;
    }

    return (
      <SvgXml
        accessibilityHint={accessibilityHint}
        accessibilityLabel={accessibilityLabel}
        accessibilityRole="image"
        accessible={!!accessibilityLabel}
        style={style}
        testID={testID}
        xml={xml}
      />
    );
  });

  Illustration.displayName = `Illustration`;
  return Illustration;
}
