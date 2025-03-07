import React, { type HTMLAttributes, memo, useMemo } from 'react';
import { cardSizes } from '@cbhq/cds-common2/tokens/card';
import type { CardBaseProps } from '@cbhq/cds-common2/types';
import type { SharedAccessibilityProps } from '@cbhq/cds-common2/types';

import { VStack } from '../layout/VStack';
import { type PressableProps, Pressable } from '../system/Pressable';

export type CardProps = CardBaseProps & {
  // TODO (DX-4652): These key handling props have been kept for bw compatibility since they are valid props for a dif
  // it would be better to have Card extend the entire Box interface instead of arbitrarily picking these two
  onKeyDown?: HTMLAttributes<HTMLElement>['onKeyDown'];
  onKeyUp?: HTMLAttributes<HTMLElement>['onKeyUp'];
  onClick?: React.MouseEventHandler;
} & Pick<
    SharedAccessibilityProps,
    'accessibilityLabel' | 'accessibilityLabelledBy' | 'accessibilityHint'
  > &
  Pick<PressableProps<'a'>, 'href' | 'target'>;

export const Card = memo<CardProps>(function Card({
  children,
  background = 'bg',
  size = 'large',
  onClick,
  onKeyDown,
  onKeyUp,
  href,
  target,
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
  const isAnchor = Boolean(href);
  const isButton = Boolean(onClick ?? onKeyDown ?? onKeyUp);
  const linkable = isAnchor || isButton;

  const content = useMemo(
    () => (
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
    ),
    [background, borderRadius, children, elevation, height, linkable, pin, props, testID, width],
  );

  if (isAnchor) {
    return (
      <Pressable
        accessibilityHint={accessibilityHint}
        accessibilityLabel={accessibilityLabel}
        accessibilityLabelledBy={accessibilityLabelledBy}
        as="a"
        background={background}
        borderRadius={borderRadius}
        elevation={elevation}
        height={height}
        href={href}
        onClick={onClick}
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp}
        pin={pin}
        target={target}
        testID={testID}
        width={width}
      >
        {content}
      </Pressable>
    );
  }

  if (isButton) {
    return (
      <Pressable
        accessibilityHint={accessibilityHint}
        accessibilityLabel={accessibilityLabel}
        accessibilityLabelledBy={accessibilityLabelledBy}
        background={background}
        borderRadius={borderRadius}
        elevation={elevation}
        height={height}
        onClick={onClick}
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp}
        pin={pin}
        testID={testID}
        width={width}
      >
        {content}
      </Pressable>
    );
  }

  return content;
});

Card.displayName = 'Card';
