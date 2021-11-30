import React from 'react';

type OffsetConfigProps = {
  label: boolean;
  compact: boolean;
};

/** Menu is exclusively for Web ONLY. Use Tray for Mobile */
export type MenuBaseProps = {
  /** Parent Ref is used to calculate Menu offset when the trigger is a SelectInput */
  parentRef?: React.RefObject<HTMLElement | null>;
  /** Trigger Ref is required, because we need to be able to focus the trigger after an option has been chosen via keyboard interaction */
  triggerRef: React.RefObject<HTMLElement | null>;
  /** Object passed when SelectInput is used as a trigger. Used to calculate the Menu offset based on presence of nodes in parent InputStack */
  offsetConfig?: OffsetConfigProps;
  /** Callback that is fired whenever a select option is selected */
  onChange?: (newValue: string) => void;
  /** Default selected value, or preselected value */
  value?: string;
  /** Callback used to dismiss the Menu via interactions with children */
  dismissMenu: () => void;
  /** Menu width */
  width?: number;
};
