import React, { memo, ReactNode } from 'react';

export type PopoverTriggerWrapperProps = {
  children: ReactNode;
};

/**
 * @deprecated DO NOT USE: This is an unreleased component and is unstable
 * This component should only be used to wrap a non interactable component that wraps a PopoverTrigger
 */
export const PopoverTriggerWrapper = memo(function PopoverTriggerWrapper({
  children,
}: PopoverTriggerWrapperProps) {
  return <>{children}</>;
});
