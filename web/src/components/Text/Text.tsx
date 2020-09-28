/**
 * DO NOT MODIFY
 * Generated from scripts/codegen/main.ts
 */
import * as React from 'react';

import { TextProps } from '@cb/design-system-web/components/Text/TextProps';
import * as styles from '@cb/design-system-web/primitives/typography/styles';
import { css, cx } from 'linaria';

const noLineWrap = css`
  white-space: nowrap;
`;

const tabularNumber = css`
  font-feature-settings: 'tnum';
`;

export const TextDisplay1: React.FC<Omit<TextProps, 'as'>> = React.memo(function TextDisplay1({
  children,
  color,
  display = 'initial',
  textAlign = 'start',
  noWrap = false,
  tnum = false,
}) {
  return (
    <h1
      style={{ display, color, textAlign }}
      className={cx(styles.display1, noWrap && noLineWrap, tnum && tabularNumber)}
    >
      {children}
    </h1>
  );
});

export const TextDisplay2: React.FC<Omit<TextProps, 'as'>> = React.memo(function TextDisplay2({
  children,
  color,
  display = 'initial',
  textAlign = 'start',
  noWrap = false,
  tnum = false,
}) {
  return (
    <h1
      style={{ display, color, textAlign }}
      className={cx(styles.display2, noWrap && noLineWrap, tnum && tabularNumber)}
    >
      {children}
    </h1>
  );
});

export const TextTitle1: React.FC<Omit<TextProps, 'as'>> = React.memo(function TextTitle1({
  children,
  color,
  display = 'initial',
  textAlign = 'start',
  noWrap = false,
  tnum = false,
}) {
  return (
    <h2
      style={{ display, color, textAlign }}
      className={cx(styles.title1, noWrap && noLineWrap, tnum && tabularNumber)}
    >
      {children}
    </h2>
  );
});

export const TextTitle2: React.FC<Omit<TextProps, 'as'>> = React.memo(function TextTitle2({
  children,
  color,
  display = 'initial',
  textAlign = 'start',
  noWrap = false,
  tnum = false,
}) {
  return (
    <h2
      style={{ display, color, textAlign }}
      className={cx(styles.title2, noWrap && noLineWrap, tnum && tabularNumber)}
    >
      {children}
    </h2>
  );
});

export const TextTitle3: React.FC<Omit<TextProps, 'as'>> = React.memo(function TextTitle3({
  children,
  color,
  display = 'initial',
  textAlign = 'start',
  noWrap = false,
  tnum = false,
}) {
  return (
    <h3
      style={{ display, color, textAlign }}
      className={cx(styles.title3, noWrap && noLineWrap, tnum && tabularNumber)}
    >
      {children}
    </h3>
  );
});

export const TextHeadline: React.FC<Omit<TextProps, 'as'>> = React.memo(function TextHeadline({
  children,
  color,
  display = 'initial',
  textAlign = 'start',
  noWrap = false,
  tnum = false,
}) {
  return (
    <h4
      style={{ display, color, textAlign }}
      className={cx(styles.headline, noWrap && noLineWrap, tnum && tabularNumber)}
    >
      {children}
    </h4>
  );
});

export const TextBody: React.FC<TextProps> = React.memo(function TextBody({
  children,
  color,
  display = 'initial',
  textAlign = 'start',
  noWrap = false,
  tnum = false,
  as: Tag = 'span',
}) {
  return (
    <Tag
      style={{ display, color, textAlign }}
      className={cx(styles.body, noWrap && noLineWrap, tnum && tabularNumber)}
    >
      {children}
    </Tag>
  );
});

export const TextLabel1: React.FC<TextProps> = React.memo(function TextLabel1({
  children,
  color,
  display = 'initial',
  textAlign = 'start',
  noWrap = false,
  tnum = false,
  as: Tag = 'span',
}) {
  return (
    <Tag
      style={{ display, color, textAlign }}
      className={cx(styles.label1, noWrap && noLineWrap, tnum && tabularNumber)}
    >
      {children}
    </Tag>
  );
});

export const TextLabel2: React.FC<TextProps> = React.memo(function TextLabel2({
  children,
  color,
  display = 'initial',
  textAlign = 'start',
  noWrap = false,
  tnum = true,
  as: Tag = 'span',
}) {
  return (
    <Tag
      style={{ display, color, textAlign }}
      className={cx(styles.label2, noWrap && noLineWrap, tnum && tabularNumber)}
    >
      {children}
    </Tag>
  );
});

export const TextCaption: React.FC<TextProps> = React.memo(function TextCaption({
  children,
  color,
  display = 'initial',
  textAlign = 'start',
  noWrap = false,
  tnum = true,
  as: Tag = 'span',
}) {
  return (
    <Tag
      style={{ display, color, textAlign }}
      className={cx(styles.caption, noWrap && noLineWrap, tnum && tabularNumber)}
    >
      {children}
    </Tag>
  );
});

export const TextLegal: React.FC<TextProps> = React.memo(function TextLegal({
  children,
  color,
  display = 'initial',
  textAlign = 'start',
  noWrap = false,
  tnum = false,
  as: Tag = 'p',
}) {
  return (
    <Tag
      style={{ display, color, textAlign }}
      className={cx(styles.legal, noWrap && noLineWrap, tnum && tabularNumber)}
    >
      {children}
    </Tag>
  );
});
