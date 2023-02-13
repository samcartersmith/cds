import { createContext, useContext } from 'react';

/** @deprecated */
export const MobileMenuChildrenContext = createContext(false);
/** @deprecated */
export const useMobileMenuChildrenContext = () => useContext(MobileMenuChildrenContext);
