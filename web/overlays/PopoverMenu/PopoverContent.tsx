import React, { useMemo, ReactNode, memo } from 'react';
import { menuGutter } from '@cbhq/cds-common/tokens/menu';
import { css } from 'linaria';
import { cx } from '../../utils/linaria';
import { usePopoverContext } from './PopoverContext';
import { usePopoverPosition } from './usePopoverPosition';
import { VStack } from '../../layout/VStack';

const popoverStyleOverrides = css`
  overflow-y: auto;
  overflow-x: hidden;
`;

const popoverMenuStaticClassName = 'cds-popover-menu';

type PopoverContentProps = { children: ReactNode };

export const PopoverContent = memo(({ children }: PopoverContentProps) => {
  const {
    setPopper,
    trigger,
    popper,
    width,
    maxHeight,
    popoverMenuRef,
    controlledElementAccessibilityProps,
  } = usePopoverContext();
  const { popperStyles, popperAttributes } = usePopoverPosition(trigger, popper, menuGutter);

  const convertedWidth = typeof width === 'number' ? `${width}px` : width;

  const popoverStyles: React.CSSProperties = useMemo(
    () => ({
      ...popperStyles.popper,
      width: convertedWidth,
    }),
    [popperStyles, convertedWidth],
  );

  return (
    <div ref={setPopper} {...popperAttributes.popper} style={popoverStyles}>
      <VStack
        ref={popoverMenuRef}
        {...controlledElementAccessibilityProps}
        background
        elevation={2}
        width={width ?? '100%'}
        borderRadius="popover"
        role="menu"
        maxHeight={maxHeight}
        dangerouslySetClassName={cx(popoverMenuStaticClassName, popoverStyleOverrides)}
      >
        {children}
      </VStack>
    </div>
  );
});
