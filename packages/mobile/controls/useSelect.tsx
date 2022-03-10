import { useMemo } from 'react';
import { SelectBaseProps } from '@cbhq/cds-common';

export const useSelect = ({ value, onChange }: Pick<SelectBaseProps, 'value' | 'onChange'>) => {
  return useMemo(
    () => ({
      value,
      onChange,
    }),
    [value, onChange],
  );
};

export type SelectContextType = ReturnType<typeof useSelect>;
