import React, { memo, useMemo } from 'react';
import { css } from 'linaria';
import {
  dotCountContent,
  dotCountPadding,
  dotOuterContainerStyles,
} from '@cbhq/cds-common/tokens/dot';
import { DotCountBaseProps } from '@cbhq/cds-common/types/DotCountBaseProps';
import { parseDotCountMaxOverflow } from '@cbhq/cds-common/utils/parseDotCountMaxOverflow';

import { usePalette } from '../hooks/usePalette';
import { TextCaption } from '../typography/TextCaption';
import { handlePreventPropagation } from '../utils/eventHandlers';

import { dotRootContainerStyles, getTransform } from './dotStyles';

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
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
          <div
            className={dotCountContentLinaria}
            data-testid="dotcount-outer-container"
            style={styles}
            onClick={handlePreventPropagation}
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
