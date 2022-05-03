import { usePopper } from 'react-popper';
import { defaultDropdownPositionConfig } from '@cbhq/cds-common/tokens/menu';
import { DropdownPositionConfig } from '@cbhq/cds-common/types/PopoverMenuBaseProps';

/** TODO: this currently uses PopperJS which causes multiple rerenders since it relies on callback refs
 * Investigating a more performance solution
 */
export const usePopoverPosition = (
  trigger: HTMLElement | null,
  popover: HTMLDivElement | null,
  dropdownPositionConfig?: DropdownPositionConfig,
) => {
  const actualDropdownPositionConfig = dropdownPositionConfig ?? defaultDropdownPositionConfig;
  const { styles: popperStyles, attributes: popperAttributes } = usePopper(trigger, popover, {
    placement: actualDropdownPositionConfig.placement,
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: actualDropdownPositionConfig.offset,
        },
      },
    ],
  });

  return {
    popperStyles,
    popperAttributes,
  };
};
