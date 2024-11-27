import React from 'react';

import { Text, TextProps } from './Text';

export type TextDisplay2Props<AsComponent extends React.ElementType> = TextProps<AsComponent>;

export const TextDisplay2 = <AsComponent extends React.ElementType = 'span'>({
  ...props
}: TextDisplay2Props<AsComponent>) => <Text font="display2" {...props} />;
