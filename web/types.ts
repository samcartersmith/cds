import * as React from 'react';

//  web only
export type DynamicElement<
  T extends keyof JSX.IntrinsicElements | React.JSXElementConstructor<unknown>
> = {
  /**
   * Choose a semantic html element or a React component to be rendered. All native html attribute
   * for that element will be available through the styled component.
   */
  readonly as: T;
} & Omit<React.ComponentProps<T>, 'className' | 'style'>;

// LINARIA

export interface StyledInheritedProps {
  className: string;
  style?: React.CSSProperties;
}

export type CSSMap<T extends string | undefined> = Record<NonNullable<T>, string>;

// ACCESSIBILITY

export type ArticleAccessibilityRole =
  | 'application'
  | 'article'
  | 'document'
  | 'feed'
  | 'main'
  | 'none'
  | 'presentation'
  | 'region';

export type AsideAccessibilityRole =
  | 'complementary'
  | 'feed'
  | 'none'
  | 'note'
  | 'presentation'
  | 'region'
  | 'search';

export type DivAccessibilityRole = string;

export type HeaderFooterAccessibilityRole = 'banner' | 'group' | 'presentation' | 'none';

export type MainAccessibilityRole = 'main';

export type SectionAccessibilityRole =
  | 'alert'
  | 'alertdialog'
  | 'application'
  | 'banner'
  | 'complementary'
  | 'contentinfo'
  | 'dialog'
  | 'document'
  | 'feed'
  | 'log'
  | 'main'
  | 'marquee'
  | 'navigation'
  | 'none'
  | 'note'
  | 'presentation'
  | 'region'
  | 'search'
  | 'status'
  | 'tabpanel';
