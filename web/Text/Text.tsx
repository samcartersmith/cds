import * as React from 'react';

import type { Typography } from '@cds/core';
import { pascalCase } from '@cds/utils';
import { getTypographyStyles } from '@cds/web/styles/typography';
import type { DynamicElement } from '@cds/web/types';
import { cx } from 'linaria';

import * as foregroundStyles from '../styles/foregroundColor';
import { HTMLNonHeadingTextTags, HTMLTextTags, TextProps } from './TextProps';
import * as textStyles from './textStyles';

export type { TextProps, Typography };

const createText = <E extends HTMLTextTags>(name: Typography) => {
  const TextComponent = <T extends E>({
    as,
    color = 'foreground',
    ...props
  }: DynamicElement<T> & TextProps) =>
    React.createElement(as, {
      ...props,
      className: cx(textStyles[name], foregroundStyles[color], ...getTypographyStyles(props)),
    });

  TextComponent.displayName = pascalCase(name);
  return TextComponent;
};

export const TextDisplay1 = createText('display1');
export const TextDisplay2 = createText('display2');
export const TextTitle1 = createText('title1');
export const TextTitle2 = createText('title2');
export const TextTitle3 = createText('title3');
export const TextHeadline = createText('headline');
export const TextBody = createText<HTMLNonHeadingTextTags>('body');
export const TextLabel1 = createText<HTMLNonHeadingTextTags>('label1');
export const TextLabel2 = createText<HTMLNonHeadingTextTags>('label2');
export const TextCaption = createText<HTMLNonHeadingTextTags>('caption');
export const TextLegal = createText<HTMLNonHeadingTextTags>('legal');
