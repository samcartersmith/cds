import React, { forwardRef, memo, useRef } from 'react';
import { css } from '@linaria/core';
import { ForwardedRef, SharedProps } from '@cbhq/cds-common';
import { useMergedRef } from '@cbhq/cds-common/hooks/useMergedRef';
import { LinkBaseProps, LinkTypography } from '@cbhq/cds-common/types/LinkBaseProps';

import { ButtonOrLink } from '../system/ButtonOrLink';
import { borderRadius, borderWidth, palette } from '../tokens';
import type { DynamicElement } from '../types';
import { cx } from '../utils/linaria';

import { TextBody } from './TextBody';
import { TextCaption } from './TextCaption';
import { TextHeadline } from './TextHeadline';
import { TextInherited } from './TextInherited';
import { TextLabel1 } from './TextLabel1';
import { TextLabel2 } from './TextLabel2';
import { TextLegal } from './TextLegal';
import { HTMLNonHeadingTextTags, TextProps } from './TextProps';
import { TextTitle1 } from './TextTitle1';
import { TextTitle2 } from './TextTitle2';
import { TextTitle3 } from './TextTitle3';
import { TextTitle4 } from './TextTitle4';

export const linkClassName = 'cds-link';
export const linkContainerClassName = `${linkClassName}--container`;
const link = css`
  &.${linkClassName} {
    text-decoration: none;
    cursor: pointer;
    background: none;
    margin: 0;
    padding: 0;
    border: 0;
  }
  &:focus-visible {
    outline-width: ${borderWidth.focusRing};
    outline-style: solid;
    outline-color: ${palette.primary};
    border-radius: ${borderRadius.roundedSmall};
  }
`;

// Used to enforce underlines when nested in a paragraph tag
export const linkInParagraph = css`
  :global() {
    p a.${linkClassName} span {
      text-decoration: underline;
    }
  }
`;

const TYPOGRAPHY_MAP: Record<
  LinkTypography,
  React.ComponentType<
    React.PropsWithChildren<
      DynamicElement<TextProps, HTMLNonHeadingTextTags, true /* as prop is required */>
    >
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
   * @default false
   */
  openInNewWindow?: boolean;
  /** Callback fired when the element is clicked. */
  onPress?: React.MouseEventHandler<HTMLAnchorElement>;
  /** Callback for custom Link component */
  renderContainer?: (props: React.HTMLAttributes<HTMLAnchorElement>) => JSX.Element;
  /**
   * @danger Adds a className to the Link. If you pass in a className make sure your styles override the Link styles using the Link class .cds-link like this: .my-class.cds-link
   */
  className?: string;
} & Omit<LinkBaseProps, 'color'> &
  SharedProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'children' | 'color'>;

export const Link = memo(
  forwardRef(function Link(
    {
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
      className,
      underline,
      ...props
    }: LinkProps,
    ref: ForwardedRef<HTMLElement>,
  ) {
    const linkRef = useRef(null);
    const TextComponent = TYPOGRAPHY_MAP[variant];
    const mergedRef = useMergedRef(ref, linkRef);

    const enhancedProps = {
      'aria-label': accessibilityLabel,
      'data-testid': testID,
      className: cx(linkClassName, link, className),
      onClick: onPress,
      ref: mergedRef,
      href: to,
      rel,
      target: openInNewWindow ? '_blank' : undefined,
      children: (
        <TextComponent
          as="span"
          className={linkContainerClassName}
          color={color}
          mono={mono}
          underline={underline}
        >
          {children}
        </TextComponent>
      ),
      ...props,
    };

    return renderContainer ? renderContainer(enhancedProps) : <ButtonOrLink {...enhancedProps} />;
  }),
);
