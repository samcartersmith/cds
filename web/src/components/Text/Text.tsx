/**
 * DO NOT MODIFY
 * Generated from scripts/codegen/main.ts
 */
import * as React from 'react';

import { css, cx } from 'linaria';

import type { TextProps } from './TextProps';
import * as styles from './textStyles';

export type { TextProps };

if (process.env.NODE_ENV !== 'production') {
  console.warn('@cb/design-system-web components are deprecated. Please migrate to @cds/web.');
}

const noLineWrap = css`
  white-space: nowrap;
`;

const tabularNumber = css`
  font-feature-settings: 'tnum';
`;

export const TextDisplay1: React.FC<TextProps> = React.memo(function TextDisplay1({
  children,
  color,
  display,
  textAlign = 'start',
  noWrap = false,
  tnum = false,
  as,
  dangerouslySetClassName,
}) {
  const Tag = as || 'h1';

  return (
    <Tag
      style={{ display, color, textAlign }}
      className={cx(
        styles.display1,
        noWrap && noLineWrap,
        tnum && tabularNumber,
        dangerouslySetClassName
      )}
    >
      {children}
    </Tag>
  );
});

export const TextDisplay2: React.FC<TextProps> = React.memo(function TextDisplay2({
  children,
  color,
  display,
  textAlign = 'start',
  noWrap = false,
  tnum = false,
  as,
  dangerouslySetClassName,
}) {
  const Tag = as || 'h2';

  return (
    <Tag
      style={{ display, color, textAlign }}
      className={cx(
        styles.display2,
        noWrap && noLineWrap,
        tnum && tabularNumber,
        dangerouslySetClassName
      )}
    >
      {children}
    </Tag>
  );
});

export const TextTitle1: React.FC<TextProps> = React.memo(function TextTitle1({
  children,
  color,
  display,
  textAlign = 'start',
  noWrap = false,
  tnum = false,
  as,
  dangerouslySetClassName,
}) {
  const Tag = as || 'h3';

  return (
    <Tag
      style={{ display, color, textAlign }}
      className={cx(
        styles.title1,
        noWrap && noLineWrap,
        tnum && tabularNumber,
        dangerouslySetClassName
      )}
    >
      {children}
    </Tag>
  );
});

export const TextTitle2: React.FC<TextProps> = React.memo(function TextTitle2({
  children,
  color,
  display,
  textAlign = 'start',
  noWrap = false,
  tnum = false,
  as,
  dangerouslySetClassName,
}) {
  const Tag = as || 'h4';

  return (
    <Tag
      style={{ display, color, textAlign }}
      className={cx(
        styles.title2,
        noWrap && noLineWrap,
        tnum && tabularNumber,
        dangerouslySetClassName
      )}
    >
      {children}
    </Tag>
  );
});

export const TextTitle3: React.FC<TextProps> = React.memo(function TextTitle3({
  children,
  color,
  display,
  textAlign = 'start',
  noWrap = false,
  tnum = false,
  as,
  dangerouslySetClassName,
}) {
  const Tag = as || 'h5';

  return (
    <Tag
      style={{ display, color, textAlign }}
      className={cx(
        styles.title3,
        noWrap && noLineWrap,
        tnum && tabularNumber,
        dangerouslySetClassName
      )}
    >
      {children}
    </Tag>
  );
});

export const TextHeadline: React.FC<TextProps> = React.memo(function TextHeadline({
  children,
  color,
  display,
  textAlign = 'start',
  noWrap = false,
  tnum = false,
  as: Tag = 'div',
  dangerouslySetClassName,
}) {
  return (
    <Tag
      style={{ display, color, textAlign }}
      className={cx(
        styles.headline,
        noWrap && noLineWrap,
        tnum && tabularNumber,
        dangerouslySetClassName
      )}
    >
      {children}
    </Tag>
  );
});

export const TextBody: React.FC<TextProps> = React.memo(function TextBody({
  children,
  color,
  display,
  textAlign = 'start',
  noWrap = false,
  tnum = false,
  as: Tag = 'div',
  dangerouslySetClassName,
}) {
  return (
    <Tag
      style={{ display, color, textAlign }}
      className={cx(
        styles.body,
        noWrap && noLineWrap,
        tnum && tabularNumber,
        dangerouslySetClassName
      )}
    >
      {children}
    </Tag>
  );
});

export const TextLabel1: React.FC<TextProps> = React.memo(function TextLabel1({
  children,
  color,
  display,
  textAlign = 'start',
  noWrap = false,
  tnum = false,
  as: Tag = 'div',
  dangerouslySetClassName,
}) {
  return (
    <Tag
      style={{ display, color, textAlign }}
      className={cx(
        styles.label1,
        noWrap && noLineWrap,
        tnum && tabularNumber,
        dangerouslySetClassName
      )}
    >
      {children}
    </Tag>
  );
});

export const TextLabel2: React.FC<TextProps> = React.memo(function TextLabel2({
  children,
  color,
  display,
  textAlign = 'start',
  noWrap = false,
  tnum = true,
  as: Tag = 'div',
  dangerouslySetClassName,
}) {
  return (
    <Tag
      style={{ display, color, textAlign }}
      className={cx(
        styles.label2,
        noWrap && noLineWrap,
        tnum && tabularNumber,
        dangerouslySetClassName
      )}
    >
      {children}
    </Tag>
  );
});

export const TextCaption: React.FC<TextProps> = React.memo(function TextCaption({
  children,
  color,
  display,
  textAlign = 'start',
  noWrap = false,
  tnum = true,
  as: Tag = 'div',
  dangerouslySetClassName,
}) {
  return (
    <Tag
      style={{ display, color, textAlign }}
      className={cx(
        styles.caption,
        noWrap && noLineWrap,
        tnum && tabularNumber,
        dangerouslySetClassName
      )}
    >
      {children}
    </Tag>
  );
});

export const TextLegal: React.FC<TextProps> = React.memo(function TextLegal({
  children,
  color,
  display,
  textAlign = 'start',
  noWrap = false,
  tnum = false,
  as: Tag = 'div',
  dangerouslySetClassName,
}) {
  return (
    <Tag
      style={{ display, color, textAlign }}
      className={cx(
        styles.legal,
        noWrap && noLineWrap,
        tnum && tabularNumber,
        dangerouslySetClassName
      )}
    >
      {children}
    </Tag>
  );
});
