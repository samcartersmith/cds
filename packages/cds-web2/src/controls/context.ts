import { createContext, useContext } from 'react';

import type { StaticStyleProps } from '../styles/styleProps';

// TO DO: update this once we have the global theme namespace
export type InputVariant = Extract<
  StaticStyleProps['color'],
  | 'textPositive'
  | 'textNegative'
  | 'textForeground'
  | 'textPrimary'
  | 'textForegroundMuted'
  | 'backgroundAlternate'
>;

export const TextInputFocusVariantContext = createContext<InputVariant | undefined>(undefined);
export const useTextInputFocusVariantContent = () => useContext(TextInputFocusVariantContext);
