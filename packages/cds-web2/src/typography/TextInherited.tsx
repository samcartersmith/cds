import React from 'react';

import { Text, TextProps } from './Text';

export type TextInheritedProps<AsComponent extends React.ElementType> = TextProps<AsComponent>;

export const TextInherited = <AsComponent extends React.ElementType = 'span'>(
  props: TextInheritedProps<AsComponent>,
) => <Text inherit font="body" {...props} />;
