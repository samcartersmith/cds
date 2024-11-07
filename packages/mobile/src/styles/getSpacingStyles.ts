import { I18nManager, ViewStyle } from 'react-native';
import { InternalSpacingProps, Scale, SpacingScale } from '@cbhq/cds-common';
import { memoize } from '@cbhq/cds-common/utils/memoize';

import * as scales from './scale';

export type GetSpacingStylesParams = InternalSpacingProps & {
  scale: Scale;
};

function getCacheKey({
  all,
  bottom,
  top,
  start,
  end,
  vertical,
  horizontal,
  isInverted = false,
  scale,
}: GetSpacingStylesParams) {
  return `${scale}-${all}-${bottom}-${top}-${start}-${end}-${vertical}-${horizontal}-${isInverted}`;
}

export const getSpacingStyles = memoize(function getSpacingStyles({
  all,
  bottom,
  top,
  start,
  end,
  vertical,
  horizontal,
  isInverted = false,
  scale,
}: GetSpacingStylesParams): ViewStyle {
  const styles: ViewStyle = {};

  const setSpacing = (prop: string, value: SpacingScale) => {
    const spacingValue = value === 0 ? 0 : scales[scale].spacing[value];
    if (isInverted) {
      styles[prop.replace('spacing', 'margin') as 'margin'] = spacingValue * -1;
    } else {
      styles[prop.replace('spacing', 'padding') as 'padding'] = spacingValue;
    }
  };

  if (all !== undefined) {
    setSpacing('spacingTop', all);
    setSpacing('spacingRight', all);
    setSpacing('spacingBottom', all);
    setSpacing('spacingLeft', all);
  }

  if (vertical !== undefined) {
    setSpacing('spacingTop', vertical);
    setSpacing('spacingBottom', vertical);
  }

  if (horizontal !== undefined) {
    setSpacing('spacingLeft', horizontal);
    setSpacing('spacingRight', horizontal);
  }

  if (top !== undefined) {
    setSpacing('spacingTop', top);
  }

  if (bottom !== undefined) {
    setSpacing('spacingBottom', bottom);
  }

  if (start !== undefined) {
    setSpacing(I18nManager.isRTL ? 'spacingRight' : 'spacingLeft', start);
  }

  if (end !== undefined) {
    setSpacing(I18nManager.isRTL ? 'spacingLeft' : 'spacingRight', end);
  }
  return styles;
},
getCacheKey);
