import React from 'react';

import { Text, TextProps } from './Text';

export type TextTitle4Props<AsComponent extends React.ElementType> = TextProps<AsComponent>;

export const TextTitle4 = <AsComponent extends React.ElementType = 'span'>({
  ...props
}: TextTitle4Props<AsComponent>) => <Text font="title4" {...props} />;
