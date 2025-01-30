import React from 'react';

import { Text, TextProps } from './Text';

export type TextTitle1Props<AsComponent extends React.ElementType> = TextProps<AsComponent>;

export const TextTitle1 = <AsComponent extends React.ElementType = 'span'>({
  ...props
}: TextTitle1Props<AsComponent>) => <Text font="title1" {...props} />;
