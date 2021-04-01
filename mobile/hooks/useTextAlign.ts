import { useMemo } from 'react';

import { TextAlignProps } from '@cbhq/cds-common';
import { I18nManager } from 'react-native';

export const useTextAlign = (align?: TextAlignProps['align']) => {
  return useMemo(() => {
    if (align === 'start') {
      return { textAlign: I18nManager.isRTL ? 'right' : 'left' };
    }
    if (align === 'end') {
      return { textAlign: I18nManager.isRTL ? 'left' : 'right' };
    }
    return align;
  }, [align]);
};
