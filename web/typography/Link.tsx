import React, { AnchorHTMLAttributes, useRef, memo } from 'react';

import { SharedProps } from '@cbhq/cds-common';
import { LinkBaseProps, LinkTypography } from '@cbhq/cds-common/types/LinkBaseProps';
import { css, cx } from 'linaria';
import { Button as ReakitButton } from 'reakit/Button';

import { linkResets } from '../styles/resetStyles';
import { OnPress } from '../types';
import type { DynamicElement } from '../types';
import { TextBody } from './TextBody';
import { TextCaption } from './TextCaption';
import { TextHeadline } from './TextHeadline';
import { TextLabel1 } from './TextLabel1';
import { TextLabel2 } from './TextLabel2';
import { TextLegal } from './TextLegal';
import { TextProps, HTMLNonHeadingTextTags } from './TextProps';
import { TextTitle1 } from './TextTitle1';
import { TextTitle2 } from './TextTitle2';
import { TextTitle3 } from './TextTitle3';

const cursorPointer = css`
  cursor: pointer;
`;

const TYPOGRAPHY_MAP: Record<
  LinkTypography,
  React.ComponentType<
    DynamicElement<TextProps, HTMLNonHeadingTextTags, true /* as prop is required */>
  >
> = {
  body: TextBody,
  caption: TextCaption,
  headline: TextHeadline,
  label1: TextLabel1,
  label2: TextLabel2,
  title1: TextTitle1,
  title2: TextTitle2,
  title3: TextTitle3,
  legal: TextLegal,
};
export interface LinkProps
  extends LinkBaseProps,
    SharedProps,
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
  renderContainer,
  variant = 'headline',
  onPress,
  ...props
}: LinkProps) {
  const linkRef = useRef(null);
  const TextComponent = TYPOGRAPHY_MAP[variant];

  const enhancedProps = {
    'aria-label': accessibilityLabel,
    'data-testid': testID,
    className: cx(cursorPointer, linkResets),
    onClick: onPress,
    ref: linkRef,
    href: to,
    rel: to && openInNewWindow && rel === undefined ? 'noopener noreferrer' : rel,
    target: openInNewWindow ? '_blank' : '',
    children: (
      <TextComponent as="span" color={color}>
        {children}
      </TextComponent>
    ),
    ...props,
  };

  return renderContainer ? (
    renderContainer(enhancedProps)
  ) : (
    <ReakitButton as="a" {...enhancedProps} />
  );
});
