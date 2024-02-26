import React, { memo } from 'react';
import { css } from 'linaria';
import { cardSizes } from '@cbhq/cds-common/tokens/card';
import type { CardBaseProps, ResponsiveProps } from '@cbhq/cds-common/types';

import { usePinStyles } from '../hooks/usePinStyles';
import { VStack } from '../layout/VStack';
import { LinkableProps, Pressable } from '../system/Pressable';
import { cx } from '../utils/linaria';

const cardPressableStyles = css`
  padding: 0;
`;

export type CardProps = {
  /** Specify props by device breakpoint */
  responsiveConfig?: ResponsiveProps;
} & CardBaseProps &
  LinkableProps;

export const Card: React.FC<React.PropsWithChildren<CardProps>> = memo(
  ({
    children,
    background = 'background',
    size = 'large',
    onPress,
    onKeyPress,
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
    ...props
  }) => {
    const width = widthProps ?? cardSizes[size].width;
    const height = heightProps ?? cardSizes[size].height;
    const bg = background === true ? 'background' : background;
    const pinStyles = usePinStyles(pin);
    const linkable = Boolean(onPress ?? onKeyPress ?? to ?? href);

    const content = (
      <VStack
        background={linkable ? undefined : bg}
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
        background={bg}
        className={cx(cardPressableStyles, pinStyles)}
        height={height}
        href={href}
        onKeyPress={onKeyPress}
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
  },
);

Card.displayName = 'Card';
