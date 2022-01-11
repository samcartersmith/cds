import { ButtonBaseProps, InternalSpacingProps } from '@cbhq/cds-common';
import { useMemo } from 'react';
import { isRtl } from '../utils/isRtl';

type FlushProps = {
  flush: ButtonBaseProps['flush'];
  spacing: InternalSpacingProps;
};

export const useFlushStyles = ({ flush, spacing }: FlushProps) => {
  let offsetDirection = flush === 'start' ? 'left' : 'right';
  // We need to invert the setup for RTL
  if (isRtl()) {
    offsetDirection = flush === 'start' ? 'right' : 'left';
  }

  const style = useMemo(
    () => ({
      marginLeft: offsetDirection === 'left' ? `calc(var(--spacing-${spacing.start}) * -1)` : 0,
      marginRight: offsetDirection === 'right' ? `calc(var(--spacing-${spacing.end}) * -1)` : 0,
      minWidth: 'unset',
    }),
    [offsetDirection, spacing],
  );

  return flush ? style : null;
};
