import React from 'react';

import { Text, TextProps } from './Text';

export type TextTitle3Props<AsComponent extends React.ElementType> = TextProps<AsComponent>;

export const TextTitle3 = <AsComponent extends React.ElementType = 'span'>({
  ...props
}: TextTitle3Props<AsComponent>) => <Text font="title3" {...props} />;
