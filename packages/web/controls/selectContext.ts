import { createContext, useContext } from 'react';
import { NoopFn, SelectBaseProps } from '@cbhq/cds-common/types';
import { NoopFn as MockNoop } from '@cbhq/cds-common/utils/mockUtils';

/** @deprecated Q42023 please import from @cbhq/cds-web-overlays instead */
export type SelectContextType = {
  handleCloseMenu?: NoopFn;
} & Pick<SelectBaseProps, 'onChange' | 'value'>;
export const defaultContext = {
  onChange: MockNoop,
  value: undefined,
  handleCloseMenu: undefined,
};

/** @deprecated Q42023 please import from @cbhq/cds-web-overlays instead */
export const SelectContext = createContext<SelectContextType>(defaultContext);
/** @deprecated Q42023 please import from @cbhq/cds-web-overlays instead */
export const SelectProvider = SelectContext.Provider;

/** @deprecated Q42023 please import from @cbhq/cds-web-overlays instead */
export const useSelectContext = () => useContext(SelectContext);
