import { FunctionComponent } from 'react';
import type { ReactTestInstance } from 'react-test-renderer';

const blacklist = ['String', 'Component', 'Object'];

const extractNameFromType = (component: ReactTestInstance): string | undefined => {
  const { displayName, name } = component.type as FunctionComponent;

  if (displayName && !blacklist.includes(displayName)) {
    return displayName;
  }

  if (name && !blacklist.includes(name)) {
    return name;
  }

  return undefined;
};

const getComponentName = (component: ReactTestInstance): string => {
  let name: string | undefined;
  name = extractNameFromType(component);

  const { children } = component;

  if (!name && children.length > 0 && typeof children[0] !== 'string') {
    // Some components are wrapped in Animated or Virtualized nodes,
    // and the main component is the child, not the wrapper,
    // so we inspect the child component for name, not the parent.

    const childComponent = component.children[0] as unknown as ReactTestInstance;
    name = extractNameFromType(childComponent);
  }

  return name ?? 'Unknown';
};

export default getComponentName;
