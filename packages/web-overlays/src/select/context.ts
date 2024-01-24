import { createContext, useContext } from 'react';
import { NoopFn, SelectBaseProps } from '@cbhq/cds-common/types';
import { NoopFn as MockNoop } from '@cbhq/cds-common/utils/mockUtils';

/** @deprecated @cbhq/cds-web-overlays will be removed in CDS v6.0.0. Please use cds-web instead */
export type SelectContextType = {
  handleCloseMenu?: NoopFn;
} & Pick<SelectBaseProps, 'onChange' | 'value'>;
/** @deprecated @cbhq/cds-web-overlays will be removed in CDS v6.0.0. Please use cds-web instead */
export const defaultContext = {
  onChange: MockNoop,
  value: undefined,
  handleCloseMenu: undefined,
};

/** @deprecated @cbhq/cds-web-overlays will be removed in CDS v6.0.0. Please use cds-web instead */
export const SelectContext = createContext<SelectContextType>(defaultContext);
/** @deprecated @cbhq/cds-web-overlays will be removed in CDS v6.0.0. Please use cds-web instead */
export const SelectProvider = SelectContext.Provider;

/** @deprecated @cbhq/cds-web-overlays will be removed in CDS v6.0.0. Please use cds-web instead */
export const useSelectContext = () => useContext(SelectContext);
