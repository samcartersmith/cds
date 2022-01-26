import { createContext } from 'react';
import { InputVariant } from '@cbhq/cds-common/src/types/InputBaseProps';

export const TextInputFocusVariantContext = createContext<InputVariant | undefined>(undefined);
