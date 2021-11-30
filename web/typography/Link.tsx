import React, { AnchorHTMLAttributes, useRef, memo } from 'react';

import { SharedProps } from '@cbhq/cds-common';
import { LinkBaseProps, LinkTypography } from '@cbhq/cds-common/types/LinkBaseProps';
import { css, cx } from 'linaria';

import { ButtonOrLink } from '../system/ButtonOrLink';
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
import { TextTitle4 } from './TextTitle4';
import { TextInherited } from './TextInherited';

export const linkClassName = 'cds-link';
const link = css`
  &.${linkClassName} {
    text-decoration: none;
    cursor: pointer;
    background: none;
    margin: 0;
    padding: 0;
    border: 0;
  }
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
  title4: TextTitle4,
  legal: TextLegal,
  inherit: TextInherited,
};
export type LinkProps = {
  /** Color of the foreground text. */
  color?: LinkBaseProps['color'] | 'currentColor';
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
  /**
   * @danger Adds a className to the Link. If you pass in a className make sure your styles override the Link styles using the Link class .cds-link like this: .my-class.cds-link
   */
  dangerouslySetClassName?: string;
} & Omit<LinkBaseProps, 'color'> &
  SharedProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'children' | 'color'>;

export const Link = memo(function Link({
  accessibilityLabel,
  children,
  to,
  openInNewWindow = false,
  testID,
  rel,
  renderContainer,
  variant = 'inherit',
  onPress,
  // text props
  color = 'primary',
  mono,
  dangerouslySetClassName,
  ...props
}: LinkProps) {
  const linkRef = useRef(null);
  const TextComponent = TYPOGRAPHY_MAP[variant];

  const enhancedProps = {
    'aria-label': accessibilityLabel,
    'data-testid': testID,
    className: cx(linkClassName, link, dangerouslySetClassName),
    onClick: onPress,
    ref: linkRef,
    href: to,
    rel,
    target: openInNewWindow ? '_blank' : undefined,
    children: (
      <TextComponent as="span" color={color} mono={mono}>
        {children}
      </TextComponent>
    ),
    ...props,
  };

  return renderContainer ? renderContainer(enhancedProps) : <ButtonOrLink {...enhancedProps} />;
});
