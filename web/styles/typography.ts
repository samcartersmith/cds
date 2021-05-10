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
};

const transform: CSSMap<TextProps['transform']> = {
  uppercase: css`
    text-transform: uppercase;
  `,
  lowercase: css`
    text-transform: lowercase;
  `,
  capitalize: css`
    text-transform: capitalize;
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

const noWrap = css`
  white-space: nowrap;
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
    props.noWrap && noWrap,
    props.overflow && overflow[props.overflow],
    props.transform && transform[props.transform],
  ];
};
