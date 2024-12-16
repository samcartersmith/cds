import React, { forwardRef, memo, useMemo } from 'react';
import { type LinariaClassName, css, cx } from '@linaria/core';
import type { NavIconName, NavIconNameInternal, UiIconName } from '@cbhq/cds-icons';
import glyphMap from '@cbhq/cds-icons/__generated__/glyphMap';

import { type BoxProps, Box } from '../layout/Box';

export type IconBaseProps = {
  /** Size for a given icon. */
  size: IconSize;
  /** Name of the icon, as defined in Figma. */
  name: IconName;
  /**
   * Fallback element to render if unable to find an icon with matching name
   * @default null
   * */
  /**
   * A boolean flag indicating whether or not a border should be shown around an icon.
   * This border will match color prop. Border is only allowed for sizes m and above.
   * @default false
   */
  bordered?: boolean;
  fallback?: null | React.ReactElement;
  /** @danger This is a migration escape hatch. It is not intended to be used normally. */
  dangerouslySetColor?: string;
};

export type IconProps = IconBaseProps & BoxProps<'div'>;

export type IconSize = 'xs' | 's' | 'm' | 'l';

/** The pixel dimensions of the icon's source file asset. */
export type IconAssetSize = 12 | 16 | 24;

export type IconName = UiIconName;
export type NavigationIconName = NavIconName;

export type NavigationIconInternalName = NavIconNameInternal;

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
    font-size: var(--iconSize-s);
  `,
  m: css`
    font-size: var(--iconSize-xs);
  `,
  l: css`
    font-size: var(--iconSize-s);
  `,
};

const sourceSizeMap: {
  [key in IconSize]: IconAssetSize;
} = {
  xs: 12,
  s: 12,
  m: 16,
  l: 24,
};

export const Icon = memo(
  forwardRef(
    (
      {
        accessibilityLabel,
        bordered = false,
        color = 'iconPrimary',
        dangerouslySetColor,
        fallback = null,
        name,
        size,
        testID,
        style,
        ...props
      }: IconProps,
      ref: React.Ref<HTMLElement>,
    ) => {
      const glyphTestId = testID ? `${testID}-glyph` : 'icon-base-glyph';

      const glyphKey = `ui-${name}-${sourceSizeMap[size]}` as const;
      const glyph = glyphMap[glyphKey];

      const inlineStyle = useMemo(
        () => ({
          ...(dangerouslySetColor ? { color: dangerouslySetColor } : {}),
          ...style,
        }),
        [dangerouslySetColor, style],
      );

      if (glyph === undefined) {
        if (process.env.NODE_ENV !== 'production')
          // eslint-disable-next-line no-console
          console.error(
            `Unable to find Icon with name: ${name}. Full internal lookup name is ${glyphKey}`,
          );
        return fallback;
      }

      return (
        <Box
          className={cx(sizeStyles[size], bordered && borderedSizeStyles[size])}
          color={color}
          position="relative" // TO DO: can we remove this?
          style={inlineStyle}
          testID={testID}
          {...props}
        >
          <span
            ref={ref}
            aria-hidden={!accessibilityLabel}
            aria-label={accessibilityLabel}
            className={iconStyles}
            data-icon-name={name}
            data-testid={glyphTestId}
            role="img"
            title={accessibilityLabel}
          >
            {glyph}
          </span>
        </Box>
      );
    },
  ),
);

Icon.displayName = 'Icon';
