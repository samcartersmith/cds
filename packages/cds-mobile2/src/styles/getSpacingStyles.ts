import { I18nManager, ViewStyle } from 'react-native';
import { InternalSpacingProps } from '@cbhq/cds-common2';
import { ThemeVars } from '@cbhq/cds-common2/new/vars';
import { memoize } from '@cbhq/cds-common2/utils/memoize';

import * as scales from './scale';

export type GetSpacingStylesParams = InternalSpacingProps;

function getCacheKey({
  all,
  bottom,
  top,
  start,
  end,
  vertical,
  horizontal,
  isInverted = false,
}: GetSpacingStylesParams) {
  return `${all}-${bottom}-${top}-${start}-${end}-${vertical}-${horizontal}-${isInverted}`;
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
}: GetSpacingStylesParams): ViewStyle {
  const styles: ViewStyle = {};

  const setSpacing = (prop: string, value: ThemeVars.Space) => {
    const spacingValue = value === 0 ? 0 : scales.large.spacing[value];
    if (isInverted) {
      styles[prop.replace('spacing', 'margin') as 'margin'] = spacingValue;
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
