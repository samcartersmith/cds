import React from 'react';

import { Text, TextProps } from './Text';

export type TextLegalProps<AsComponent extends React.ElementType> = TextProps<AsComponent>;

export const TextLegal = <AsComponent extends React.ElementType = 'span'>({
  ...props
}: TextLegalProps<AsComponent>) => <Text font="legal" {...props} />;
