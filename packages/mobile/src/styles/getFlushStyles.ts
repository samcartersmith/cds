import { I18nManager, ViewStyle } from 'react-native';
import { ButtonBaseProps } from '@cbhq/cds-common';
import { memoize } from '@cbhq/cds-common/utils/memoize';
import { emptyObject } from '@cbhq/cds-utils';

type GetFlushStylesProps = {
  flush: ButtonBaseProps['flush'];
  spacing: ViewStyle;
};

function getCacheKey({
  flush,
  spacing: { paddingLeft = 0, paddingRight = 0 },
}: GetFlushStylesProps) {
  return `${flush}-${paddingLeft}-${paddingRight}`;
}

export const getFlushStyles = memoize(function getFlushStyles({
  flush,
  spacing,
}: GetFlushStylesProps): ViewStyle {
  let offsetDirection = flush === 'start' ? 'left' : 'right';
  // We need to invert the setup for RTL
  if (I18nManager.isRTL) {
    offsetDirection = flush === 'start' ? 'right' : 'left';
  }

  const style = {
    marginLeft: offsetDirection === 'left' ? Number(spacing.paddingLeft ?? 0) * -1 : 0,
    marginRight: offsetDirection === 'right' ? Number(spacing.paddingRight ?? 0) * -1 : 0,
  };

  return flush ? style : emptyObject;
},
getCacheKey);
