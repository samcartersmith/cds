import React, { useCallback, memo } from 'react';

import { cardSizes } from '@cbhq/cds-common/tokens/card';
import type { BorderWidth, CardBaseProps, ElevationLevels } from '@cbhq/cds-common/types';
import { css } from 'linaria';
import { cx } from '../utils/linaria';

import { usePinStyles } from '../hooks/usePinStyles';
import { LinkableProps, Pressable } from '../system/Pressable';
import { VStack } from '../layout/VStack';
import { useFeatureFlag } from '../system/useFeatureFlag';

const cardPressableStyles = css`
  padding: 0;
`;

export type CardProps = CardBaseProps & LinkableProps;

export const Card: React.FC<CardProps> = memo(
  ({
    children,
    background = 'background',
    elevation = 1,
    size = 'large',
    onPress,
    to,
    pin,
    width: widthProps,
    height: heightProps,
    testID,
    ...props
  }) => {
    const isFrontier = useFeatureFlag('frontierCard');
    const width = widthProps ?? cardSizes[size].width;
    const height = heightProps ?? cardSizes[size].height;
    const bg = background === true ? 'background' : background;
    const pinStyles = usePinStyles(pin);
    const linkable = Boolean(onPress ?? to);
    const borderColor = isFrontier ? undefined : 'line';
    const borderRadius = isFrontier ? undefined : 'standard';

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
        borderRadius={borderRadius}
        background={linkable ? undefined : bg}
        pin={linkable ? undefined : pin}
        elevation={getElevation(linkable ? undefined : elevation)}
        width={linkable ? undefined : width}
        height={linkable ? undefined : height}
        overflow="hidden"
        testID={linkable ? undefined : testID}
        {...props}
      >
        {children}
      </VStack>
    );

    return linkable ? (
      <Pressable
        backgroundColor={bg}
        borderRadius={borderRadius}
        borderColor={borderColor}
        borderWidth={getBorderWidth('card')}
        elevation={getElevation(elevation)}
        onPress={onPress}
        className={cx(cardPressableStyles, pinStyles)}
        to={to}
        width={width}
        height={height}
        testID={testID}
      >
        {content}
      </Pressable>
    ) : (
      content
    );
  },
);

Card.displayName = 'Card';
