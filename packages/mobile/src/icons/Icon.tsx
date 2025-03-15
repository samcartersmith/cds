import React, { memo, useMemo } from 'react';
import { Animated, Text, TextStyle } from 'react-native';
import { useIconSize } from '@cbhq/cds-common/hooks/useIconSize';
import { uiIconExceptions } from '@cbhq/cds-common/internal/data/uiIconExceptions';
import type {
  IconBaseProps,
  PaletteForeground,
  SharedAccessibilityProps,
} from '@cbhq/cds-common/types';
import glyphMap from '@cbhq/cds-icons/__generated__/glyphMap';
import { isDevelopment } from '@cbhq/cds-utils';

import { usePalette } from '../hooks/usePalette';
import { useSpacingStyles } from '../hooks/useSpacingStyles';
import { Box } from '../layout/Box';
import type { DangerouslySetStyle } from '../types';

import { IconOutline } from './IconOutline';

export type IconProps = IconBaseProps & {
  /** Color of the icon when used as a foreground.
   * @default primary
   */
  color?: PaletteForeground;
  /** @danger This is a migration escape hatch. It is not intended to be used normally. */
  dangerouslySetColor?: string | Animated.AnimatedInterpolation<string>;
  /**
   * @deprecated Internal only: prop used to distinguish nav icons and to ensure backwards compatibility with new update
   */
  iconType?: string;
} & DangerouslySetStyle<TextStyle> &
  Pick<SharedAccessibilityProps, 'accessibilityLabel' | 'accessibilityHint'>;

export const Icon = memo(function Icon({
  accessibilityLabel,
  accessibilityHint,
  animated = false,
  bordered = false,
  color = 'primary',
  dangerouslySetColor,
  style,
  fallback = null,
  name,
  size = 'm',
  testID,
  spacing,
  spacingTop,
  spacingBottom,
  spacingStart,
  spacingEnd,
  spacingVertical,
  spacingHorizontal,
  active,
  iconType,
}: IconProps) {
  const TextComponent = animated ? Animated.Text : Text;
  const { wrapperSize, iconSize, sourceSize } = useIconSize(size, bordered);

  const iconColor = usePalette()[color];
  const finalColor = dangerouslySetColor ?? iconColor;

  const space = useSpacingStyles({
    spacing,
    spacingTop,
    spacingBottom,
    spacingStart,
    spacingEnd,
    spacingVertical,
    spacingHorizontal,
  });

  const boxStyles = useMemo(() => [space, style].filter(Boolean), [style, space]);

  const iconActiveString = active ? 'active' : 'inactive';
  const navIconName = `nav-${name}-${sourceSize}-${iconActiveString}`;

  const uiIconNameNoSuffixBase = `ui-${name}-${sourceSize}`;

  const uiIconNameWithSuffix = `${uiIconNameNoSuffixBase}-${iconActiveString}`;

  // Set the ui icon to be active as the ui icon is in exception list and has default (unfilled) state
  const uiIconNameInExceptionList = uiIconExceptions.includes(name)
    ? uiIconNameNoSuffixBase
    : undefined;

  // Some UI icons have Active or Inactive in their names. These icons must default to the state that their name implies.
  // In a future, major version we will introduce breaking changes that remove these names in favor of ones with the -active, -inactive suffixes.
  // Until then, icons with 'Active' in their name cannot be switched to the inactive state by using the active prop.
  // This is because the active prop is optional and thereby false by default.
  // However, we will allow icons with 'Inactive' in the name to be toggled to the active state with the prop.

  // Some UI icons do not have Active or Inactive in their name.
  // Some of these icons' default visual style is filled which violates the Icons2.0 design which mandates that all Icons default to inactive.
  // These Icons' names are listed in the uiIconExceptions.ts array
  // To preserve backwards compatibility, these icons cannot be made 'inactive' with the active prop and will always 'active' until we introduce breaking changes.

  // After the Icons2.0 revamp, we will have two states for every Icon svg. We must handle all cases.
  // The following pairs will exist:
  // 1. ui-visibleInactive-12, ui-visibleInactive-12-active
  // 2. ui-visibleActive-12, ui-visibleActive-12-inactive
  // 3. ui-info-12, ui-info-12-inactive (UI Icon Exceptions - but the -inactive is never used)
  // 4. ui-info-12, ui-info-12-active  (UI Icons that default to unfilled)

  /**
   *  Determine correct suffix and icon to use"
   *  1. Check UI Exceptions first (given a base name like bell, there can be a nav and ui version)
   *     Check if ui icon is in exception list and use it if the icon type is not a nav icon
   *
   *  2. Check nav icons (we prioritize nav icons over ui icons for anything outside the list of UI Icon Exceptions)
   *
   *  3. Check rest of UI icons
   *     Check if ui icon with suffix exists first (ie. ui-wallet-12-active, ui-visibleInactive-12-active, ui-visibleActive-12-inactive)
   *     For any icons with the Active suffix, we must not set the icon with the -inactive suffix and show the active default state. (ie. bookmarkActive cannot be marked as bookmarkActive-12-inactive)
   *     If doesn't exist, use base name with no suffix (ie. ui-info-12, ui-royaltyActive-12)
   *     If base doesn't exist, return undefined
   */
  const iconName =
    !!uiIconNameInExceptionList && iconType !== 'nav' && uiIconNameInExceptionList in glyphMap
      ? uiIconNameInExceptionList
      : navIconName in glyphMap
      ? navIconName
      : uiIconNameWithSuffix in glyphMap && !name.includes('Active') // prevents icons with 'Active' in the name from being set 'inactive'
      ? uiIconNameWithSuffix
      : uiIconNameNoSuffixBase in glyphMap
      ? uiIconNameNoSuffixBase
      : undefined;

  const fontStyles = useMemo(
    () => ({
      fontFamily: 'CoinbaseIcons',
      fontSize: iconSize,
      height: iconSize,
      width: iconSize,
      lineHeight: iconSize,
      color: finalColor,
    }),
    [finalColor, iconSize],
  );

  if (iconName === undefined) {
    if (isDevelopment()) {
      console.error(
        `Unable to find Icon with name: ${name}. Full internal lookup name is ${iconName}`,
      );
    }
    return fallback;
  }
  const glyph = glyphMap[iconName as keyof typeof glyphMap];

  return (
    <Box animated={animated} style={boxStyles} testID={testID}>
      <Box alignItems="center" height={wrapperSize} justifyContent="center" width={wrapperSize}>
        <TextComponent
          accessibilityHint={accessibilityHint}
          accessibilityLabel={accessibilityLabel}
          accessibilityRole="image"
          accessible={!!accessibilityLabel}
          allowFontScaling={false}
          style={fontStyles as TextStyle}
        >
          {glyph}
        </TextComponent>
        {bordered && (
          <IconOutline
            animated={animated}
            color={iconColor}
            size={wrapperSize}
            sourceSize={sourceSize}
          />
        )}
      </Box>
    </Box>
  );
});
