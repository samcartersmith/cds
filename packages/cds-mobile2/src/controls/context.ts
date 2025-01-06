import { createContext } from 'react';
import { InputVariant } from '@cbhq/cds-common2/types/InputBaseProps';

export const TextInputFocusVariantContext = createContext<InputVariant | undefined>(undefined);
