import React from 'react';

import { Text, TextProps } from './Text';

export type TextBodyProps<AsComponent extends React.ElementType> = TextProps<AsComponent>;

export const TextBody = <AsComponent extends React.ElementType = 'span'>(
  props: TextBodyProps<AsComponent>,
) => <Text font="body" {...props} />;
