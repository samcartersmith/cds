import React, { memo, ReactNode } from 'react';

export type PopoverTriggerWrapperProps = {
  children: ReactNode;
};

/**
 * This component should only be used to wrap a non interactable component that wraps a PopoverTrigger
 */
export const PopoverTriggerWrapper = memo(function PopoverTriggerWrapper({
  children,
}: PopoverTriggerWrapperProps) {
  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>;
});
