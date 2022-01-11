import { ButtonBaseProps } from '@cbhq/cds-common';
import { useMemo } from 'react';
import { I18nManager, ViewStyle } from 'react-native';

type Props = {
  flush: ButtonBaseProps['flush'];
  spacing: ViewStyle;
};

export const useFlushStyles = ({ flush, spacing }: Props): ViewStyle => {
  let offsetDirection = flush === 'start' ? 'left' : 'right';
  // We need to invert the setup for RTL
  if (I18nManager.isRTL) {
    offsetDirection = flush === 'start' ? 'right' : 'left';
  }

  const style = useMemo(
    () => ({
      marginLeft: offsetDirection === 'left' ? Number(spacing.paddingLeft ?? 0) * -1 : 0,
      marginRight: offsetDirection === 'right' ? Number(spacing.paddingRight ?? 0) * -1 : 0,
    }),
    [offsetDirection, spacing],
  );

  return flush ? style : {};
};
