import { css } from 'linaria';

import { CSSMap } from '../types';
import { TextProps } from '../typography/TextProps';

const transition = css`
  transition: color 150ms ease-out, opacity 150ms ease-out;
`;

const textAlign: CSSMap<TextProps['align']> = {
  start: css`
    text-align: start;
  `,
  end: css`
    text-align: end;
  `,
  center: css`
    text-align: center;
  `,
  justify: css`
    text-align: justify;
  `,
};

const display: CSSMap<TextProps['display']> = {
  block: css`
    display: block;
  `,
  initial: css`
    display: initial;
  `,
  inline: css`
    display: inline;
  `,
};

const userSelect: CSSMap<TextProps['selectable']> = {
  none: css`
    user-select: none;
  `,
  text: css`
    user-select: text;
  `,
  all: css`
    user-select: all;
  `,
};

const overflow: CSSMap<TextProps['overflow']> = {
  truncate: css`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  `,
  clip: css`
    overflow-wrap: break-word;
    text-overflow: clip;
  `,
  wrap: css`
    white-space: normal;
    overflow-wrap: break-word;
  `,
  break: css`
    /**
     * Fallback for mobile safari on iOS < 15.4
     * @link https://developer.mozilla.org/en-US/docs/Web/CSS/overflow-wrap#browser_compatibility 
     */
    @supports not (overflow-wrap: anywhere) {
      word-break: break-word;
      overflow-wrap: break-word;
    }

    /* Desktop solution */
    overflow-wrap: anywhere;
  `,
};

const transform: CSSMap<TextProps['transform']> = {
  // && to make it more specific than default text-transform
  uppercase: css`
    && {
      text-transform: uppercase;
    }
  `,
  lowercase: css`
    && {
      text-transform: lowercase;
    }
  `,
  capitalize: css`
    && {
      text-transform: capitalize;
    }
  `,
  none: css`
    && {
      text-transform: none;
    }
  `,
};

const tabularNumbers = css`
  font-variant-numeric: tabular-nums;
`;

const slashedZero = css`
  font-variant-numeric: slashed-zero;
`;

const underline = css`
  text-decoration: underline;
`;

const noUnderline = css`
  && {
    text-decoration: none;
  }
`;

const noWrap = css`
  white-space: nowrap;
`;

const numberOfLines = css`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: var(--typography-number-of-lines);
  overflow: hidden;
`;

export const getTypographyStyles = (props: Omit<TextProps, 'children'>) => {
  return [
    transition,
    props.align && textAlign[props.align],
    props.display && display[props.display],
    props.tabularNumbers && tabularNumbers,
    props.slashedZero && slashedZero,
    props.selectable && userSelect[props.selectable],
    props.underline && underline,
    props.underline === false && noUnderline, // If underline={false} is explicitly set, use underline: none
    props.noWrap && noWrap,
    props.numberOfLines && numberOfLines,
    props.overflow && overflow[props.overflow],
    props.transform && transform[props.transform],
  ];
};
