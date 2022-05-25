import React, { Children, isValidElement, useMemo } from 'react';
import { StyleSheet, Text } from 'react-native';
import { normalScaleMap } from '@cbhq/cds-common/hooks/useIconSize';
import { useShapeToBorderRadiusAlias } from '@cbhq/cds-common/hooks/useShapeToBorderRadiusAlias';
import { useAvatarSize } from '@cbhq/cds-common/media/useAvatarSize';
import { RemoteImageBaseProps } from '@cbhq/cds-common/types/RemoteImageBaseProps';
import { RemoteImageGroupBaseProps } from '@cbhq/cds-common/types/RemoteImageGroupBaseProps';

import { usePalette } from '../hooks/usePalette';
import { Box } from '../layout/Box';
import { TextBody } from '../typography';
import { useTypographyStyles } from '../typography/useTypographyStyles';

export const RemoteImageGroup = ({
  children,
  size = 'm',
  max = 4,
  shape = 'circle',
  testID,
  ...props
}: RemoteImageGroupBaseProps) => {
  const arrayChildren = Children.toArray(children);
  const palette = usePalette();

  const borderRadius = useShapeToBorderRadiusAlias(shape);
  const sizeIsString = typeof size === 'string';
  const sizeIsNumber = typeof size === 'number';

  // obtain avatar size
  // set the avatar size to m, if no size was set
  const letterSizeOfAvatar = sizeIsString ? size : 'm';
  const avatarSize = useAvatarSize(letterSizeOfAvatar);

  const excessSize = sizeIsNumber ? size : avatarSize;

  // Has more children than max can handle
  const excess = arrayChildren.length - max;

  /**
   * Reversing the children is a great way to avoid using zIndex
   * to overlap the avatars
   */
  const reverseChildren = arrayChildren.reverse().splice(0, max);

  const showExcess = excess > 0;

  // Dynamically calculate font size based on size of remote image
  // so smaller excess image gets a smaller text, and larger excess
  // image gets a larger text
  const { fontFamily } = useTypographyStyles('body');
  const typographyStyles = useMemo(() => {
    return {
      fontFamily,
      color: palette.foreground,
      fontSize: (sizeIsNumber ? size : avatarSize) * 0.4,
    };
  }, [fontFamily, palette.foreground, sizeIsNumber, size, avatarSize]);

  return (
    <Box
      alignItems="center"
      flexDirection="row-reverse"
      justifyContent="flex-end"
      testID={testID}
      {...props}
    >
      {showExcess && (
        <Box
          height={excessSize}
          width={excessSize}
          offsetStart={0.5}
          borderRadius={borderRadius}
          alignItems="center"
          background="backgroundOverlay"
          justifyContent="center"
        >
          {/** We don't want the font size to infinitely scale, so we have a stop gap */}
          {sizeIsNumber && size > normalScaleMap.l ? (
            <TextBody testID={`${testID}-excess-text`}>{`+${excess}`}</TextBody>
          ) : (
            <Text
              testID={`${testID}-excess-text`}
              style={[typographyStyles, styles.centerText]}
            >{`+${excess}`}</Text>
          )}
        </Box>
      )}
      {Children.map(reverseChildren, (child, index) => {
        const isFirstRemoteImage = index === 0;

        if (isValidElement(child)) {
          let overrideChildProps: {
            testID: string;
          } & Pick<RemoteImageBaseProps, 'height' | 'width'> &
            Pick<RemoteImageGroupBaseProps, 'size' | 'shape'> = {
            testID: `${testID}-image-${index}`,
          };

          if (sizeIsString) {
            overrideChildProps = {
              ...overrideChildProps,
              size,
            };
          } else if (sizeIsNumber) {
            // yes, we don't want to carry the
            // size from the above statement. Its either
            // use this size or the size above
            overrideChildProps = {
              ...overrideChildProps,
              width: size,
              height: size,
            };
          } else {
            // No size was set, carry the default
            // avatarSize of m to child
            overrideChildProps = {
              ...overrideChildProps,
              width: avatarSize,
              height: avatarSize,
            };
          }

          if (shape) {
            overrideChildProps = {
              ...overrideChildProps,
              shape,
            };
          }

          const clonedChild = React.cloneElement(child, overrideChildProps);

          return (
            <Box testID={`${testID}-inner-box-${index}`} offsetEnd={isFirstRemoteImage ? 0 : 0.5}>
              {clonedChild}
            </Box>
          );
        }

        return null;
      })}
    </Box>
  );
};
const styles = StyleSheet.create({
  centerText: {
    textAlign: 'center',
  },
});
