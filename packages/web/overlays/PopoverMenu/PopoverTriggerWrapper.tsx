import React, { memo, ReactNode } from 'react';

/** @deprecated */
export type PopoverTriggerWrapperProps = {
  children: ReactNode;
};

/**
 * @deprecated PopoverMenu has been deprecated. Please use Dropdown instead.
 */
export const PopoverTriggerWrapper = memo(function PopoverTriggerWrapper({
  children,
}: PopoverTriggerWrapperProps) {
  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>;
});
