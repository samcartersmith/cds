import { PaletteAlias, SpectrumAlias } from '@cbhq/cds-common';
import { opacityHovered } from '@cbhq/cds-common/tokens/interactable';
import { CssVariableFn } from '@cbhq/cds-utils';

//  web only
export type FilteredHTMLAttributes<T, P extends keyof T = never> = Omit<
  T,
  'children' | 'className' | 'style' | 'dangerouslySetInnerHTML' | P
>;

export type DynamicElement<
  CustomProps extends unknown,
  T extends keyof JSX.IntrinsicElements | React.JSXElementConstructor<unknown>,
  AsPropRequired extends boolean = false
> = CustomProps &
  Omit<
    React.ComponentProps<T>,
    'className' | 'style' | 'dangerouslySetInnerHTML' | keyof CustomProps
  > &
  (AsPropRequired extends true
    ? {
        /**
         * A semantic HTML element or a React component to be rendered. All native HTML attributes for that element will be available through the styled component.
         */
        readonly as: T;
      }
    : {
        /**
         * A semantic HTML element or a React component to be rendered. All native HTML attributes for that element will be available through the styled component.
         */
        readonly as?: T;
      });

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
    '--interactable-height'?: string;
    '--interactable-opacity-hovered'?: typeof opacityHovered[keyof typeof opacityHovered];
    '--interactable-opacity-pressed'?: typeof opacityHovered[keyof typeof opacityHovered];
    '--interactable-overlay'?: CssVariableFn<SpectrumAlias>;
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
