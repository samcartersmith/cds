import React, { memo, useMemo } from 'react';
import { type LinariaClassName, css, cx } from '@linaria/core';
import type { AvatarBaseProps, AvatarShape } from '@cbhq/cds-common/types/AvatarBaseProps';
import type { AvatarSize } from '@cbhq/cds-common2';
import { useAvatarSrc } from '@cbhq/cds-common2/media/useAvatarSrc';
import type * as vars from '@cbhq/cds-web2/styles/vars';

import { Box } from '../layout/Box';
import type { SpectrumHueName } from '../styles/spectrum';
import { Text } from '../text/Text';

import { hexagonAvatarClipId, HexagonBorder } from './Hexagon';
import { RemoteImage } from './RemoteImage';

const wrapperStyles = css`
  // Styles the possible values of the colorScheme prop. Children elements will use CSS currentColor to inherit this color styles.
  &[data-colorScheme='blue'] {
    color: rgb(var(--blue60));
  }

  &[data-colorScheme='teal'] {
    color: rgb(var(--teal60));
  }

  &[data-colorScheme='purple'] {
    color: rgb(var(--purple60));
  }

  &[data-colorScheme='pink'] {
    color: rgb(var(--pink60));
  }

  &[data-colorScheme='green'] {
    color: rgb(var(--green60));
  }

  &[data-colorScheme='gray'] {
    // in the original implementation the light and dark themes used different values for gray
    // we will need to find a value that works for both themes until we can detect/change themes in v8
    color: rgb(var(--gray60));
  }
`;

const avatarStyles = css`
  background: var(--avatar-background);
  border: solid var(--borderWidth-200) var(--avatar-borderColor);
  overflow: hidden;

  &[data-selected='true'] {
    // Box shadow is used to place a ring around the avatar in the color chosen by the colorScheme prop
    box-shadow: 0 0 0 var(--borderWidth-200) currentColor;
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

// TODO after v8 release switch back to common/shared types for avatar color schemes
// right now, the shared types in cds-common are using old color tokens
export type FallbackColor = Extract<
  SpectrumHueName,
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
  borderColor?: keyof typeof vars.color; // TODO if a user themes their own colors, the props won't be accurately strongly typed
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
    const avatarSrc = useAvatarSrc(src);

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
            color="textForegroundInverse"
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
          color="textForegroundInverse"
          font={showLargerFont ? 'title2' : 'body'}
          textAlign="center"
          transform="uppercase"
        >
          {placeholderLetter}
        </Text>
      );
    }, [name, size, dangerouslySetSize]);

    const avatarInlineStyles = useMemo(() => {
      const avatarSize = `var(--avatarSize-${size})`;
      const userProvidedSize = style?.width ?? style?.height ?? dangerouslySetSize;
      const computedSize = userProvidedSize ?? avatarSize;

      return {
        width: computedSize,
        height: computedSize,
        ...style,
        '--avatar-borderColor': borderColor
          ? `var(--color-${borderColor})`
          : 'var(--color-transparent)',
        '--avatar-background': src || 'transparent',
      } as React.CSSProperties;
    }, [size, style, dangerouslySetSize, borderColor, src]);

    const fallbackStyle = useMemo(
      () => ({
        background: 'currentColor',
      }),
      [],
    );

    return (
      // set position required to place the HexagonBorder elements properly
      <Box className={wrapperStyles} data-colorScheme={colorSchemeProp} position="relative">
        <Box
          alignItems="center"
          className={cx(avatarStyles, borderRadiusStyles[shape], className)}
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
            <RemoteImage alt={alt} height="100%" shape={shape} source={avatarSrc} width="100%" />
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
