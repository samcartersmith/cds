import React, { forwardRef, memo } from 'react';
import { type LinariaClassName, css, cx } from '@linaria/core';
import { SharedAccessibilityProps } from '@cbhq/cds-common/types/SharedAccessibilityProps';
import { SharedProps } from '@cbhq/cds-common/types/SharedProps';
import type { NavIconName, NavIconNameInternal, UiIconName } from '@cbhq/cds-icons';
import glyphMap from '@cbhq/cds-icons/__generated__/glyphMap';

import { type PolymorphicBoxProps, Box } from '../layout/Box';

export type IconDefaultElement = 'span';

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
};

export type IconProps<T extends React.ElementType = IconDefaultElement> = PolymorphicBoxProps<T> &
  IconBaseProps &
  SharedProps &
  Pick<SharedAccessibilityProps, 'accessibilityLabel'>;

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
    width: var(--size-icon-xs);
    height: var(--size-icon-xs);
    font-size: var(--size-icon-xs);
  `,
  s: css`
    width: var(--size-icon-s);
    height: var(--size-icon-s);
    font-size: var(--size-icon-s);
  `,
  m: css`
    width: var(--size-icon-m);
    height: var(--size-icon-m);
    font-size: var(--size-icon-m);
  `,
  l: css`
    width: var(--size-icon-l);
    height: var(--size-icon-l);
    font-size: var(--size-icon-l);
  `,
};

const borderedSizeStyles: {
  [key in IconSize]: LinariaClassName;
} = {
  xs: css`
    font-size: var(--size-icon-xs);
  `,
  s: css`
    font-size: var(--size-icon-s);
  `,
  m: css`
    font-size: var(--size-icon-xs);
  `,
  l: css`
    font-size: var(--size-icon-s);
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
    // @ts-expect-error TO DO: fix this
    <T extends React.ElementType = IconDefaultElement>(
      {
        accessibilityLabel,
        bordered = false,
        color = 'iconPrimary',
        fallback = null,
        name,
        size,
        testID,
        ...props
      }: IconProps<T>,
      ref: React.Ref<HTMLElement>,
    ) => {
      const glyphTestId = testID ? `${testID}-glyph` : 'icon-base-glyph';

      const glyphKey = `ui-${name}-${sourceSizeMap[size]}` as const;
      const glyph = glyphMap[glyphKey];

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
          {...props}
          data-testid={testID}
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
