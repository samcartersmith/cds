import React, { Children, isValidElement, useMemo } from 'react';
import { type LinariaClassName, css } from '@linaria/core';
import type {
  RemoteImageBaseProps,
  RemoteImageGroupBaseProps,
  Shape,
} from '@cbhq/cds-common2/types';

import { useTheme } from '../hooks/useTheme';
import { Box } from '../layout/Box';
import { Text } from '../typography/Text';

const borderRadiusStyles: Record<Shape, LinariaClassName> = {
  circle: css`
    border-radius: 100%;
  `,
  square: css`
    border-radius: 4px;
  `,
  hexagon: css`
    border-radius: 0;
  `,
  squircle: css`
    border-radius: 8px;
  `,
  rectangle: css`
    border-radius: 0;
  `,
};

export const RemoteImageGroup = ({
  children,
  size = 'm',
  max = 4,
  shape = 'circle',
  testID,
  ...props
}: RemoteImageGroupBaseProps) => {
  const { avatarSize } = useTheme();

  const borderRadius = borderRadiusStyles[shape];
  const sizeAsNumber = typeof size === 'number' ? size : avatarSize[size];
  const overlapSpacing = sizeAsNumber <= 40 ? 8 : 16;

  const excess = Children.count(children) - max;
  const groupChildren = useMemo(() => {
    const arrayChildren = Children.toArray(children);

    if (excess > 0) {
      return arrayChildren.slice(0, -excess);
    }

    return arrayChildren;
  }, [children, excess]);

  return (
    <Box alignItems="center" display="flex" position="relative" testID={testID} {...props}>
      {groupChildren.map((child, index) => {
        if (!isValidElement(child)) {
          return null;
        }

        // dynamically apply uniform sizing and shape to all RemoteImage children elements
        const clonedChild = React.cloneElement<RemoteImageBaseProps>(child as React.ReactElement, {
          width: sizeAsNumber,
          height: sizeAsNumber,
          ...(child.props.shape ? undefined : { shape }),
        });

        // zIndex is progressively lower so that each child is stacked below the previous one
        const zIndex = -index;

        return (
          <Box
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            left={index === 0 ? 'initial' : overlapSpacing * zIndex}
            position="relative"
            testID={`${testID ? `${testID}-` : ''}inner-box-${index}`}
            zIndex={zIndex}
          >
            {clonedChild}
          </Box>
        );
      })}
      {excess > 0 && (
        <Box
          alignItems="center"
          background="bgOverlay"
          className={borderRadius}
          height={sizeAsNumber}
          justifyContent="center"
          left={groupChildren.length * overlapSpacing * -1}
          position="relative"
          width={sizeAsNumber}
          zIndex={groupChildren.length * -1}
        >
          <Text
            font="legal"
            style={{
              fontSize: sizeAsNumber * 0.4,
            }}
            testID={`${testID}-excess-text`}
          >
            +{excess}
          </Text>
        </Box>
      )}
    </Box>
  );
};
