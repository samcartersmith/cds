import type { CollapsibleBaseProps } from '@cbhq/cds-common/types';

export type CollapsibleDirectionReturnValues = {
  shouldEnableScroll: boolean;
  animateTo: number;
  animateProperty: 'maxWidth' | 'maxHeight';
  horizontal: boolean;
};

export const useCollapsibleDirection = ({
  direction,
  maxHeight,
  maxWidth,
  contentWidth,
  contentHeight,
}: Pick<CollapsibleBaseProps, 'direction' | 'maxHeight' | 'maxWidth'> & {
  contentWidth: number;
  contentHeight: number;
}): CollapsibleDirectionReturnValues => {
  if (direction === 'vertical') {
    return {
      shouldEnableScroll: maxHeight ? contentHeight > maxHeight : false,
      animateTo: maxHeight ?? contentHeight,
      animateProperty: 'maxHeight',
      horizontal: false,
    };
  }

  return {
    shouldEnableScroll: maxWidth ? contentWidth > maxWidth : false,
    animateTo: maxWidth ?? contentWidth,
    animateProperty: 'maxWidth',
    horizontal: true,
  };
};
