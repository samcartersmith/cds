import { PaletteAlias } from '@cbhq/cds-common';
import { CssVariableFn } from '@cbhq/cds-utils';

//  web only
export type DynamicElement<
  T extends keyof JSX.IntrinsicElements | React.JSXElementConstructor<unknown>,
  CustomProps extends unknown
> = CustomProps & {
  /**
   * A semantic HTML element or a React component to be rendered. All native HTML attributes for that element will be available through the styled component.
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

declare module 'react' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface CSSProperties extends PaletteCssVariable {
    // TODO: remove when we migrate to new useInteractable in buttons folder
    '--interactable-opacity'?: number;
    '--interactable-background'?: string;
    '--interactable-underlay'?: CssVariableFn<PaletteAlias>;
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

export type OnPress<T> = React.MouseEventHandler<T>;
export type OnHover = (isHovering: boolean) => void;

// REACT
export type SetState<T> = React.Dispatch<React.SetStateAction<T>>;
