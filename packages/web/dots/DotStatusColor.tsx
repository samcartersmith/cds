import React, { memo, useMemo } from 'react';
import { useIconSize } from '@cbhq/cds-common/hooks/useIconSize';
import { DotBaseProps } from '@cbhq/cds-common/types/DotBaseProps';

import { usePalette } from '../hooks/usePalette';
import { borderRadius } from '../tokens';
import { handlePreventPropagation } from '../utils/eventHandlers';

import { dotRootContainerStyles, getTransform } from './dotStyles';

export const DotStatusColor = memo(
  ({
    variant,
    pin,
    size = 's',
    overlap,
    children,
    testID,
    accessibilityLabel,
    ...props
  }: DotBaseProps) => {
    const palette = usePalette();
    const { iconSize } = useIconSize(size);

    const pinStyles = getTransform(pin, overlap);

    const styles = useMemo(() => {
      return {
        borderRadius: borderRadius.roundedFull,
        width: iconSize,
        height: iconSize,
        backgroundColor: palette[variant],
        alignItems: 'center',
        justifyContent: 'center',
        ...pinStyles,
      };
    }, [iconSize, palette, pinStyles, variant]);

    return (
      <div
        aria-label={accessibilityLabel}
        className={dotRootContainerStyles}
        data-testid={testID}
        {...props}
      >
        {children}
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,
        jsx-a11y/no-static-element-interactions */}
        <div
          data-testid="dotstatuscolor-inner-container"
          style={styles}
          onClick={handlePreventPropagation}
        />
      </div>
    );
  },
);
