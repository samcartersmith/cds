/**
 * DO NOT MODIFY
 * Generated from scripts/codegen/typography.ts based on definitions in
 * src/styles/typography/typography.ts
 */
import * as React from 'react';

import { TextProps } from '@cb/design-system-web/components/Text/TextProps';
import { useScale } from '@cb/design-system-web/primitives/scale/context';
import { getStyleName } from '@cb/design-system-web/primitives/typography/generateTypeStyles';
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
  const scale = useScale();

  return (
    <h1
      style={{ display, color, textAlign }}
      className={cx(
        (styles as { [key: string]: string })[getStyleName('Display1', scale)],
        noWrap && noLineWrap,
        tnum && tabularNumber
      )}
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
  const scale = useScale();

  return (
    <h1
      style={{ display, color, textAlign }}
      className={cx(
        (styles as { [key: string]: string })[getStyleName('Display2', scale)],
        noWrap && noLineWrap,
        tnum && tabularNumber
      )}
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
  const scale = useScale();

  return (
    <h2
      style={{ display, color, textAlign }}
      className={cx(
        (styles as { [key: string]: string })[getStyleName('Title1', scale)],
        noWrap && noLineWrap,
        tnum && tabularNumber
      )}
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
  const scale = useScale();

  return (
    <h2
      style={{ display, color, textAlign }}
      className={cx(
        (styles as { [key: string]: string })[getStyleName('Title2', scale)],
        noWrap && noLineWrap,
        tnum && tabularNumber
      )}
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
  const scale = useScale();

  return (
    <h3
      style={{ display, color, textAlign }}
      className={cx(
        (styles as { [key: string]: string })[getStyleName('Title3', scale)],
        noWrap && noLineWrap,
        tnum && tabularNumber
      )}
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
  const scale = useScale();

  return (
    <h4
      style={{ display, color, textAlign }}
      className={cx(
        (styles as { [key: string]: string })[getStyleName('Headline', scale)],
        noWrap && noLineWrap,
        tnum && tabularNumber
      )}
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
  const scale = useScale();

  return (
    <Tag
      style={{ display, color, textAlign }}
      className={cx(
        (styles as { [key: string]: string })[getStyleName('Body', scale)],
        noWrap && noLineWrap,
        tnum && tabularNumber
      )}
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
  const scale = useScale();

  return (
    <Tag
      style={{ display, color, textAlign }}
      className={cx(
        (styles as { [key: string]: string })[getStyleName('Label1', scale)],
        noWrap && noLineWrap,
        tnum && tabularNumber
      )}
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
  const scale = useScale();

  return (
    <Tag
      style={{ display, color, textAlign }}
      className={cx(
        (styles as { [key: string]: string })[getStyleName('Label2', scale)],
        noWrap && noLineWrap,
        tnum && tabularNumber
      )}
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
  const scale = useScale();

  return (
    <Tag
      style={{ display, color, textAlign }}
      className={cx(
        (styles as { [key: string]: string })[getStyleName('Caption', scale)],
        noWrap && noLineWrap,
        tnum && tabularNumber
      )}
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
  const scale = useScale();

  return (
    <Tag
      style={{ display, color, textAlign }}
      className={cx(
        (styles as { [key: string]: string })[getStyleName('Legal', scale)],
        noWrap && noLineWrap,
        tnum && tabularNumber
      )}
    >
      {children}
    </Tag>
  );
});
