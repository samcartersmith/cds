import React, { FunctionComponent } from 'react';
import { IconName, IconSize, SharedProps } from '@cbhq/cds-common';

import { Icon } from './Icon';

type CurrencyIcon = Record<string, IconName>;

const currencyIcon: CurrencyIcon = {
  USD: 'cashUSD',
  JPY: 'cashJPY',
  EUR: 'cashEUR',
  GBP: 'cashGBP',
};

type FiatIconProps = {
  currencyCode: string;
  size?: Exclude<IconSize, 'xs'>;
} & SharedProps;

export const FiatIcon: FunctionComponent<FiatIconProps> = ({
  currencyCode,
  size = 'l',
  testID,
}: FiatIconProps) => {
  const iconName = currencyIcon[currencyCode];

  if (!iconName) {
    return null;
  }

  return <Icon size={size} name={iconName} bordered={size === 'l'} testID={testID} />;
};
