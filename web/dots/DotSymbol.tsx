import { DotBaseProps, useIconSize } from '@cbhq/cds-common';
import { useDotPlacementStyles } from '@cbhq/cds-common/hooks/useDotPlacementStyles';
import React, { CSSProperties, memo } from 'react';
import { RemoteImage } from '../media/RemoteImage';
import { dotRootContainerStyles } from './dotStyles';

export type DotSymbolProps = Omit<DotBaseProps, 'variant'> & {
  source: string;
};

const aspectRatio: [number, number] = [1, 1];

export const DotSymbol = memo(
  ({
    children,
    placement,
    source,
    size = 's',
    testID,
    accessibilityLabel,
    ...props
  }: DotSymbolProps) => {
    const placementStyles = useDotPlacementStyles('web', placement) as CSSProperties;
    const { iconSize } = useIconSize(size);

    return (
      <div
        data-testid={testID}
        className={dotRootContainerStyles}
        aria-label={accessibilityLabel}
        {...props}
      >
        {children}
        <div style={placementStyles} data-testid="dotsymbol-inner-container">
          <RemoteImage shape="circle" aspectRatio={aspectRatio} source={source} width={iconSize} />
        </div>
      </div>
    );
  },
);
