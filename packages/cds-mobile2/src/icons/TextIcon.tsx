import React, { memo, useMemo } from 'react';
import { Animated, StyleProp, Text, TextStyle } from 'react-native';
import { IconName } from '@cbhq/cds-common2';
import { uiIconExceptions } from '@cbhq/cds-common2/internal/data/uiIconExceptions';
import glyphMap from '@cbhq/cds-icons/__generated__/glyphMap';
import { isDevelopment } from '@cbhq/cds-utils';

import { useTheme } from '../hooks/useTheme';

import { getIconSourceSize, IconProps } from './Icon';

export type TextIconProps = Pick<IconProps, 'color' | 'size' | 'testID'> & {
  name: IconName;
  active?: boolean;
} & (
    | {
        animated: true;
        style: Animated.WithAnimatedValue<StyleProp<TextStyle>>;
      }
    | {
        animated?: false | undefined;
        style?: StyleProp<TextStyle>;
      }
  );
/**
 *
 * This is a simplified, text-only version of the Icon component.
 * Nested text components need to all be RN Text and the Icon component has a box wrapper to handle border and badges.
 * Adheres to all the requirements for Nested Text on react native. https://reactnative.dev/docs/text#nested-text
 */
export const TextIcon = memo(function TextIcon({
  name,
  size = 'm',
  active,
  color = 'iconPrimary',
  animated,
  testID,
  style,
}: TextIconProps) {
  const theme = useTheme();
  const Component = animated ? Animated.Text : Text;
  const iconSize = theme.iconSize[size];
  const sourceSize = getIconSourceSize(iconSize);
  const iconColor = theme.color[color];

  const styles = useMemo(
    () =>
      [
        {
          fontFamily: 'CoinbaseIcons',
          fontSize: iconSize,
          color: iconColor,
        },
        style,
      ] as TextStyle,
    [style, iconColor, iconSize],
  );

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
    !!uiIconNameInExceptionList && uiIconNameInExceptionList in glyphMap
      ? uiIconNameInExceptionList
      : navIconName in glyphMap
      ? navIconName
      : uiIconNameWithSuffix in glyphMap && !name.includes('Active') // prevents icons with 'Active' in the name from being set 'inactive'
      ? uiIconNameWithSuffix
      : uiIconNameNoSuffixBase in glyphMap
      ? uiIconNameNoSuffixBase
      : undefined;

  if (iconName === undefined) {
    if (isDevelopment()) {
      // eslint-disable-next-line no-console
      console.error(
        `Unable to find Icon with name: ${name}. Full internal lookup name is ${iconName}`,
      );
    }
    return null;
  }

  const glyph = glyphMap[iconName as keyof typeof glyphMap];

  if (glyph) {
    return (
      <Component accessibilityRole="image" allowFontScaling={false} style={styles} testID={testID}>
        {glyph}
      </Component>
    );
  }
  return null;
});
