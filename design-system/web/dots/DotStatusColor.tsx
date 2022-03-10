import React, { useMemo, memo } from 'react';
import { DotBaseProps } from '@cbhq/cds-common/types/DotBaseProps';
import { borderRadius } from '@cbhq/cds-common/tokens/border';
import { useIconSize } from '@cbhq/cds-common/hooks/useIconSize';
import { dotRootContainerStyles, getTransform } from './dotStyles';
import { usePalette } from '../hooks/usePalette';

export const DotStatusColor = memo(
  ({ variant, pin, size = 's', children, testID, accessibilityLabel, ...props }: DotBaseProps) => {
    const palette = usePalette();
    const { iconSize } = useIconSize(size);

    const pinStyles = getTransform(pin);

    const styles = useMemo(() => {
      return {
        borderRadius: `${borderRadius.round}px`,
        width: `${iconSize}px`,
        height: `${iconSize}px`,
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
        <div data-testid="dotstatuscolor-inner-container" style={styles} />
      </div>
    );
  },
);
