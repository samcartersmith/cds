import { isPressable } from '../../helpers';
import type { Rule } from '../../types';

const rule: Rule = {
  id: 'pressable-accessible-required',
  matcher: (node) => isPressable(node.type),
  assertion: (node) => {
    return node.props.accessible !== false;
  },
  help: {
    problem: 'This button is not accessible (selectable) to the user',
    solution:
      "Set the 'accessible' prop to 'true' or remove it (pressables are accessible by default)",
    link: '',
  },
};

export default rule;
