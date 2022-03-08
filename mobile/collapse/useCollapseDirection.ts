import type { CollapseBaseProps } from '@cbhq/cds-common/types';

export type CollapseDirectionReturnValues = {
  shouldEnableScroll: boolean;
  animateTo: number;
  animateProperty: 'maxWidth' | 'maxHeight';
  horizontal: boolean;
};

export const useCollapseDirection = ({
  direction,
  maxHeight,
  maxWidth,
  contentWidth,
  contentHeight,
}: Pick<CollapseBaseProps, 'direction' | 'maxHeight' | 'maxWidth'> & {
  contentWidth: number;
  contentHeight: number;
}): CollapseDirectionReturnValues => {
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
