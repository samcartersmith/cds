import { Text } from 'react-native';
import type { ReactTestInstance } from 'react-test-renderer';

import { isPressable } from '../helpers';
import type { Rule } from '../types';

const getTextNode = (node: ReactTestInstance): ReactTestInstance | null => {
  try {
    return node.findByType(Text);
  } catch (e) {
    return null;
  }
};

const rule: Rule = {
  id: 'pressable-label-required',
  matcher: (node) => isPressable(node.type),
  assertion: (node) => {
    const textNode = getTextNode(node);
    const textContent: unknown = textNode?.props?.children;
    const { accessibilityLabel } = node.props;
    if (!accessibilityLabel && !textContent) {
      return false;
    }
    return true;
  },
  help: {
    problem:
      "This pressable has no text content, so an accessibility label can't be automatically inferred",
    solution: "Place a text component in the button or define an 'accessibilityLabel' prop",
    link: '',
  },
};

export default rule;
