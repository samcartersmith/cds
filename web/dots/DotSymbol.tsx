import { DotBaseProps, useIconSize } from '@cbhq/cds-common';
import React, { memo } from 'react';
import { RemoteImage } from '../media/RemoteImage';
import { dotRootContainerStyles, getTransform } from './dotStyles';

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
          <RemoteImage shape="circle" aspectRatio={aspectRatio} source={source} width={iconSize} />
        </div>
      </div>
    );
  },
);
