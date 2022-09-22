import type { ReactTestInstance } from 'react-test-renderer';

const canBeDisabled = (node: ReactTestInstance) => {
  // if this node has a disabled prop but is the child of an accessible node
  // then we can ignore

  let hasDisabledParent = false;
  let { parent } = node;
  while (parent && !hasDisabledParent) {
    if (parent.props.disabled !== undefined || parent.props.enabled !== undefined) {
      hasDisabledParent = true;
    }
    parent = parent.parent;
  }

  return (
    (node.props.disabled !== undefined || node.props.enabled !== undefined) && !hasDisabledParent
  );
};

export default canBeDisabled;
