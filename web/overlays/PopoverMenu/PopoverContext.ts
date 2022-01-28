import React from 'react';
import { PopoverContextType } from './usePopoverMenu';

const errorMessage =
  'PopoverContext is undefined. PopoverProvider was not found higher up the tree. ';

const createPopoverContext = () => {
  const PopoverContext = React.createContext<PopoverContextType | undefined>(undefined);
  const PopoverProvider = PopoverContext.Provider;

  const usePopoverContext = () => {
    const context = React.useContext(PopoverContext);
    if (!context) {
      throw new Error(errorMessage);
    }
    return context;
  };

  return {
    usePopoverContext,
    PopoverProvider,
    PopoverContext,
  };
};

export const { usePopoverContext, PopoverProvider, PopoverContext } = createPopoverContext();
