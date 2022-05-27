import React, { Children, isValidElement, useMemo } from 'react';
import { useShapeToBorderRadiusAlias } from '@cbhq/cds-common/hooks/useShapeToBorderRadiusAlias';
import { useAvatarSize } from '@cbhq/cds-common/media/useAvatarSize';
import { RemoteImageGroupBaseProps } from '@cbhq/cds-common/types/RemoteImageGroupBaseProps';
import { getRemoteImageGroupOverlapSpacing } from '@cbhq/cds-common/utils/getRemoteImageGroupOverlapSpacing';

import { Box } from '../layout/Box';
import { palette } from '../tokens';
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

  const borderRadius = useShapeToBorderRadiusAlias(shape);
  const sizeIsString = typeof size === 'string';
  const sizeIsNumber = typeof size === 'number';
  const overlapSpacing = getRemoteImageGroupOverlapSpacing(size);

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
  const typographyStyles = useTypographyStyles('legal');

  const fontSizeStyle = useMemo(() => {
    return {
      fontSize: (sizeIsNumber ? size : avatarSize) * 0.4,
      color: palette.foreground,
      marginTop: 'auto',
      marginBottom: 'auto',
    };
  }, [sizeIsNumber, size, avatarSize]);

  return (
    <Box
      display="flex"
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
          offsetStart={overlapSpacing}
          borderRadius={borderRadius}
          alignItems="center"
          background="backgroundOverlay"
          justifyContent="center"
        >
          <p className={typographyStyles} style={fontSizeStyle}>{`+${excess}`}</p>
        </Box>
      )}
      {Children.map(reverseChildren, (child, index) => {
        const isFirstRemoteImage = index === 0;

        if (isValidElement(child)) {
          let overrideChildProps = {};

          if (sizeIsString) {
            overrideChildProps = {
              size,
            };
          } else if (sizeIsNumber) {
            // yes, we don't want to carry the
            // size from the above statement. Its either
            // use this size or the size above
            overrideChildProps = {
              width: size,
              height: size,
            };
          } else {
            // No size was set, carry the default
            // avatarSize of m to child
            overrideChildProps = {
              width: avatarSize,
              height: avatarSize,
            };
          }

          // The shape of its child shall take precedence
          if (shape && child.props.shape === undefined) {
            overrideChildProps = {
              ...overrideChildProps,
              shape,
            };
          }

          const clonedChild = React.cloneElement(child, overrideChildProps);

          return <Box offsetEnd={isFirstRemoteImage ? 0 : overlapSpacing}>{clonedChild}</Box>;
        }

        return null;
      })}
    </Box>
  );
};
