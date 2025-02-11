import React, { HTMLAttributes, memo } from 'react';
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
  LinkableProps & {
    // TODO (DX-4652): These key handling props have been kept for bw compatibility since they are valid props for a dif
    // it would be better to have Card extend the entire Box interface instead of arbitrarily picking these two
    onKeyDown?: HTMLAttributes<HTMLElement>['onKeyDown'];
    onKeyUp?: HTMLAttributes<HTMLElement>['onKeyUp'];
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
  elevation,
  ...props
}) {
  const width = widthProps ?? cardSizes[size].width;
  const height = heightProps ?? cardSizes[size].height;
  const linkable = Boolean(onPress ?? onKeyDown ?? to ?? href);

  const content = (
    <VStack
      background={linkable ? undefined : background}
      borderRadius={borderRadius}
      elevation={linkable ? undefined : elevation}
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
      elevation={elevation}
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
