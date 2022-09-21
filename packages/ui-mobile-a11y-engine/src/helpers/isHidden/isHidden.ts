import type { ReactTestInstance } from 'react-test-renderer';

const isHidden = (node: ReactTestInstance): boolean => {
  return (
    (node.props.accessibilityElementsHidden as boolean) ||
    node.props.importantForAccessibility === 'no-hide-descendants'
  );
};

export default isHidden;
