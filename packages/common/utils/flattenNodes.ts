/*
  Similar to React's built-in Children.toArray method, this utility takes children and returns them as an array for
  introspection or filtering. Different from Children.toArray, it will flatten arrays and React.Fragments into a
  regular, one-dimensional array while ensuring element and fragment keys are preserved, unique, and stable between renders.
*/

import { ReactNode, ReactElement, ReactChild, Children, isValidElement, cloneElement } from 'react';

import { isFragment } from 'react-is';

// typeguard to check for props in a ReactChild
export function hasProps(child: ReactChild): child is ReactElement {
  return (child as ReactElement).props !== undefined;
}

export default function flattenNodes(
  children: ReactNode,
  depth = 0,
  keys: (string | number)[] = [],
): ReactChild[] {
  return Children.toArray(children).reduce((acc: ReactChild[], node, nodeIndex) => {
    if (isFragment(node)) {
      return [
        ...acc,
        ...flattenNodes(
          node.props.children as ReactNode,
          depth + 1,
          keys.concat(node.key ?? nodeIndex),
        ),
      ];
    }

    if (isValidElement(node)) {
      return [
        ...acc,
        cloneElement(node, {
          key: keys.concat(String(node.key)).join('.'),
        }),
      ];
    }

    if (typeof node === 'string' || typeof node === 'number') {
      return [...acc, node];
    }

    return acc;
  }, []);
}
