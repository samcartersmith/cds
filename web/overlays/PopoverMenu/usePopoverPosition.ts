import { usePopper } from 'react-popper';

/** TODO: this currently uses PopperJS which causes multiple rerenders since it relies on callback refs
 * Investigating a more performance solution
 */
export const usePopoverPosition = (
  trigger: HTMLElement | null,
  popover: HTMLDivElement | null,
  gutter: number,
) => {
  const { styles: popperStyles, attributes: popperAttributes } = usePopper(trigger, popover, {
    placement: 'bottom-start',
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, gutter],
        },
      },
    ],
  });

  return {
    popperStyles,
    popperAttributes,
  };
};
