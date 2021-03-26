import React, { FunctionComponent } from 'react';

import { IconName, IconSize } from '@cbhq/cds-common';

import { Icon } from './Icon';

type CurrencyIcon = Record<string, IconName>;

const currencyIcon: CurrencyIcon = {
  USD: 'cashUSD',
  JPY: 'cashJPY',
  EUR: 'cashEUR',
  GBP: 'cashGBP',
};

interface FiatIconProps {
  currencyCode: string;
  size?: Exclude<IconSize, 'xs'>;
}

export const FiatIcon: FunctionComponent<FiatIconProps> = ({
  currencyCode,
  size = 'l',
}: FiatIconProps) => {
  const iconName = currencyIcon[currencyCode];

  if (!iconName) {
    return null;
  }

  return <Icon size={size} name={iconName} bordered={size === 'l'} />;
};
