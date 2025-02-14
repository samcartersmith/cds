import React from 'react';

import { Text, TextProps } from './Text';

export type TextLabel2Props<AsComponent extends React.ElementType> = TextProps<AsComponent>;

export const TextLabel2 = <AsComponent extends React.ElementType = 'span'>(
  props: TextLabel2Props<AsComponent>,
) => <Text font="label2" {...props} />;
