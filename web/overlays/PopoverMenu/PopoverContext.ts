import { createContext } from '@cbhq/cds-common/utils/createContext';
import { PopoverContextType } from './usePopoverMenu';

export const { useContext: usePopoverContext, ContextProvider: PopoverProvider } =
  createContext<PopoverContextType>(
    'PopoverContext',
    '`context` is undefined. PopoverProvider was not found higher up the tree. ',
  );
