import React, { memo, useMemo } from 'react';
import { css } from '@linaria/core';
import { ThemeVars } from '@cbhq/cds-common2/core/theme';
import type { DotBaseProps, DotVariant } from '@cbhq/cds-common2/types/DotBaseProps';

import { useTheme } from '../hooks/useTheme';
import { handlePreventPropagation } from '../utils/eventHandlers';

import { getTransform } from './dotStyles';

const baseStyle = css`
  width: fit-content;
  height: fit-content;
  position: relative;
`;

const variantColorMap: Record<DotVariant, ThemeVars.Color> = {
  primary: 'textPrimary',
  positive: 'textPositive',
  negative: 'textNegative',
  foregroundMuted: 'textForegroundMuted',
  warning: 'textWarning',
};

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
    const { color } = useTheme();

    const pinStyles = getTransform(pin, overlap);

    const styles = useMemo(() => {
      const variantColor = variantColorMap[variant];
      return {
        borderRadius: 'var(--borderRadius-1000)',
        borderColor: color.backgroundSecondary,
        borderWidth: '1px',
        width: `var(--iconSize-${size})`,
        height: `var(--iconSize-${size})`,
        backgroundColor: color[variantColor],
        alignItems: 'center',
        justifyContent: 'center',
        ...pinStyles,
      };
    }, [color, pinStyles, size, variant]);

    return (
      <div aria-label={accessibilityLabel} className={baseStyle} data-testid={testID} {...props}>
        {children}
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,
        jsx-a11y/no-static-element-interactions */}
        <div
          data-testid="dotstatuscolor-inner-container"
          onClick={handlePreventPropagation}
          style={styles}
        />
      </div>
    );
  },
);
