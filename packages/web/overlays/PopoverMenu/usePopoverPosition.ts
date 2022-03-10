import { usePopper } from 'react-popper';
import { defaultPopoverPositionConfig } from '@cbhq/cds-common/tokens/menu';
import { PopoverPositionConfig } from '@cbhq/cds-common/types/PopoverMenuBaseProps';

/** TODO: this currently uses PopperJS which causes multiple rerenders since it relies on callback refs
 * Investigating a more performance solution
 */
export const usePopoverPosition = (
  trigger: HTMLElement | null,
  popover: HTMLDivElement | null,
  popoverPositionConfig?: PopoverPositionConfig,
) => {
  const getPopoverPositionConfig = popoverPositionConfig ?? defaultPopoverPositionConfig;
  const { styles: popperStyles, attributes: popperAttributes } = usePopper(trigger, popover, {
    placement: getPopoverPositionConfig.placement,
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: getPopoverPositionConfig.offset,
        },
      },
    ],
  });

  return {
    popperStyles,
    popperAttributes,
  };
};
