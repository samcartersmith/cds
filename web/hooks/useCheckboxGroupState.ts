import { useCallback } from 'react';

import { useGroupToggler, GroupToggleStateProps } from '@cbhq/cds-common/hooks/useGroupToggler';

export type CheckboxGroupStateProps<T extends string | number> = {
  getSelectedState: GroupToggleStateProps<T>['getSelectedState'];
  select: React.ChangeEventHandler<HTMLInputElement>;
  unselect: React.ChangeEventHandler<HTMLInputElement>;
  toggle: React.ChangeEventHandler<HTMLInputElement>;
  groupValue: GroupToggleStateProps<T>['groupValue'];
};

/**
 *
 * @param values - An array of all possible options. Make sure the array doesn't change if it's the same values so that the handlers will also stay the same.
 * @param initialState - Initial checked option values.
 * @returns [
 *  state,
    {
      getSelectedState,
      select,
      unselect,
      toggle,
      groupValue,
    }
  ]
 */
export const useCheckboxGroupState = <T extends string | number>(
  values: T[],
  initialState?: T[]
): [Set<T>, CheckboxGroupStateProps<T>] => {
  const [
    state,
    { select: _select, unselect: _unselect, toggle: _toggle, getSelectedState, groupValue },
  ] = useGroupToggler(values, initialState);

  const select = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    event => {
      _select(event?.target.value as T);
    },
    [_select]
  );

  const unselect = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    event => {
      _unselect(event?.target.value as T);
    },
    [_unselect]
  );

  const toggle = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    event => {
      _toggle(event?.target.value as T);
    },
    [_toggle]
  );

  return [
    state,
    {
      getSelectedState,
      select,
      unselect,
      toggle,
      groupValue,
    },
  ];
};
