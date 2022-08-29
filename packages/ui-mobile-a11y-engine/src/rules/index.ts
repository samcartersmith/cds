import adjustableRoleRequired from './adjustable-role-required';
import adjustableValueRequired from './adjustable-value-required';
import disabledStateRequired from './disabled-state-required';
import linkRoleMisused from './link-role-misused';
import linkRoleRequired from './link-role-required';
import noEmptyText from './no-empty-text';
import pressableAccessibleRequired from './pressable-accessible-required';
import pressableLabelRequired from './pressable-label-required';
import pressableRoleRequired from './pressable-role-required';

const rules = [
  pressableRoleRequired,
  pressableAccessibleRequired,
  disabledStateRequired,
  pressableLabelRequired,
  adjustableRoleRequired,
  adjustableValueRequired,
  linkRoleRequired,
  linkRoleMisused,
  noEmptyText,
];

export default rules;
