import React, { memo, useMemo } from 'react';
import { type LinariaClassName, css, cx } from '@linaria/core';
import type { AvatarSize } from '@cbhq/cds-common2';
import type { ThemeVars } from '@cbhq/cds-common2/core/theme';
import type { AvatarBaseProps, AvatarShape } from '@cbhq/cds-common2/types/AvatarBaseProps';

import { Box } from '../layout/Box';
import { Text } from '../typography/Text';

import { hexagonAvatarClipId, HexagonBorder } from './Hexagon';
import { RemoteImage } from './RemoteImage';

const wrapperStyles = css`
  // Styles the possible values of the colorScheme prop. Children elements will use CSS currentColor to inherit this color styles.
  &[data-colorscheme='blue'] {
    color: rgb(var(--blue60));
  }

  &[data-colorscheme='teal'] {
    color: rgb(var(--teal60));
  }

  &[data-colorscheme='purple'] {
    color: rgb(var(--purple60));
  }

  &[data-colorscheme='pink'] {
    color: rgb(var(--pink60));
  }

  &[data-colorscheme='green'] {
    color: rgb(var(--green60));
  }

  &[data-colorscheme='gray'] {
    // TO DO: in the original implementation the light and dark themes used different values for gray
    // we will need to find a value that works for both themes until we can detect/change themes in v8
    color: rgb(var(--gray60));
  }
`;

const avatarStyles = css`
  overflow: hidden;

  // it may have been unintentional, but in v7 downwards the unselected Avatar has a 1px transparent border on the inner div
  // to reduce visual regressions, this has been preserved in the migration for v8
  border: solid 1px var(--avatar-borderColor);
  &[data-bordered='true'] {
    border-width: 2px;
  }

  &[data-selected='true'] {
    // Box shadow is used to place a ring around the avatar in the color chosen by the colorScheme prop
    box-shadow: 0 0 0 2px currentColor;
  }

  &[data-shape='hexagon'] {
    border: none;
    // the shadow for the hex shape is applied using another technique since the normal shadow will be hidden by the clip path
    box-shadow: none;
    // this clips the element using the Hexagon svg element
    clip-path: url(#${hexagonAvatarClipId});
  }
`;

const borderRadiusStyles: Record<AvatarShape, LinariaClassName> = {
  circle: css`
    border-radius: 100%;
  `,
  square: css`
    border-radius: 4px;
  `,
  hexagon: css`
    border-radius: 0;
  `,
};

export type FallbackColor = Extract<
  ThemeVars.SpectrumHue,
  'blue' | 'purple' | 'green' | 'teal' | 'pink' | 'gray'
>;

export type AvatarWebProps = {
  /**
   * @danger Adds a className to the Avatar. If you pass in a className make sure your styles override the Avatar using the avatar class .cds-avatar like this: .my-class.cds-avatar
   */
  className?: string;
  /** Adds treatment that indicates that the Avatar is currently selected */
  selected?: boolean;
  /**
   * Override the default fallback background and border color
   * @default blue
   */
  colorScheme?: FallbackColor;
  /** Adds a border to the Avatar */
  borderColor?: ThemeVars.Color;
  // override the dangerous style prop to mark it as deprecated in the updated cds web package
  /**
   * @deprecated Use the style prop instead to set the width/height properties
   * @danger Creates a custom Avatar size. The size prop should be used in most circumstances.
   * This is an escape hatch when using the Avatar in a fixed size container where you cannot control the dimensions.
   */
  dangerouslySetSize?: number;
  /**
   * Applies inline styles to the container element
   */
  style?: React.CSSProperties;
} & Omit<AvatarBaseProps, 'colorScheme' | 'borderColor' | 'dangerouslySetSize'>;

