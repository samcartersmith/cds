import React, { AnchorHTMLAttributes, useRef, memo } from 'react';

import { LinkBaseProps } from '@cbhq/cds-common/types/LinkBaseProps';
import { css, cx } from 'linaria';
import { Button as ReakitButton } from 'reakit/Button';

import { linkResets } from '../styles/resetStyles';
import { OnPress } from '../types';
import { TextHeadline } from './TextHeadline';

const cursorPointer = css`
  cursor: pointer;
`;

export interface LinkProps
  extends LinkBaseProps,
    Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'children' | 'color'> {
  /**
   * If true, it opens the link in a new window.
   * If false, it replaces the current screen with the link
   * @default true
   */
  openInNewWindow?: boolean;
  /** Callback fired when the element is clicked. */
  onPress?: OnPress<HTMLAnchorElement>;
  /** Callback for custom Link component */
  renderContainer?: (props: React.HTMLAttributes<HTMLAnchorElement>) => JSX.Element;
}

export const Link = memo(function Link({
  accessibilityLabel,
  children,
  to,
  openInNewWindow = false,
  testID,
  color = 'primary',
  rel,
  onPress,
  renderContainer,
  ...props
}: LinkProps) {
  const linkRef = useRef(null);
  const enhancedProps = {
    'aria-label': accessibilityLabel,
    'data-testid': testID,
    className: cx(cursorPointer, linkResets),
    children: (
      <TextHeadline as="span" color={color}>
        {children}
      </TextHeadline>
    ),
    onClick: onPress,
    ref: linkRef,
    href: to,
    rel: to && openInNewWindow && rel === undefined ? 'noopener noreferrer' : rel,
    target: openInNewWindow ? '_blank' : '',
    ...props,
  };

  return renderContainer ? (
    renderContainer(enhancedProps)
  ) : (
    <ReakitButton as="a" {...enhancedProps} />
  );
});
