import React, { memo, useMemo } from 'react';
import {
  Image,
  ImageProps,
  ImageResizeMode,
  ImageSourcePropType,
  ImageStyle,
  ImageURISource,
} from 'react-native';
import Svg, { ClipPath, Defs, Image as SvgImage, Path, SvgCssUri, SvgXml } from 'react-native-svg';
import { AspectRatio, FixedValue, RemoteImageBaseProps, useSpectrum } from '@cbhq/cds-common';
import { useShapeToBorderRadiusSize } from '@cbhq/cds-common/hooks/useShapeToBorderRadiusSize';
import { useAvatarSize } from '@cbhq/cds-common/media/useAvatarSize';
import { getRemoteImageWidthAndHeight } from '@cbhq/cds-common/utils/getRemoteImageWidthAndHeight';

import { useInvertedPaletteColor } from '../color/useInvertedPaletteColor';
import { usePalette } from '../hooks/usePalette';
import { DangerouslySetStyle } from '../types';

type SourceProp = string | ImageProps['source'];

type XmlReturnType = { content: string };

type BaseRemoteImageProps = {
  /** Fill in transparent background with inverted background color and add border. This solves issue of transparent, stamped out asset icons not being visible on dark backgrounds.  */
  shouldApplyDarkModeEnhacements?: boolean;
  source?: SourceProp;
} & Omit<ImageProps, 'style' | 'width' | 'height' | 'source'> &
  DangerouslySetStyle<ImageStyle, false> &
  RemoteImageBaseProps;

type RemoteImagePropsWithSource = {
  source?: SourceProp;
} & BaseRemoteImageProps;

type RemoteImagePropsWithWidth = {
  width: FixedValue;
  aspectRatio: AspectRatio;
} & BaseRemoteImageProps;

type RemoteImagePropsWithHeight = {
  height: FixedValue;
  aspectRatio: AspectRatio;
} & BaseRemoteImageProps;

type RemoteImagePropsWidthAndHeight = {
  width: FixedValue;
  height: FixedValue;
  resizeMode: ImageResizeMode;
} & BaseRemoteImageProps;

export type RemoteImageProps =
  | RemoteImagePropsWithWidth
  | RemoteImagePropsWithHeight
  | RemoteImagePropsWidthAndHeight
  | RemoteImagePropsWithSource;

function getSource(
  source: string | number | ImageURISource,
  cachePolicy?: ImageURISource['cache'],
): ImageSourcePropType {
  if (typeof source === 'string') {
    if (source.endsWith('.svg')) {
      return { uri: source, headers: { format: 'svg' }, cache: cachePolicy };
    }
    return { uri: source, cache: cachePolicy };
  }

  return source;
}

function isSvg(source: SourceProp): boolean {
  return typeof source === 'object' && 'headers' in source && source.headers?.format === 'svg';
}

type HexagonClipPathProps = {
  image: React.ReactElement;
};

const HexagonClipPath = ({ image }: HexagonClipPathProps) => {
  return (
    <Svg viewBox="0 0 66 62">
      <Defs>
        <ClipPath id="hex-hw-shapeclip-clipconfig">
          <Path d="M63.4372 22.8624C66.2475 27.781 66.2475 33.819 63.4372 38.7376L54.981 53.5376C52.1324 58.5231 46.8307 61.6 41.0887 61.6H24.4562C18.7142 61.6 13.4125 58.5231 10.564 53.5376L2.10774 38.7376C-0.702577 33.819 -0.702582 27.781 2.10774 22.8624L10.564 8.06243C13.4125 3.07687 18.7142 0 24.4562 0H41.0887C46.8307 0 52.1324 3.07686 54.981 8.06242L63.4372 22.8624Z" />
        </ClipPath>
      </Defs>
      {image}
    </Svg>
  );
};

export const RemoteImage = memo(function RemoteImage({
  width,
  height,
  aspectRatio,
  shape = 'square',
  shouldApplyDarkModeEnhacements,
  source,
  size = 'm',
  dangerouslySetStyle,
  borderColor,
  onError,
  onLoad,
  ...props
}: RemoteImageProps) {
  const borderRadius = useShapeToBorderRadiusSize(shape);
  const avatarSize = useAvatarSize(size);
  const spectrum = useSpectrum();

  const { width: finalWidth, height: finalHeight } = getRemoteImageWidthAndHeight({
    size,
    width,
    height,
    avatarSize,
  });

  const useFallback = source === undefined;
  const transformedSource = useMemo(
    () => (typeof source === 'string' ? getSource(source) : source),
    [source],
  );

  const palette = usePalette();
  const backgroundColor = useInvertedPaletteColor('background');

  const applyDarkModeEnhancement = spectrum === 'dark' && shouldApplyDarkModeEnhacements;

  const darkModeStyles = useMemo(() => {
    if (applyDarkModeEnhancement) {
      return {
        backgroundColor,
        borderWidth: 1,
        borderColor: palette.lineHeavy,
      };
    }
    return undefined;
  }, [applyDarkModeEnhancement, backgroundColor, palette.lineHeavy]);

  const borderStyles = useMemo(() => {
    // shouldApplyDarkModeEnhancement border decoration takes precedence
    if (!applyDarkModeEnhancement && borderColor) {
      return {
        borderColor: palette[borderColor],
        borderWidth: 2,
      };
    }

    return undefined;
  }, [applyDarkModeEnhancement, borderColor, palette]);

  const styles = useMemo(
    () =>
      [
        {
          aspectRatio: aspectRatio ? aspectRatio[0] / aspectRatio[1] : undefined,
          borderRadius,
        } as const,
        dangerouslySetStyle,
        darkModeStyles,
        borderStyles,
      ].filter(Boolean),
    [aspectRatio, borderRadius, borderStyles, dangerouslySetStyle, darkModeStyles],
  );

  const stylesWithDimensions = useMemo(
    () => [...styles, { width: finalWidth, height: finalHeight }],
    [finalHeight, finalWidth, styles],
  );

  if (isSvg(transformedSource as SourceProp)) {
    return (
      <SvgCssUri
        style={styles}
        uri={Image.resolveAssetSource(transformedSource as ImageSourcePropType).uri}
        {...props}
        width={finalWidth}
        height={finalHeight}
      />
    );
  }

  if (useFallback) {
    // eslint-disable-next-line global-require
    const darkFallback = require('./RemoteImageFallbackXmls/dark') as XmlReturnType;
    // eslint-disable-next-line global-require
    const lightFallback = require('./RemoteImageFallbackXmls/light') as XmlReturnType;

    return (
      <SvgXml
        style={styles}
        xml={spectrum === 'dark' ? darkFallback.content : lightFallback.content}
        width={finalWidth}
        height={finalHeight}
      />
    );
  }

  if (shape === 'hexagon') {
    return (
      <HexagonClipPath
        image={
          <SvgImage
            href={source as ImageProps['source']}
            clipPath="url(#hex-hw-shapeclip-clipconfig)"
            x={0}
            y={0}
            width="100%"
            height="100%"
          />
        }
      />
    );
  }

  return (
    <Image
      accessibilityIgnoresInvertColors
      source={transformedSource as ImageSourcePropType}
      accessibilityRole="image"
      onError={onError}
      onLoad={onLoad}
      {...props}
      style={stylesWithDimensions}
    />
  );
});

export { getSource, HexagonClipPath };
