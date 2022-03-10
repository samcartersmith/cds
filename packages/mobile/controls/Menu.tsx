import React from 'react';
import { SelectBaseProps } from '@cbhq/cds-common/types/SelectBaseProps';

import { SelectProvider } from './SelectContext';
import { useSelect } from './useSelect';

export const Menu = ({
  onChange,
  value,
  children,
}: React.PropsWithChildren<Pick<SelectBaseProps, 'onChange' | 'value'>>) => {
  const context = useSelect({ onChange, value });
  return <SelectProvider value={context}>{children}</SelectProvider>;
};
