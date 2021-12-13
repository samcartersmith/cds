import { usePopper } from 'react-popper';

/** TODO: this currently uses PopperJS which causes multiple rerenders since it relies on callback refs
 * Investigating a more performance solution
 */
export const usePopover = (
  triggerRef: HTMLElement | null,
  popoverRef: HTMLDivElement | null,
  gutter: number,
) => {
  const { styles: popperStyles, attributes: popperAttributes } = usePopper(triggerRef, popoverRef, {
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
