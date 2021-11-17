import { createContext, useContext } from 'react';

export const MobileMenuChildrenContext = createContext(false);
export const useMobileMenuChildrenContext = () => useContext(MobileMenuChildrenContext);