export const fallbackImageSrc =
  'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD//gA7Q1JFQVRPUjogZ2QtanBlZyB2MS4wICh1c2luZyBJSkcgSlBFRyB2NjIpLCBxdWFsaXR5ID0gOTAK/9sAQwADAgIDAgIDAwMDBAMDBAUIBQUEBAUKBwcGCAwKDAwLCgsLDQ4SEA0OEQ4LCxAWEBETFBUVFQwPFxgWFBgSFBUU/9sAQwEDBAQFBAUJBQUJFA0LDRQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQU/8AAEQgAOAA4AwEiAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKC//EALUQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKC//EALURAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/aAAwDAQACEQMRAD8A+t80Zo4o4oAM0ZrsPBvw7m8Sxi7uZDa2GcKwHzyeu30HvXdf8Kp0Dytnlz7v+ennHP8Ah+lAHiuaM12XjL4dTeG4jd2sjXViDhiR88f1x1HvXG8UAGaKOKKADI9Kkt4vtFxFEOC7Bc/U4qPJ9KVXZGDLwwOQaAPpS0tY7G1ht4VCRRKEVcdABipc1meG9eh8RaRBeRMNzACRB1R+4/z2rU/OgCK5t47y3lgmUPFKpR1I6gjBr5uu4fst1NCefLdkz64OK+g/EWuQ+HtJnvJmHyjCIerv2Ar55klaWRnblmJJPqaAG5HpRRk+lFABzVnTtOutWvY7W0iMs8hwqj+Z9BVbB9a9o+GXhlNI0VL2VR9rvFD5PVY/4R+PX8vSgCfwX4EXwsDNJdSTXTrh1RisQ/Dv9T+QrrP89aT8qPyoA5Txr4FHilRNHdSQ3Ua4RHYtEfw7fUfrXjOo6dc6Tey2t3EYp4zgqf5j1FfSP5VxvxN8Mpq+jPfRKPtlmpfI6tH/ABD8Ov5+tAHi/NFGDRQBY060+3aja22f9dKsf5kD+tfSKIsaKigKqjAAHAFFFAC/j+lL+P6UUUAH4/pTXRZEZGG5WGCCOooooA+btRtPsOoXVtn/AFMrR/kSKKKKAP/Z';

export const Avatar = memo(
  ({
    alt,
    src,
    shape = 'circle',
    size = 'l',
    borderColor,
    className,
    testID,
    dangerouslySetSize,
    selected,
    colorScheme: colorSchemeProp = 'blue',
    name,
    style = {},
  }: AvatarWebProps) => {
    const avatarSize = `var(--avatarSize-${size})`;
    const userProvidedSize = style?.width ?? style?.height ?? dangerouslySetSize;
    const computedSize = userProvidedSize ?? avatarSize;

    const avatarText = useMemo(() => {
      const placeholderLetter = name?.charAt(0);

      // to maintain backwards compatibility with the dangerouslySetSize prop (now deprecated)
      // we want to make sure the placeholder letter responds nicely with the set size
      // we do this by picking an arbitrary constant to scale the text by
      // we intentionally are not doing the same treatment for sizes set with the inline style prop
      if (dangerouslySetSize) {
        return (
          <Text
            as="p"
            color="fgInverse"
            font="title2"
            // scope is already memoized
            // eslint-disable-next-line react-perf/jsx-no-new-object-as-prop
            style={{ transform: `scale(${dangerouslySetSize * 0.02})` }}
            textAlign="center"
            transform="uppercase"
          >
            {placeholderLetter}
          </Text>
        );
      }

      const largeStandardSizes: AvatarSize[] = ['xxxl', 'xxl'];
      const showLargerFont = largeStandardSizes.includes(size);
      return (
        <Text
          as="p"
          color="fgInverse"
          font={showLargerFont ? 'title2' : 'body'}
          textAlign="center"
          transform="uppercase"
        >
          {placeholderLetter}
        </Text>
      );
    }, [name, size, dangerouslySetSize]);

    const avatarInlineStyles = useMemo(() => {
      return {
        width: computedSize,
        height: computedSize,
        ...style,
        '--avatar-borderColor': borderColor
          ? `var(--color-${borderColor})`
          : 'var(--color-transparent)',
      } as React.CSSProperties;
    }, [style, computedSize, borderColor]);

    const fallbackStyle = useMemo(
      () => ({
        background: 'currentColor',
      }),
      [],
    );

    return (
      // set position required to place the HexagonBorder elements properly
      <Box className={wrapperStyles} data-colorscheme={colorSchemeProp} position="relative">
        <Box
          alignItems="center"
          className={cx(avatarStyles, borderRadiusStyles[shape], className)}
          data-bordered={!!borderColor}
          data-selected={selected}
          data-shape={shape}
          flexGrow={0}
          flexShrink={0}
          justifyContent="center"
          style={avatarInlineStyles}
          testID={testID}
        >
          {/* render the Remote image when neither a src URL or name is passed in */}
          {!!src || !name ? (
            <RemoteImage
              alt={alt}
              height={computedSize}
              shape={shape}
              source={src ?? fallbackImageSrc}
              width={computedSize}
            />
          ) : (
            <Box
              alignItems="center"
              className={borderRadiusStyles[shape]}
              flexGrow={1}
              height="100%"
              justifyContent="center"
              style={fallbackStyle}
              testID={`${testID}-fallback`}
            >
              {avatarText}
            </Box>
          )}
        </Box>
        {/* The selected emphasis is applied with an offset HexagonBorder element since the actual box shadow would be hidden by the clip path */}
        {shape === 'hexagon' && selected && (
          <HexagonBorder offset size={size} strokeColor="currentColor" />
        )}
        {shape === 'hexagon' && borderColor && (
          <HexagonBorder size={size} strokeColor={`var(--color-${borderColor})`} />
        )}
      </Box>
    );
  },
);
