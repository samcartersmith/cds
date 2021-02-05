import { TextBaseProps } from '@cds/common';
import { css } from 'linaria';

import { CSSMap } from '../types';

export const fallbackStack =
  "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'";

const textAlign: CSSMap<TextBaseProps['align']> = {
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

const userSelect: CSSMap<TextBaseProps['selectable']> = {
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

const overflow: CSSMap<TextBaseProps['overflow']> = {
  truncate: css`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  `,
  clip: css`
    text-overflow: clip;
  `,
};

const transform: CSSMap<TextBaseProps['transform']> = {
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
  font-variant-numeric: tnum;
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

export const getTypographyStyles = (props: Omit<TextBaseProps, 'children'>) => {
  return [
    props.align && textAlign[props.align],
    props.tabularNumbers && tabularNumbers,
    props.slashedZero && slashedZero,
    props.selectable && userSelect[props.selectable],
    props.underline && underline,
    props.noWrap && noWrap,
    props.overflow && overflow[props.overflow],
    props.transform && transform[props.transform],
  ];
};
