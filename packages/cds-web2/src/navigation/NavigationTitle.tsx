import React, { memo } from 'react';
import { isProduction } from '@cbhq/cds-utils';

import { Text, TextProps } from '../typography/Text';

export const navigationTitleDefaultElement = 'h1';
export type NavigationTitleDefaultElement = typeof navigationTitleDefaultElement;

export type NavigationTitleProps = {
  children: string;
} & TextProps<NavigationTitleDefaultElement>;

// TODO if/when we eventually handle the router, this should also setup html meta attrs for SEO
export const NavigationTitle = memo((props: NavigationTitleProps) => {
  if (!isProduction()) {
    if (typeof props.children !== 'string') {
      throw Error('NavigationTitle: Children must be a string');
    }
  }

  return <Text as={navigationTitleDefaultElement} font="title1" {...props} />;
});

NavigationTitle.displayName = 'NavigationTitle';
