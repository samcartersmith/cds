import React from 'react';

import { Text, TextProps } from './Text';

export type TextTitle2Props<AsComponent extends React.ElementType> = TextProps<AsComponent>;

export const TextTitle2 = <AsComponent extends React.ElementType = 'span'>({
  ...props
}: TextTitle2Props<AsComponent>) => <Text font="title2" {...props} />;
