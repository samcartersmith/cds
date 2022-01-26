import { useSpectrum } from '@cbhq/cds-common';
import { zIndex } from '@cbhq/cds-common/tokens/zIndex';
import { css, cx } from 'linaria';
import React, { ForwardedRef, forwardRef, useMemo } from 'react';
import { PopperTooltipProps } from './TooltipProps';
import { palette, spacing } from '../../tokens';
import { TextLabel2 } from '../../typography';

const tooltipStyle = css`
  color: ${palette.foreground};
  padding: ${spacing[3]} ${spacing[4]};
  border-radius: 6px;
  z-index: ${zIndex.overlays.tooltip};
  opacity: 0;
`;

export const PopperTooltip = forwardRef(
  (
    {
      handleOnMouseEnter,
      handleOnMouseLeave,
      content,
      popperStyles,
      popperAttributes,
    }: PopperTooltipProps,
    ref: ForwardedRef<HTMLDivElement>,
  ) => {
    const spectrum = useSpectrum();

    const style = useMemo(
      () => ({
        ...popperStyles.popper,
        backgroundColor: palette[spectrum === 'light' ? 'background' : 'backgroundAlternate'],
      }),
      [popperStyles.popper, spectrum],
    );

    return (
      <div
        ref={ref}
        onMouseEnter={handleOnMouseEnter}
        onMouseLeave={handleOnMouseLeave}
        className={cx(tooltipStyle)}
        style={style}
        {...popperAttributes.popper}
      >
        <TextLabel2 as="p">{content}</TextLabel2>
      </div>
    );
  },
);
