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

export const TextDisplay1: React.FC<TextProps> = React.memo(function TextDisplay1({
  children,
  color,
  display = 'initial',
  textAlign = 'start',
  noWrap = false,
  tnum = false,
  as,
}) {
  const Tag = as || 'h1';

  return (
    <Tag
      style={{ display, color, textAlign }}
      className={cx(styles.graphik, styles.display1, noWrap && noLineWrap, tnum && tabularNumber)}
    >
      {children}
    </Tag>
  );
});

export const TextDisplay2: React.FC<TextProps> = React.memo(function TextDisplay2({
  children,
  color,
  display = 'initial',
  textAlign = 'start',
  noWrap = false,
  tnum = false,
  as,
}) {
  const Tag = as || 'h2';

  return (
    <Tag
      style={{ display, color, textAlign }}
      className={cx(styles.graphik, styles.display2, noWrap && noLineWrap, tnum && tabularNumber)}
    >
      {children}
    </Tag>
  );
});

export const TextTitle1: React.FC<TextProps> = React.memo(function TextTitle1({
  children,
  color,
  display = 'initial',
  textAlign = 'start',
  noWrap = false,
  tnum = false,
  as,
}) {
  const Tag = as || 'h3';

  return (
    <Tag
      style={{ display, color, textAlign }}
      className={cx(styles.graphik, styles.title1, noWrap && noLineWrap, tnum && tabularNumber)}
    >
      {children}
    </Tag>
  );
});

export const TextTitle2: React.FC<TextProps> = React.memo(function TextTitle2({
  children,
  color,
  display = 'initial',
  textAlign = 'start',
  noWrap = false,
  tnum = false,
  as,
}) {
  const Tag = as || 'h4';

  return (
    <Tag
      style={{ display, color, textAlign }}
      className={cx(styles.graphik, styles.title2, noWrap && noLineWrap, tnum && tabularNumber)}
    >
      {children}
    </Tag>
  );
});

export const TextTitle3: React.FC<TextProps> = React.memo(function TextTitle3({
  children,
  color,
  display = 'initial',
  textAlign = 'start',
  noWrap = false,
  tnum = false,
  as,
}) {
  const Tag = as || 'h5';

  return (
    <Tag
      style={{ display, color, textAlign }}
      className={cx(styles.graphik, styles.title3, noWrap && noLineWrap, tnum && tabularNumber)}
    >
      {children}
    </Tag>
  );
});

export const TextHeadline: React.FC<TextProps> = React.memo(function TextHeadline({
  children,
  color,
  display = 'initial',
  textAlign = 'start',
  noWrap = false,
  tnum = false,
  as,
}) {
  const Tag = as || 'h6';

  return (
    <Tag
      style={{ display, color, textAlign }}
      className={cx(styles.inter, styles.headline, noWrap && noLineWrap, tnum && tabularNumber)}
    >
      {children}
    </Tag>
  );
});

export const TextBody: React.FC<TextProps> = React.memo(function TextBody({
  children,
  color,
  display = 'initial',
  textAlign = 'start',
  noWrap = false,
  tnum = false,
  as: Tag = 'div',
}) {
  return (
    <Tag
      style={{ display, color, textAlign }}
      className={cx(styles.inter, styles.body, noWrap && noLineWrap, tnum && tabularNumber)}
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
  as: Tag = 'div',
}) {
  return (
    <Tag
      style={{ display, color, textAlign }}
      className={cx(styles.inter, styles.label1, noWrap && noLineWrap, tnum && tabularNumber)}
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
  as: Tag = 'div',
}) {
  return (
    <Tag
      style={{ display, color, textAlign }}
      className={cx(styles.inter, styles.label2, noWrap && noLineWrap, tnum && tabularNumber)}
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
  as: Tag = 'div',
}) {
  return (
    <Tag
      style={{ display, color, textAlign }}
      className={cx(styles.inter, styles.caption, noWrap && noLineWrap, tnum && tabularNumber)}
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
      className={cx(styles.inter, styles.legal, noWrap && noLineWrap, tnum && tabularNumber)}
    >
      {children}
    </Tag>
  );
});
