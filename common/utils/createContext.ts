import React from 'react';

const defaultErrorMessage =
  '`context` is undefined. You must have forgotten to wrap your component in a Provider.';

export function createContext<T>(name?: string, errorMessage?: string) {
  const Context = React.createContext<T | undefined>(undefined);
  const ContextProvider = Context.Provider;
  Context.displayName = name;

  const useContext = () => {
    const context = React.useContext(Context);
    if (!context) {
      throw new Error(errorMessage ?? defaultErrorMessage);
    }
    return context;
  };

  return {
    useContext,
    ContextProvider,
    Context,
  };
}
