import { Display, FlexStyles } from '@cbhq/cds-common/types';

import { display as displayStyles } from '../styles/display';
import {
  alignContent,
  alignItems,
  alignSelf,
  flexDirection,
  flexWrap,
  justifyContent,
} from '../styles/flex';
import { cx } from '../utils/linaria';

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
