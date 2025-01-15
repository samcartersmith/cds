import React, { memo } from 'react';
import { css, cx } from '@linaria/core';
import type { DotSymbolBaseProps } from '@cbhq/cds-common2/types/DotSymbolBaseProps';

import { type IconProps, Icon } from '../icons/Icon';
import { Box } from '../layout';
import { RemoteImage } from '../media/RemoteImage';
import { handlePreventPropagation } from '../utils/eventHandlers';

import { getTransform } from './dotStyles';

// These widths sizes are using px not
// spacing because it shouldn't change with density.
// And spacing doesn't support such small pixel size
// either
const remoteImageStyle = css`
  border-color: var(--color-backgroundSecondary);
  border-width: 1px;
`;

// Not using spacing, same as above reasoning
const iconContainerStyle = css`
  border-width: 2px;
`;

const baseStyle = css`
  width: fit-content;
  height: fit-content;
  position: relative;
`;

export type DotSymbolProps = DotSymbolBaseProps & {
  /** a string path to image source */
  source?: string;
  color?: IconProps['color'];
  style?: React.CSSProperties;
  className?: string;
  iconStyle?: React.CSSProperties;
  iconClassName?: string;
  imageStyle?: React.CSSProperties;
  imageClassName?: string;
};

const aspectRatio: [number, number] = [1, 1];

export const DotSymbol = memo(
  ({
    children,
    symbol,
    pin,
    source,
    iconName,
    size = 's',
    testID,
    overlap,
    color = 'textForegroundInverse',
    background = 'textPrimary',
    borderColor = 'backgroundSecondary',
    style,
    className,
    iconStyle,
    iconClassName,
    imageStyle,
    imageClassName,
    accessibilityLabel,
    ...props
  }: DotSymbolProps) => {
    const pinStyles = getTransform(pin, overlap);

    return (
      <div
        aria-label={accessibilityLabel}
        className={cx(baseStyle, className)}
        data-testid={testID}
        {...props}
        style={style}
      >
        {children}
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
        <div
          data-testid="dotsymbol-inner-container"
          onClick={handlePreventPropagation}
          style={pinStyles}
        >
          {source && (
            <RemoteImage
              aspectRatio={aspectRatio}
              className={cx(remoteImageStyle, imageClassName)}
              shape="circle"
              source={source}
              style={imageStyle}
              width={`var(--iconSize-${size})`}
            />
          )}
          {iconName && (
            <Box
              background={background}
              borderColor={borderColor}
              borderRadius={1000}
              className={cx(iconContainerStyle, iconClassName)}
              padding={0.5}
              style={iconStyle}
            >
              <Icon color={color} name={iconName} size={size} />
            </Box>
          )}
          {symbol}
        </div>
      </div>
    );
  },
);
