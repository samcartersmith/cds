import React, { ForwardedRef, forwardRef, memo } from 'react';
import { css } from 'linaria';
import { borderRadius } from '@cbhq/cds-common/tokens/border';
import { gutter } from '@cbhq/cds-common/tokens/sizing';
import { tileSize } from '@cbhq/cds-common/tokens/tile';
import { TileBaseProps } from '@cbhq/cds-common/types';

import { focusVisibleClassName, insetFocusRing } from '../styles/focus';
import { Pressable, PressableInternalProps } from '../system/Pressable';
import { cx } from '../utils/linaria';

import { Tile } from './Tile';

const pressableStyles = css`
  position: absolute;
  padding: 0;
  &.${focusVisibleClassName} {
    &::before {
      border-radius: ${borderRadius.standard}px;
    }
  }
`;

const wrapperStyles = css`
  position: relative;
  height: ${tileSize}px;
  /* add gutter to account for the border added by Pressable */
  width: ${tileSize + gutter}px;
`;

export type TileButtonProps = TileBaseProps &
  Omit<PressableInternalProps, 'noScaleOnPress' | 'loading' | 'children' | 'backgroundColor'>;

export const TileButton = memo(
  forwardRef(function TileButton(
    { pictogram, title, count, ...props }: TileButtonProps,
    ref: ForwardedRef<HTMLButtonElement>,
  ) {
    return (
      <div className={wrapperStyles}>
        <Pressable
          {...props}
          backgroundColor="background"
          borderRadius="standard"
          ref={ref}
          width={tileSize}
          noScaleOnPress
          className={cx(insetFocusRing, pressableStyles)}
        >
          <Tile title={title} pictogram={pictogram} count={count} />
        </Pressable>
      </div>
    );
  }),
);
