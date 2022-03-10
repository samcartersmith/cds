import React, { memo } from 'react';
import { css } from 'linaria';
import { DotBaseProps, useIconSize } from '@cbhq/cds-common';

import { RemoteImage } from '../media/RemoteImage';

import { dotRootContainerStyles, getTransform } from './dotStyles';

const imageBorderClassName = css`
  && {
    border-color: white;
    border-width: 1px;
  }
`;

export type DotSymbolProps = Omit<DotBaseProps, 'variant'> & {
  source: string;
};

const aspectRatio: [number, number] = [1, 1];

export const DotSymbol = memo(
  ({ children, pin, source, size = 's', testID, accessibilityLabel, ...props }: DotSymbolProps) => {
    const pinStyles = getTransform(pin);
    const { iconSize } = useIconSize(size);

    return (
      <div
        data-testid={testID}
        className={dotRootContainerStyles}
        aria-label={accessibilityLabel}
        {...props}
      >
        {children}
        <div style={pinStyles} data-testid="dotsymbol-inner-container">
          <RemoteImage
            dangerouslySetClassName={imageBorderClassName}
            shape="circle"
            aspectRatio={aspectRatio}
            source={source}
            width={iconSize}
          />
        </div>
      </div>
    );
  },
);
