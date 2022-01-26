import React, { ReactNode } from 'react';

export type PopoverTriggerWrapperProps = {
  children: ReactNode;
};

/** This component should only be used to wrap a non interactable component that wraps a PopoverTrigger */
export const PopoverTriggerWrapper = ({ children }: PopoverTriggerWrapperProps) => <>{children}</>;
