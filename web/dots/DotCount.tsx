import React, { useMemo, CSSProperties, memo } from 'react';
import { DotCountBaseProps } from '@cbhq/cds-common/types/DotCountBaseProps';
import { useDotPlacementStyles } from '@cbhq/cds-common/hooks/useDotPlacementStyles';
import { parseDotCountMaxOverflow } from '@cbhq/cds-common/utils/parseDotCountMaxOverflow';
import { dotOuterContainerStyles, dotCountContent } from '@cbhq/cds-common/tokens/dot';
import { dotRootContainerStyles } from './dotStyles';

import { usePalette } from '../hooks/usePalette';
import { TextCaption } from '../typography/TextCaption';

export const DotCount = memo(
  ({
    children,
    placement,
    variant,
    count,
    testID,
    accessibilityLabel,
    ...props
  }: DotCountBaseProps) => {
    const palette = usePalette();
    const placementStyles = useDotPlacementStyles('web', placement) as CSSProperties;

    const styles = useMemo(() => {
      return {
        backgroundColor: palette[variant],
        ...dotCountContent,
        ...placementStyles,
        ...(dotOuterContainerStyles as CSSProperties),
      };
    }, [palette, placementStyles, variant]);

    return (
      <div
        aria-label={accessibilityLabel}
        className={dotRootContainerStyles}
        data-testid={testID}
        {...props}
      >
        {children}
        <div data-testid="dotcount-outer-container" style={styles}>
          <TextCaption align="center" as="p" color="primaryForeground">
            {parseDotCountMaxOverflow(count)}
          </TextCaption>
        </div>
      </div>
    );
  },
);
