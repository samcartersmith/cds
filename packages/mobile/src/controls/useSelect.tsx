import { useMemo } from 'react';
import { SelectBaseProps } from '@cbhq/cds-common';

export const useSelect = ({
  value,
  onChange,
  handleClose,
}: { handleClose?: () => void } & Pick<SelectBaseProps, 'value' | 'onChange'>) => {
  return useMemo(
    () => ({
      value,
      onChange,
      handleClose,
    }),
    [value, onChange, handleClose],
  );
};

export type SelectContextType = ReturnType<typeof useSelect>;
