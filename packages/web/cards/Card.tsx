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
        accessibilityLabel={accessibilityLabel}
        accessibilityLabelledBy={accessibilityLabelledBy}
        accessibilityHint={accessibilityHint}
        backgroundColor={bg}
        borderRadius={borderRadius}
        borderColor={borderColor}
        borderWidth={getBorderWidth('card')}
        elevation={getElevation(elevation)}
        onPress={onPress}
        onKeyPress={onKeyPress}
        className={cx(cardPressableStyles, pinStyles)}
        to={to}
        target={target}
        href={href}
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
