import React, { FunctionComponent } from 'react';
import { IconName, IconSize, SharedProps } from '@cbhq/cds-common';

import { Icon } from './Icon';

type CurrencyIcon = Record<string, IconName>;

const currencyIcon: CurrencyIcon = {
  USD: 'cashUSD',
  JPY: 'cashJPY',
  EUR: 'cashEUR',
  GBP: 'cashGBP',
  BRL: 'cashBrazilianReal',
};

type FiatIconProps = {
  currencyCode: string;
  size?: Exclude<IconSize, 'xs'>;
} & SharedProps;

/** @deprecated this component will be removed from CDS at the end of v6.0.0. Please use Icon & bordered prop instead */
export const FiatIcon: FunctionComponent<React.PropsWithChildren<FiatIconProps>> = ({
  currencyCode,
  size = 'l',
  testID,
}: FiatIconProps) => {
  const iconName = currencyIcon[currencyCode];

  if (!iconName) {
    return null;
  }

  return <Icon bordered={size === 'l'} name={iconName} size={size} testID={testID} />;
};
