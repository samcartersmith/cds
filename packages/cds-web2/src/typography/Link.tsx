import React, { forwardRef, memo, useRef } from 'react';
import { css, cx } from '@linaria/core';
import { useMergeRefs } from '@cbhq/cds-common2/hooks/useMergeRefs';

import type { Polymorphic } from '../core/polymorphism';
import { Pressable, type PressableBaseProps } from '../system/Pressable';

import { Text } from './Text';

export const linkDefaultElement = 'a';

export type LinkDefaultElement = typeof linkDefaultElement;

export type LinkBaseProps = Polymorphic.ExtendableProps<
  Omit<PressableBaseProps, 'color' | 'background'>,
  {
    /**
     * Color of the Link
     * @default 'fgPrimary'
     */
    color?: PressableBaseProps['color'];
    /**
     * Background color of the Link
     * @default 'transparent'
     */
    background?: PressableBaseProps['background'];
    /**
     * Determines whether the link opens in a new window.
     * - `true`: Opens the link in a new window.
     * - `false`: Replaces the current screen with the link.
     *
     * This prop is only applicable when rendering the `Link` as an anchor (`as="a"`).
     * @default false
     */
    openInNewWindow?: boolean;
    /** Use CoinbaseMono font */
    mono?: boolean;
    /**
     * Set text decoration to underline.
     * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration)
     */
    underline?: boolean;
  }
>;

export type LinkProps<AsComponent extends React.ElementType> = Polymorphic.Props<
  AsComponent,
  LinkBaseProps
>;

type LinkComponent = (<AsComponent extends React.ElementType = LinkDefaultElement>(
  props: LinkProps<AsComponent>,
) => Polymorphic.ReactReturn) &
  Polymorphic.ReactNamed;

const baseStyle = css`
  cursor: pointer;

  // remove Pressable opacity styles
  &:hover,
  &:active,
  &[data-active='true'],
  &[data-loading='true'] {
    > * {
      opacity: 1;
    }
  }

  &:focus-visible {
    outline-offset: 0;
    border-radius: var(--borderRadius-100);
  }
`;

export const Link: LinkComponent = memo(
  forwardRef<React.ReactElement<LinkBaseProps>, LinkBaseProps>(
    <AsComponent extends React.ElementType>(
      {
        renderContainer,
        // Text props
        children,
        color = 'fgPrimary',
        font = 'inherit',
        mono,
        underline,
        // Pressable props
        as,
        background = 'transparent',
        className,
        display = 'inline-flex',
        borderWidth = 0,
        margin = 0,
        padding = 0,
        noScaleOnPress = true,
        openInNewWindow = false,
        ...props
      }: LinkProps<AsComponent>,
      ref?: Polymorphic.Ref<AsComponent>,
    ) => {
      const Component = (as ?? linkDefaultElement) satisfies React.ElementType;
      const isAnchor = Component === 'a';

      const linkRef = useRef(null);
      const mergedRef = useMergeRefs(ref, linkRef);

      return (
        <Pressable
          ref={mergedRef}
          as={Component}
          background={background}
          borderWidth={borderWidth}
          className={cx(baseStyle, className)}
          color={color}
          display={display}
          margin={margin}
          noScaleOnPress={noScaleOnPress}
          padding={padding}
          target={isAnchor && openInNewWindow ? '_blank' : undefined}
          {...props}
        >
          <Text as="span" color="currentColor" font={font} mono={mono} underline={underline}>
            {children}
          </Text>
        </Pressable>
      );
    },
  ),
);
