import { isAdjustable } from '../helpers';
import type { Rule } from '../types';

const rule: Rule = {
  id: 'adjustable-role-required',
  matcher: (node) => isAdjustable(node),
  assertion: (node) => node.props.accessibilityRole === 'adjustable',
  help: {
    problem: "This component has an adjustable value but the user wasn't informed of this",
    solution: "Set the 'accessibilityRole' prop to 'adjustable'",
    link: '',
  },
};

export default rule;
