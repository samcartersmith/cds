import React, { memo } from 'react';
import { type LinariaClassName, css, cx } from '@linaria/core';
import { cardSizes } from '@cbhq/cds-common2/tokens/card';
import type { CardBaseProps, PinningDirection } from '@cbhq/cds-common2/types';

import { VStack } from '../layout/VStack';
import { type LinkableProps, Pressable } from '../system/Pressable';

const pinStyle: Record<PinningDirection, LinariaClassName> = {
  top: css`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
  `,
  bottom: css`
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
  `,
  right: css`
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
  `,
  left: css`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
  `,
  all: css`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  `,
};

export type CardProps = CardBaseProps &
  Omit<LinkableProps, 'onKeyUp' | 'onKeyDown'> & {
    // keyboard handlers will be removed in an upcoming refactor of Pressable
    /** @deprecated key event handlers are not necessary for handling press */
    onKeyDown?: LinkableProps['onKeyDown'];
    /** @deprecated key event handlers are not necessary for handling press */
    onKeyUp?: LinkableProps['onKeyUp'];
  };

export const Card = memo<CardProps>(function Card({
  children,
  background = 'bg',
  size = 'large',
  onPress,
  onKeyDown,
  to,
  target,
  href,
  pin,
  width: widthProps,
  height: heightProps,
  accessibilityLabel,
  accessibilityLabelledBy,
  accessibilityHint,
  testID,
  borderRadius,
  ...props
}) {
  const width = widthProps ?? cardSizes[size].width;
  const height = heightProps ?? cardSizes[size].height;
  const linkable = Boolean(onPress ?? onKeyDown ?? to ?? href);

  const content = (
    <VStack
      background={linkable ? undefined : background}
      borderRadius={borderRadius}
      height={linkable ? undefined : height}
      overflow="hidden"
      pin={linkable ? undefined : pin}
      testID={linkable ? undefined : testID}
      width={linkable ? undefined : width}
      {...props}
    >
      {children}
    </VStack>
  );

  return linkable ? (
    <Pressable
      accessibilityHint={accessibilityHint}
      accessibilityLabel={accessibilityLabel}
      accessibilityLabelledBy={accessibilityLabelledBy}
      background={background}
      borderRadius={borderRadius}
      className={cx(pin && pinStyle[pin])}
      height={height}
      href={href}
      onKeyDown={onKeyDown}
      onPress={onPress}
      target={target}
      testID={testID}
      to={to}
      width={width}
    >
      {content}
    </Pressable>
  ) : (
    content
  );
});

Card.displayName = 'Card';
