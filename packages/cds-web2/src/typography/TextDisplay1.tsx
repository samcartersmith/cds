import React from 'react';

import { Text, TextProps } from './Text';

export type TextDisplay1Props<AsComponent extends React.ElementType> = TextProps<AsComponent>;

export const TextDisplay1 = <AsComponent extends React.ElementType = 'span'>(
  props: TextDisplay1Props<AsComponent>,
) => <Text font="display1" {...props} />;
