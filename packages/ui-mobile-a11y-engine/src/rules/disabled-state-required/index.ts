import { canBeDisabled, isPressable } from '../../helpers';
import type { Rule } from '../../types';

const rule: Rule = {
  id: 'disabled-state-required',
  matcher: (node) => canBeDisabled(node) && isPressable(node.type),
  assertion: (node) => node.props.accessibilityState?.disabled !== undefined,
  help: {
    problem: "This component has a disabled state but it isn't exposed to the user",
    solution: "Set the 'accessibilityState' prop to an object containing a boolean 'disabled' key",
    link: '',
  },
};

export default rule;
