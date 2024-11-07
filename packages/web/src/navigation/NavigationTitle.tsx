import React, { memo } from 'react';
import { isProduction } from '@cbhq/cds-utils';

import { TextProps, TextTitle1 } from '../typography';

export type NavigationTitleProps = {
  children: NonNullable<string>;
} & TextProps;

// TODO if/when we eventually handle the router, this should also setup html meta attrs for SEO
export const NavigationTitle = memo((props: NavigationTitleProps) => {
  if (!isProduction()) {
    if (typeof props.children !== 'string') {
      throw new Error('NavigationTitle: Children must be a string');
    }
  }

  return <TextTitle1 as="h1" {...props} />;
});

NavigationTitle.displayName = 'NavigationTitle';
