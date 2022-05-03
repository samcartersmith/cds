import { createContext, useContext } from 'react';
import { NoopFn, SelectBaseProps } from '@cbhq/cds-common/types';
import { NoopFn as MockNoop } from '@cbhq/cds-common/utils/mockUtils';

export type SelectContextType = {
  handleCloseMenu: NoopFn;
} & Pick<SelectBaseProps, 'onChange' | 'value'>;

const defaultContext = {
  onChange: MockNoop,
  value: undefined,
  handleCloseMenu: MockNoop,
};

export const SelectContext = createContext<SelectContextType>(defaultContext);
export const SelectProvider = SelectContext.Provider;

export const useSelectContext = () => useContext(SelectContext);
