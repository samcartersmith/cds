/* eslint-disable react/jsx-no-useless-fragment */
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
  return <>{children}</>;
});
