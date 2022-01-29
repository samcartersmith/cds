import { css } from 'linaria';
import { FlexStyles } from '@cbhq/cds-common';

import { CSSMap, Display } from '../types';
import { cx } from '../utils/linaria';

import { display as displayStyles } from './display';

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

export const getFlexStyles = ({
  display = 'flex',
  ...props
}: FlexStyles & { display?: Display }) => {
  return cx(
    displayStyles[display],
    props.alignContent && alignContent[props.alignContent],
    props.alignItems && alignItems[props.alignItems],
    props.alignSelf && alignSelf[props.alignSelf],
    props.flexDirection && flexDirection[props.flexDirection],
    props.flexWrap && flexWrap[props.flexWrap],
    props.justifyContent && justifyContent[props.justifyContent],
  );
};
