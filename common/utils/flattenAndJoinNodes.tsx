import React from 'react';

import flattenNodes from './flattenNodes';
import type { GroupBaseProps, SpacerBaseProps } from '../types';

type FlattenAndJoinNodesParams<BoxProps> = {
  Spacer: React.ComponentType<SpacerBaseProps>;
  ItemWrapper?: React.ComponentType<BoxProps>;
} & GroupBaseProps<BoxProps>;

export function flattenAndJoinNodes<BoxProps>({
  children,
  direction = 'vertical',
  divider,
  gap,
  renderItem,
  ItemWrapper,
  Spacer,
}: FlattenAndJoinNodesParams<BoxProps>) {
  let finalChildren: React.ReactNode[] = [];
  const itemsToJoin: React.ReactNode[] = [];
  const shouldJoin = gap !== undefined || divider !== undefined;
  const childrenAsArray = React.Children.toArray(children);

  if (gap) {
    itemsToJoin.push(<Spacer {...{ [direction]: gap }} />);
  }

  if (divider) {
    const Divider = divider;
    itemsToJoin.push(<Divider />);
  }

  const childrenContents = shouldJoin
    ? flattenNodes(childrenAsArray).map((item, index) =>
        renderItem && ItemWrapper ? renderItem({ item, Wrapper: ItemWrapper, index }) : item,
      )
    : childrenAsArray;

  if (shouldJoin) {
    childrenContents.forEach((item, index) => {
      // The last item doesn't include divider or spacer
      if (index === childrenContents.length - 1) {
        finalChildren = [...finalChildren, item];
      } else {
        finalChildren = [...finalChildren, item, ...itemsToJoin];
      }
    });
    return finalChildren;
  }
  return childrenContents;
}
