import React, { memo } from 'react';
import { css, cx } from 'linaria';
import { DotSymbolBaseProps, useIconSize } from '@cbhq/cds-common';

import { type IconProps, Icon } from '../icons';
import { Box } from '../layout';
import { RemoteImage } from '../media/RemoteImage';
import { palette } from '../tokens';
import { handlePreventPropagation } from '../utils/eventHandlers';

import { dotRootContainerStyles, getTransform } from './dotStyles';

// These widths sizes are using px not
// spacing because it shouldn't change with density.
// And spacing doesn't support such small pixel size
// either
const imageBorderClassName = css`
  && {
    border-color: ${palette.secondary};
    border-width: 1px;
  }
`;

// Not using spacing, same as above reasoning
const iconBorderClassName = css`
  && {
    border-width: 2px;
  }
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
    color = 'primaryForeground',
    background = 'primary',
    borderColor = 'secondary',
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
    const { iconSize } = useIconSize(size);

    return (
      <div
        aria-label={accessibilityLabel}
        className={cx(dotRootContainerStyles, className)}
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
              className={cx(imageBorderClassName, imageClassName)}
              shape="circle"
              source={source}
              style={imageStyle}
              width={iconSize}
            />
          )}
          {iconName && (
            <Box
              background={background}
              borderColor={borderColor}
              borderRadius="roundedFull"
              className={cx(iconBorderClassName, iconClassName)}
              spacing={0.5}
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
