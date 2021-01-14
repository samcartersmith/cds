import * as React from 'react';

import type { Typography } from '@cds/core/Text/Typography';
import * as foregroundStyles from '@cds/theme/styles/foregroundColor';
import * as textAlignStyles from '@cds/theme/styles/textAlign';
import { pascalCase } from '@cds/utils';
import type { DynamicElement } from '@cds/web/types';
import { css, cx } from 'linaria';

import { HTMLNonHeadingTextTags, HTMLTextTags, TextProps } from './TextProps';
import * as textStyles from './textStyles';

export type { TextProps, Typography };

const noLineWrap = css`
  white-space: nowrap;
`;

const tabularNumbers = css`
  font-feature-settings: 'tnum';
`;

const disableSelect = css`
  // stylelint-disable-next-line plugin/no-unsupported-browser-features
  user-select: none;
`;

const createText = <E extends HTMLTextTags>(name: Typography) => {
  const TextComponent = <T extends E>({
    as,
    color = 'foreground',
    align = 'left',
    selectable = true,
    tnum = false,
    noWrap = false,
    ...props
  }: DynamicElement<T> & TextProps) =>
    React.createElement(as, {
      ...props,
      className: cx(
        textStyles[name],
        foregroundStyles[color],
        // TODO: replace with tailwind class
        // #startregion
        textAlignStyles[align],
        tnum && tabularNumbers,
        noWrap && noLineWrap,
        !selectable && disableSelect
        // #endregion
      ),
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
