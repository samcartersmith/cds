import React, { forwardRef, memo, useCallback, useMemo, useRef } from 'react';
import { css, cx } from '@linaria/core';
import { useMergeRefs } from '@cbhq/cds-common2/hooks/useMergeRefs';

import { type TextProps, Text } from './Text';

export type LinkBaseProps = {
  /** URL that this link goes to when pressed. */
  to?: string;
  /**
   * If true, it opens the link in a new window.
   * If false, it replaces the current screen with the link
   * @default false
   */
  openInNewWindow?: boolean;
  /** Callback for custom Link component */
  renderContainer?: (props: React.HTMLAttributes<HTMLAnchorElement>) => JSX.Element;
  /**
   * Set text decoration to underline.
   * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration) | [React Native Docs](https://reactnative.dev/docs/text-style-props#textdecorationline)
   * @default true
   */
  underline?: boolean;
};

export type LinkProps = LinkBaseProps & Omit<TextProps<'a'>, 'underline'>;

export const linkClassName = 'cds-link';
const baseStyle = css`
  text-decoration: none;
  cursor: pointer;
  background: none;
  margin: 0;
  padding: 0;
  border: 0;
  &[data-underline='true'] {
    text-decoration: underline;
  }

  &:focus-visible {
    outline-width: 2px;
    outline-style: solid;
    outline-color: var(--color-bgPrimary);
    border-radius: var(--borderRadius-100);
  }
`;

const defaultButtonStyle = css`
  // Reset to browser defaults for button styling if font is not defined
  font-family: revert;
  font-size: revert;
  line-height: revert;
  letter-spacing: revert;
  font-weight: revert;
`;

export const Link = memo(
  forwardRef(function Link(
    {
      accessibilityLabel,
      children,
      to,
      testID,
      href,
      mono,
      className,
      underline = true,
      disabled,
      display = 'inline-flex',
      color = 'fgPrimary',
      font,
      openInNewWindow = false,
      rel,
      renderContainer,
      ...props
    }: LinkProps,
    ref: React.ForwardedRef<HTMLAnchorElement>,
  ) {
    const linkRef = useRef(null);
    const mergedRef = useMergeRefs(ref, linkRef);
    const isAnchor = to || href;

    const anchorProps = useMemo(
      () =>
        isAnchor
          ? {
              href: to ?? href,
              rel: openInNewWindow ? 'noopener noreferrer' : rel, // Set noopener noreferrer when openInNewWindow is true
              target: openInNewWindow ? '_blank' : undefined,
            }
          : {},
      [isAnchor, to, href, openInNewWindow, rel],
    );

    const enhancedProps = useMemo(
      () => ({
        'aria-label': accessibilityLabel,
        'data-testid': testID,
        'data-underline': underline,
        className: cx(baseStyle, linkClassName, className),
        disabled,
        ref: mergedRef,
        href: to ?? href,
        rel,
        ...anchorProps,
        children: (
          <Text
            color={color}
            display={display}
            font={font}
            inherit={!font}
            mono={mono}
            underline={underline}
          >
            {children}
          </Text>
        ),
        ...props,
      }),
      [
        accessibilityLabel,
        anchorProps,
        children,
        className,
        color,
        disabled,
        display,
        font,
        href,
        mergedRef,
        mono,
        props,
        rel,
        testID,
        to,
        underline,
      ],
    );

    const memoizedRenderContainer = useCallback(
      (props: React.HTMLAttributes<HTMLAnchorElement>) =>
        renderContainer ? renderContainer(props) : undefined,
      [renderContainer],
    );

    return renderContainer ? (
      memoizedRenderContainer(enhancedProps)
    ) : (
      <Text
        ref={ref}
        accessibilityLabel={accessibilityLabel}
        aria-disabled={disabled ? true : undefined}
        as={isAnchor ? 'a' : 'button'}
        className={cx(
          baseStyle,
          linkClassName,
          !isAnchor && !font && defaultButtonStyle,
          className,
        )}
        color={color}
        data-underline={underline}
        disabled={disabled}
        display={display}
        font={font}
        inherit={!font}
        mono={mono}
        testID={testID}
        {...anchorProps}
        {...props}
      >
        {children}
      </Text>
    );
  }),
);
