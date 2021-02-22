import { FlexStyles, PositionStyles } from '@cbhq/cds-common';
import { css } from 'linaria';

import { CSSMap } from '../types';

export const box = css`
  display: flex;
`;

export const alignContent: CSSMap<FlexStyles['alignContent']> = {
  'flex-start': css`
    align-content: flex-start;
  `,
  'flex-end': css`
    align-content: flex-end;
  `,
  center: css`
    align-content: center;
  `,
  stretch: css`
    align-content: stretch;
  `,
  'space-between': css`
    align-content: space-between;
  `,
  'space-around': css`
    align-content: space-around;
  `,
};

export const alignItems: CSSMap<FlexStyles['alignItems']> = {
  'flex-start': css`
    align-items: flex-start;
  `,
  'flex-end': css`
    align-items: flex-end;
  `,
  center: css`
    align-items: center;
  `,
  stretch: css`
    align-items: stretch;
  `,
  baseline: css`
    align-items: baseline;
  `,
};

export const alignSelf: CSSMap<FlexStyles['alignSelf']> = {
  'flex-start': css`
    align-self: flex-start;
  `,
  'flex-end': css`
    align-self: flex-end;
  `,
  center: css`
    align-self: center;
  `,
  stretch: css`
    align-self: stretch;
  `,
  auto: css`
    align-self: auto;
  `,
  baseline: css`
    align-self: baseline;
  `,
};

export const border = css`
  border: 1px solid var(--stroke);
`;

export const borderRadius = css`
  border-radius: 8px;
`;

export const flexDirection: CSSMap<FlexStyles['flexDirection']> = {
  row: css`
    flex-direction: row;
  `,
  'row-reverse': css`
    flex-direction: row-reverse;
  `,
  column: css`
    flex-direction: column;
  `,
  'column-reverse': css`
    flex-direction: column-reverse;
  `,
};

export const flexWrap: CSSMap<FlexStyles['flexWrap']> = {
  nowrap: css`
    flex-wrap: nowrap;
  `,
  wrap: css`
    flex-wrap: wrap;
  `,
  'wrap-reverse': css`
    flex-wrap: wrap-reverse;
  `,
};

export const justifyContent: CSSMap<FlexStyles['justifyContent']> = {
  'flex-start': css`
    justify-content: flex-start;
  `,
  'flex-end': css`
    justify-content: flex-end;
  `,
  center: css`
    justify-content: center;
  `,
  'space-between': css`
    justify-content: space-between;
  `,
  'space-around': css`
    justify-content: space-around;
  `,
  'space-evenly': css`
    justify-content: space-evenly;
  `,
};

export const overflow: CSSMap<string> = {
  hidden: css`
    overflow: hidden;
  `,
  scroll: css`
    overflow: scroll;
  `,
  visible: css`
    overflow: visible;
  `,
};

export const position: CSSMap<PositionStyles['position']> = {
  absolute: css`
    position: absolute;
  `,
  relative: css`
    position: relative;
  `,
};
