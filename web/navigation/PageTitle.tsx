import React, { memo } from 'react';
import { TextTitle1, TextProps } from '../typography';

export type PageTitleProps = {
  children: NonNullable<string>;
} & TextProps;

// TODO if/when we eventually handle the router, this should also setup html meta attrs for SEO
export const PageTitle = memo((props: PageTitleProps) => {
  if (process.env.NODE_ENV !== 'production') {
    if (typeof props.children !== 'string') {
      throw new Error('PageTitle: Children must be a string');
    }
  }

  return <TextTitle1 as="h1" {...props} />;
});

PageTitle.displayName = 'PageTitle';
