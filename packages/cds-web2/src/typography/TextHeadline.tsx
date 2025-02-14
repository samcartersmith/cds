import React from 'react';

import { Text, TextProps } from './Text';

export type TextHeadlineProps<AsComponent extends React.ElementType> = TextProps<AsComponent>;

export const TextHeadline = <AsComponent extends React.ElementType = 'span'>(
  props: TextHeadlineProps<AsComponent>,
) => <Text font="headline" {...props} />;
