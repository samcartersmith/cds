import React, { memo, useCallback } from 'react';
import { css } from 'linaria';
import { cardSizes } from '@cbhq/cds-common/tokens/card';
import type {
  BorderWidth,
  CardBaseProps,
  ElevationLevels,
  ResponsiveProps,
} from '@cbhq/cds-common/types';

import { usePinStyles } from '../hooks/usePinStyles';
import { VStack } from '../layout/VStack';
import { LinkableProps, Pressable } from '../system/Pressable';
import { useFeatureFlag } from '../system/useFeatureFlag';
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
    elevation = 1,
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
    const isFrontier = useFeatureFlag('frontierCard');
    const width = widthProps ?? cardSizes[size].width;
    const height = heightProps ?? cardSizes[size].height;
    const bg = background === true ? 'background' : background;
    const pinStyles = usePinStyles(pin);
    const linkable = Boolean(onPress ?? onKeyPress ?? to ?? href);
    const borderColor = isFrontier ? undefined : 'line';
    const borderRadius = isFrontier ? undefined : 'rounded';

    const getBorderWidth = useCallback(
      (borderWidth?: BorderWidth) => {
        if (isFrontier) {
          return undefined;
        }
        return borderWidth;
      },
      [isFrontier],
    );

    const getElevation = useCallback(
      (level?: ElevationLevels) => {
        if (isFrontier) {
          return undefined;
        }
        return level;
      },
      [isFrontier],
    );

    const content = (
      <VStack
        background={linkable ? undefined : bg}
        borderRadius={borderRadius}
        elevation={getElevation(linkable ? undefined : elevation)}
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
        backgroundColor={bg}
        borderColor={borderColor}
        borderRadius={borderRadius}
        borderWidth={getBorderWidth('card')}
        className={cx(cardPressableStyles, pinStyles)}
        elevation={getElevation(elevation)}
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
