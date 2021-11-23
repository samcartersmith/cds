import React, { ForwardedRef, forwardRef, useMemo } from 'react';
import { MenuBaseProps } from '@cbhq/cds-common';
import { css, cx } from 'linaria';
import { menuGutter } from '@cbhq/cds-common/tokens/menu';
import {
  selectInputMenuMaxHeight,
  inputStackLabelHeight,
} from '@cbhq/cds-common/tokens/selectInput';
import { useScaleConditional } from '@cbhq/cds-common/scale/useScaleConditional';
import { VStack } from '../../layout/VStack';

export const menuStaticClassName = 'cds-menu';
const menuContainer = css`
  &.${menuStaticClassName} {
    z-index: 1;
  }
`;

export const Menu = forwardRef(
  ({ children, parentRef, offsetConfig }: MenuBaseProps, ref: ForwardedRef<HTMLElement>) => {
    const parentHeight = useMemo(() => parentRef?.current?.offsetHeight ?? 0, [parentRef]);
    const labelHeight = useScaleConditional(inputStackLabelHeight);

    const parentHeightWithOffsets =
      offsetConfig?.label && !offsetConfig?.compact ? parentHeight + labelHeight : parentHeight;

    return (
      <VStack
        ref={ref}
        background
        dangerouslySetClassName={cx(menuContainer, menuStaticClassName)}
        top={parentHeight ? parentHeightWithOffsets + menuGutter : menuGutter}
        position="absolute"
        width="100%"
        elevation={2}
        borderRadius="standard"
        maxHeight={selectInputMenuMaxHeight}
        overflow="hidden"
      >
        {children}
      </VStack>
    );
  },
);
