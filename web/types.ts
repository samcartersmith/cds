import * as React from 'react';

import { PaletteAlias } from '@cbhq/cds-common';

//  web only
export type DynamicElement<
  T extends keyof JSX.IntrinsicElements | React.JSXElementConstructor<unknown>,
  CustomProps extends unknown
> = CustomProps & {
  /**
   * Choose a semantic html element or a React component to be rendered. All native html attribute for that element will be available through the styled component.
   */
  readonly as: T;
} & Omit<
    React.ComponentProps<T>,
    'className' | 'style' | 'dangerouslySetInnerHTML' | keyof CustomProps
  >;

// LINARIA

export interface StyledInheritedProps {
  className: string;
  style?: React.CSSProperties;
}

export type CSSMap<T extends string | undefined> = Record<NonNullable<T>, string>;

export type PaletteCssVariable = { [key in `--${PaletteAlias}`]?: string };

declare module 'csstype' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface Properties extends PaletteCssVariable {
    '--interactable-opacity'?: number;
  }
}

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

// EVENTS

export interface PressEvent<T = HTMLElement> {
  /** The type of press event being fired. */
  type: 'pressstart' | 'pressend' | 'pressup' | 'press';
  /** The pointer type that triggered the press event. */
  pointerType: 'mouse' | 'pen' | 'touch' | 'keyboard' | 'virtual';
  /** The target element of the press event. */
  target: T;
  /** Whether the shift keyboard modifier was held during the press event. */
  shiftKey: boolean;
  /** Whether the ctrl keyboard modifier was held during the press event. */
  ctrlKey: boolean;
  /** Whether the meta keyboard modifier was held during the press event. */
  metaKey: boolean;
}

export type OnPress<T> = (event: PressEvent<T>) => void;
export type OnHover = (isHovering: boolean) => void;
