import React, { memo } from 'react';
import { css } from 'linaria';
import { DotSymbolBaseProps, useIconSize } from '@cbhq/cds-common';

import { Icon } from '../icons';
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
};

const aspectRatio: [number, number] = [1, 1];

export const DotSymbol = memo(
  ({
    children,
    pin,
    source,
    iconName,
    size = 's',
    testID,
    overlap,
    accessibilityLabel,
    ...props
  }: DotSymbolProps) => {
    const pinStyles = getTransform(pin, overlap);
    const { iconSize } = useIconSize(size);

    return (
      <div
        data-testid={testID}
        className={dotRootContainerStyles}
        aria-label={accessibilityLabel}
        {...props}
      >
        {children}
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
        <div
          onClick={handlePreventPropagation}
          style={pinStyles}
          data-testid="dotsymbol-inner-container"
        >
          {source && (
            <RemoteImage
              dangerouslySetClassName={imageBorderClassName}
              shape="circle"
              aspectRatio={aspectRatio}
              source={source}
              width={iconSize}
            />
          )}
          {iconName && (
            <Box
              dangerouslySetClassName={iconBorderClassName}
              spacing={1}
              background="primary"
              borderRadius="round"
              borderColor="secondary"
            >
              <Icon color="primaryForeground" name={iconName} size={size} />
            </Box>
          )}
        </div>
      </div>
    );
  },
);
