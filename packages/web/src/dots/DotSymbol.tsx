import React, { memo } from 'react';
import { css, cx } from '@linaria/core';
import type {
  DotOverlap,
  DotSize,
  IconName,
  PinPlacement,
  SharedAccessibilityProps,
  SharedProps,
} from '@cbhq/cds-common/types';

import { Icon, type IconProps } from '../icons/Icon';
import { Box, type BoxBaseProps } from '../layout/Box';
import { RemoteImage } from '../media/RemoteImage';
import { handlePreventPropagation } from '../utils/eventHandlers';

import { getTransform } from './dotStyles';

// These widths sizes are using px not
// spacing because it shouldn't change with density.
// And spacing doesn't support such small pixel size
// either
const remoteImageStyle = css`
  border-color: var(--color-bgSecondary);
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

export type DotSymbolBaseProps = SharedProps &
  Pick<
    SharedAccessibilityProps,
    'accessibilityLabel' | 'accessibilityLabelledBy' | 'accessibilityHint'
  > & {
    /** Icon name to add to the dot. */
    iconName?: IconName;
    /** Size of the dot */
    size?: DotSize;
    /** Whether the icon is active */
    active?: boolean;
    /** The color of the icon */
    color?: IconProps['color'];
    background?: BoxBaseProps['background'];
    borderColor?: BoxBaseProps['borderColor'];
    /** Position of the dot */
    pin?: PinPlacement;
    /** The element that the dot will anchor to */
    children?: React.ReactNode;
    /** Indicates what shape dot is overlapping */
    overlap?: DotOverlap;
    /** Add an arbitrary ReactNode to the dot instead of an icon. */
    symbol?: React.ReactNode;
    /** Image source path */
    source?: string;
    style?: React.CSSProperties;
    className?: string;
    iconStyle?: React.CSSProperties;
    iconClassName?: string;
    imageStyle?: React.CSSProperties;
    imageClassName?: string;
  };

export type DotSymbolProps = DotSymbolBaseProps;

const aspectRatio: [number, number] = [1, 1];

export const DotSymbol = memo(
  ({
    children,
    symbol,
    pin,
    source,
    iconName,
    size = 's',
    active,
    testID,
    overlap,
    color = 'fgInverse',
    background = 'fgPrimary',
    borderColor = 'bgSecondary',
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
              <Icon active={active} color={color} name={iconName} size={size} />
            </Box>
          )}
          {symbol}
        </div>
      </div>
    );
  },
);
