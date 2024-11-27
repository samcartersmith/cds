import React from 'react';

import { Text, TextProps } from './Text';

export type TextCaptionProps<AsComponent extends React.ElementType> = TextProps<AsComponent>;

export const TextCaption = <AsComponent extends React.ElementType = 'span'>({
  ...props
}: TextCaptionProps<AsComponent>) => <Text font="caption" {...props} />;
