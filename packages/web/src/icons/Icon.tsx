import React, { forwardRef, memo, useMemo } from 'react';
import { css, cx, type LinariaClassName } from '@linaria/core';
import { uiIconExceptions } from '@cbhq/cds-common/internal/data/uiIconExceptions';
import type { IconName, SharedProps, ValidateProps } from '@cbhq/cds-common/types';
import type { IconSize, IconSourcePixelSize } from '@cbhq/cds-common/types/IconSize';
import glyphMap from '@cbhq/cds-icons/__generated__/glyphMap';
import { isDevelopment } from '@cbhq/cds-utils/env';

import { useTheme } from '../hooks/useTheme';
import { Box, type BoxBaseProps, type BoxDefaultElement, type BoxProps } from '../layout/Box';

export type IconBaseProps = SharedProps &
  Pick<
    BoxBaseProps,
    | 'padding'
    | 'paddingX'
    | 'paddingY'
    | 'paddingTop'
    | 'paddingEnd'
    | 'paddingBottom'
    | 'paddingStart'
  > & {
    /**
     * Size for a given icon.
     * @default m
     */
    size?: IconSize;
    /** Name of the icon, as defined in Figma. */
    name: IconName;
    /**
     * A boolean flag indicating whether or not a border should be shown around an icon.
     * This border will match color prop. Border is only allowed for sizes m and above.
     * @default false
     */
    bordered?: boolean;
    /**
     * Fallback element to render if unable to find an icon with matching name
     * @default null
     * */
    fallback?: null | React.ReactNode;
    /**
     * Toggles the active and inactive state of the navigation icon
     * @default false
     */
    active?: boolean;
    /** @danger This is a migration escape hatch. It is not intended to be used normally. */
    dangerouslySetColor?: string;
    /**
     * @deprecated Internal only: prop used to distinguish nav icons and to ensure backwards compatibility with new update
     */
    iconType?: string;
  };

export type IconProps = IconBaseProps &
  BoxProps<BoxDefaultElement> & {
    styles?: {
      /** TO DO: Document this prop */
      root?: React.CSSProperties;
      /** TO DO: Document this prop */
      icon?: React.CSSProperties;
    };
    classNames?: {
      /** TO DO: Document this prop */
      root?: string;
      /** TO DO: Document this prop */
      icon?: string;
    };
  };

export const iconStyles = css`
  color: currentColor;
  font-family: 'CoinbaseIcons';
  font-weight: 400;
  font-style: normal;
  font-variant: normal;
  text-rendering: auto;
  line-height: 1;
  flex-shrink: 0;
  display: block;
  text-decoration: none;

  > * {
    transition: fill 150ms ease-in-out;
  }
`;
const sizeStyles: {
  [key in IconSize]: LinariaClassName;
} = {
  xs: css`
    width: var(--iconSize-xs);
    height: var(--iconSize-xs);
    font-size: var(--iconSize-xs);
  `,
  s: css`
    width: var(--iconSize-s);
    height: var(--iconSize-s);
    font-size: var(--iconSize-s);
  `,
  m: css`
    width: var(--iconSize-m);
    height: var(--iconSize-m);
    font-size: var(--iconSize-m);
  `,
  l: css`
    width: var(--iconSize-l);
    height: var(--iconSize-l);
    font-size: var(--iconSize-l);
  `,
};

const borderedSizeStyles: {
  [key in IconSize]: LinariaClassName;
} = {
  xs: css`
    font-size: var(--iconSize-xs);
  `,
  s: css`
    font-size: var(--iconSize-xs);
  `,
  m: css`
    font-size: var(--iconSize-xs);
  `,
  l: css`
    font-size: var(--iconSize-s);
  `,
};

export const getIconSourceSize = (iconSize: number): IconSourcePixelSize => {
  if (iconSize <= 12) return 12;
  if (iconSize <= 16) return 16;
  return 24;
};

export const Icon = memo(
  forwardRef(
    (
      {
        accessibilityLabel,
        bordered = false,
        color = 'fgPrimary',
        dangerouslySetColor,
        fallback = null,
        name,
        size = 'm',
        testID,
        className,
        classNames,
        style,
        styles,
        active,
        iconType,
        ...props
      }: IconProps,
      ref: React.Ref<HTMLElement>,
    ) => {
      const theme = useTheme();

      const iconSize = theme.iconSize[size];
      const sourceSize = getIconSourceSize(iconSize);

      const rootStyle = useMemo(
        () => ({
          ...(dangerouslySetColor ? { color: dangerouslySetColor } : {}),
          ...style,
          ...styles?.root,
        }),
        [dangerouslySetColor, style, styles?.root],
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
        !!uiIconNameInExceptionList && iconType !== 'nav' && uiIconNameInExceptionList in glyphMap
          ? uiIconNameInExceptionList // UI Icon exceptions will always be active (no trailing suffix)
          : navIconName in glyphMap
          ? navIconName
          : uiIconNameWithSuffix in glyphMap && !name.includes('Active') // prevents icons with 'Active' in the name from being set 'inactive'
          ? uiIconNameWithSuffix
          : uiIconNameNoSuffixBase in glyphMap
          ? uiIconNameNoSuffixBase
          : undefined;

      if (iconName === undefined) {
        if (isDevelopment()) {
          console.error(
            `Unable to find Icon with name: ${name}. Full internal lookup name is ${iconName}`,
          );
        }
        return fallback;
      }

      const glyph = glyphMap[iconName as keyof typeof glyphMap];
      const glyphTestId = testID ? `${testID}-glyph` : 'icon-base-glyph';

      return (
        <Box
          className={cx(className, classNames?.root)}
          color={color}
          position="relative"
          style={rootStyle}
          testID={testID}
          {...(props satisfies ValidateProps<
            typeof props,
            Omit<IconProps, keyof BoxProps<BoxDefaultElement>>
          >)}
        >
          <span
            ref={ref}
            aria-hidden={!accessibilityLabel}
            aria-label={accessibilityLabel}
            className={cx(
              iconStyles,
              sizeStyles[size],
              bordered && borderedSizeStyles[size],
              classNames?.icon,
            )}
            data-icon-name={name}
            data-testid={glyphTestId}
            role="img"
            style={styles?.icon}
            title={accessibilityLabel}
            translate="no"
          >
            {glyph}
          </span>
        </Box>
      );
    },
  ),
);

Icon.displayName = 'Icon';
