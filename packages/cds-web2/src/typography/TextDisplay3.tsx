import React from 'react';

import { Text, TextProps } from './Text';

export type TextDisplay3Props<AsComponent extends React.ElementType> = TextProps<AsComponent>;

export const TextDisplay3 = <AsComponent extends React.ElementType = 'span'>({
  ...props
}: TextDisplay3Props<AsComponent>) => <Text font="display3" {...props} />;
