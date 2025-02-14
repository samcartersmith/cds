import React from 'react';

import { Text, TextProps } from './Text';

export type TextLabel1Props<AsComponent extends React.ElementType> = TextProps<AsComponent>;

export const TextLabel1 = <AsComponent extends React.ElementType = 'span'>(
  props: TextLabel1Props<AsComponent>,
) => <Text font="label1" {...props} />;
