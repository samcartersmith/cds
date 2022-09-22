import { isPressable } from '../helpers';
import type { Rule } from '../types';

const allowedRoles = ['button', 'link', 'imagebutton', 'radio', 'switch', 'menu'];
const allowedRolesMessage = allowedRoles.join(' or ');

const rule: Rule = {
  id: 'pressable-role-required',
  matcher: (node) => isPressable(node.type),
  assertion: (node) => allowedRoles.includes(node.props.accessibilityRole as string),
  help: {
    problem:
      "This component is pressable but the user hasn't been informed that it behaves like a button/link/radio/switch/menu",
    solution: `Set the 'accessibilityRole' prop to ${allowedRolesMessage}`,
    link: '',
  },
};

export default rule;
