import type { ReactTestInstance } from 'react-test-renderer';

import getComponentName from './getComponentName';

const shouldSkipComponent = (node: ReactTestInstance) => {
  if (typeof node.type === 'string') {
    return true;
  }

  if (typeof node.type === 'object') {
    const nodeType: Record<string, symbol> = node.type;

    return nodeType.$$typeof === Symbol.for('react.forward_ref');
  }

  return false;
};

const getPathToComponent = (node: ReactTestInstance): string[] => {
  const path = [];
  let current: ReactTestInstance | null = node;

  while (current) {
    if (!shouldSkipComponent(current)) {
      path.push(getComponentName(current));
    }
    current = current?.parent;
  }

  return path.reverse();
};

export default getPathToComponent;
