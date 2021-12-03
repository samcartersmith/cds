import React, { useMemo, CSSProperties, memo } from 'react';
import { DotBaseProps } from '@cbhq/cds-common/types/DotBaseProps';
import { useDotPlacementStyles } from '@cbhq/cds-common/hooks/useDotPlacementStyles';
import { borderRadius } from '@cbhq/cds-common/tokens/border';
import { useIconSize } from '@cbhq/cds-common/hooks/useIconSize';
import { dotOuterContainerStyles } from '@cbhq/cds-common/tokens/dot';
import { dotRootContainerStyles } from './dotStyles';
import { usePalette } from '../hooks/usePalette';

export const DotStatusColor = memo(
  ({
    variant,
    placement,
    size = 's',
    children,
    testID,
    accessibilityLabel,
    ...props
  }: DotBaseProps) => {
    const palette = usePalette();
    const { iconSize } = useIconSize(size);

    const placementStyles = useDotPlacementStyles('web', placement) as CSSProperties;

    const styles = useMemo(() => {
      return {
        borderRadius: `${borderRadius.round}px`,
        width: `${iconSize}px`,
        height: `${iconSize}px`,
        backgroundColor: palette[variant],
        ...(dotOuterContainerStyles as CSSProperties),
        ...placementStyles,
      };
    }, [iconSize, palette, placementStyles, variant]);

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
