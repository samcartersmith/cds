import { createContext, useContext } from 'react';
import { SelectBaseProps } from '@cbhq/cds-common/types';
import { NoopFn as MockNoop } from '@cbhq/cds-common/utils/mockUtils';

export type SelectContextType = {
  handleCloseMenu?: () => void;
} & Pick<SelectBaseProps, 'onChange' | 'value'>;
export const defaultContext = {
  onChange: MockNoop,
  value: undefined,
  handleCloseMenu: undefined,
};

export const SelectContext = createContext<SelectContextType>(defaultContext);
export const SelectProvider = SelectContext.Provider;

export const useSelectContext = () => useContext(SelectContext);
