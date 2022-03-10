import React, { useMemo, memo } from 'react';
import { DotCountBaseProps } from '@cbhq/cds-common/types/DotCountBaseProps';
import { parseDotCountMaxOverflow } from '@cbhq/cds-common/utils/parseDotCountMaxOverflow';
import {
  dotOuterContainerStyles,
  dotCountContent,
  dotCountPadding,
} from '@cbhq/cds-common/tokens/dot';
import { css } from 'linaria';
import { dotRootContainerStyles, getTransform } from './dotStyles';
import { usePalette } from '../hooks/usePalette';
import { TextCaption } from '../typography/TextCaption';

const dotCountContentLinaria = css`
  && {
    ${dotCountContent}
    ${dotOuterContainerStyles}
    ${dotCountPadding}
  }
`;

export const DotCount = memo(
  ({
    children,
    pin,
    variant = 'negative',
    count,
    testID,
    accessibilityLabel,
    ...props
  }: DotCountBaseProps) => {
    const palette = usePalette();
    const pinStyles = getTransform(pin);

    const styles = useMemo(() => {
      return {
        backgroundColor: palette[variant],
        borderColor: palette.secondary,
        ...pinStyles,
      };
    }, [palette, pinStyles, variant]);

    return (
      <div
        aria-label={accessibilityLabel}
        className={dotRootContainerStyles}
        data-testid={testID}
        {...props}
      >
        {children}
        {count > 0 && (
          <div
            className={dotCountContentLinaria}
            data-testid="dotcount-outer-container"
            style={styles}
          >
            <TextCaption align="center" as="p" color="primaryForeground">
              {parseDotCountMaxOverflow(count)}
            </TextCaption>
          </div>
        )}
      </div>
    );
  },
);
