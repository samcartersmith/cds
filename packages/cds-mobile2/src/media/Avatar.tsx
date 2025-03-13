import React, { memo, useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { colorSchemeMap } from '@cbhq/cds-common2/tokens/avatar';
import { AvatarBaseProps } from '@cbhq/cds-common2/types/AvatarBaseProps';
import { getAccessibleColor } from '@cbhq/cds-common2/utils/getAccessibleColor';

import { useTheme } from '../hooks/useTheme';
import { Box } from '../layout';
import { Text } from '../typography/Text';

import { RemoteImage } from './RemoteImage';
import { shapeStyles } from './RemoteImageGroup';

const smallAvatarSize = 44;
const borderWidth = 2;
export const coloredFallbackTestID = 'cds-avatar-colored-fallback';

export const fallbackImageSrc =
  'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD//gA7Q1JFQVRPUjogZ2QtanBlZyB2MS4wICh1c2luZyBJSkcgSlBFRyB2NjIpLCBxdWFsaXR5ID0gOTAK/9sAQwADAgIDAgIDAwMDBAMDBAUIBQUEBAUKBwcGCAwKDAwLCgsLDQ4SEA0OEQ4LCxAWEBETFBUVFQwPFxgWFBgSFBUU/9sAQwEDBAQFBAUJBQUJFA0LDRQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQU/8AAEQgAOAA4AwEiAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKC//EALUQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKC//EALURAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/aAAwDAQACEQMRAD8A+t80Zo4o4oAM0ZrsPBvw7m8Sxi7uZDa2GcKwHzyeu30HvXdf8Kp0Dytnlz7v+ennHP8Ah+lAHiuaM12XjL4dTeG4jd2sjXViDhiR88f1x1HvXG8UAGaKOKKADI9Kkt4vtFxFEOC7Bc/U4qPJ9KVXZGDLwwOQaAPpS0tY7G1ht4VCRRKEVcdABipc1meG9eh8RaRBeRMNzACRB1R+4/z2rU/OgCK5t47y3lgmUPFKpR1I6gjBr5uu4fst1NCefLdkz64OK+g/EWuQ+HtJnvJmHyjCIerv2Ar55klaWRnblmJJPqaAG5HpRRk+lFABzVnTtOutWvY7W0iMs8hwqj+Z9BVbB9a9o+GXhlNI0VL2VR9rvFD5PVY/4R+PX8vSgCfwX4EXwsDNJdSTXTrh1RisQ/Dv9T+QrrP89aT8qPyoA5Txr4FHilRNHdSQ3Ua4RHYtEfw7fUfrXjOo6dc6Tey2t3EYp4zgqf5j1FfSP5VxvxN8Mpq+jPfRKPtlmpfI6tH/ABD8Ov5+tAHi/NFGDRQBY060+3aja22f9dKsf5kD+tfSKIsaKigKqjAAHAFFFAC/j+lL+P6UUUAH4/pTXRZEZGG5WGCCOooooA+btRtPsOoXVtn/AFMrR/kSKKKKAP/Z';

export const Avatar = memo(
  ({
    src,
    shape = 'circle',
    size = 'l',
    borderColor,
    testID,
    dangerouslySetSize,
    colorScheme: colorSchemeProp,
    name,
  }: AvatarBaseProps) => {
    const imgSrc = src ?? fallbackImageSrc;
    const shapeStyle = shapeStyles[shape];
    const theme = useTheme();
    const avatarSize = theme.avatarSize[size];
    const placeholderLetter = name?.charAt(0);
    const isLargestSize = size.includes('xx');
    const isCustomSize = typeof dangerouslySetSize !== 'undefined';
    const isCustomSizeAndSmall = isCustomSize && dangerouslySetSize <= smallAvatarSize;
    const colorScheme = colorSchemeMap[colorSchemeProp ?? 'blue'];
    const colorSchemeRgb = `rgb(${theme.spectrum[colorScheme]})`;
    const fallbackTextColor = useMemo(
      () => getAccessibleColor({ background: colorSchemeRgb }),
      [colorSchemeRgb],
    );

    const computedSize = dangerouslySetSize ?? avatarSize;
    const shouldShowAvatarImage = !!src || !name;
    // only show a border for normal and fallback image treatments
    const hasBorder = shouldShowAvatarImage && borderColor && shape !== 'hexagon';

    const avatarText = useMemo(() => {
      if (isLargestSize || (isCustomSize && !isCustomSizeAndSmall)) {
        return (
          <Text
            align="center"
            dangerouslySetColor={fallbackTextColor}
            font="title2"
            textTransform="uppercase"
          >
            {placeholderLetter}
          </Text>
        );
      }
      if (size === 'm' || isCustomSizeAndSmall) {
        return (
          <Text
            align="center"
            dangerouslySetColor={fallbackTextColor}
            font="caption"
            textTransform="uppercase"
          >
            {placeholderLetter}
          </Text>
        );
      }

      return (
        <Text align="center" dangerouslySetColor={fallbackTextColor} textTransform="uppercase">
          {placeholderLetter}
        </Text>
      );
    }, [
      isLargestSize,
      isCustomSize,
      isCustomSizeAndSmall,
      size,
      fallbackTextColor,
      placeholderLetter,
    ]);

    const coloredFallback = useMemo(() => {
      return (
        <Box
          alignItems="center"
          dangerouslySetBackground={colorSchemeRgb}
          height="100%"
          justifyContent="center"
          style={shapeStyle}
          testID={coloredFallbackTestID}
          width="100%"
        >
          {avatarText}
        </Box>
      );
    }, [avatarText, shapeStyle, colorSchemeRgb]);

    return (
      <Box
        alignItems="center"
        borderColor={borderColor}
        dangerouslySetBackground={imgSrc}
        flexGrow={0}
        flexShrink={0}
        height={computedSize}
        justifyContent="center"
        overflow="hidden"
        position="relative"
        style={hasBorder ? [styles.border, shapeStyle] : shapeStyle}
        testID={testID}
        width={computedSize}
      >
        {shouldShowAvatarImage ? (
          <RemoteImage
            height={computedSize}
            resizeMode="cover"
            shape={shape}
            source={{ uri: imgSrc }}
            testID={`${testID ?? ''}-image`}
            width={computedSize}
          />
        ) : (
          coloredFallback
        )}
      </Box>
    );
  },
);

const styles = StyleSheet.create({
  border: {
    borderWidth,
  },
});
