import { ProgressBarBaseProps } from '../types/ProgressBarBaseProps';

export function useProgressBarHasLabel({
  startLabel,
  endLabel,
  labelPlacement,
}: Pick<ProgressBarBaseProps, 'startLabel' | 'endLabel' | 'labelPlacement'>) {
  return (!!startLabel || !!endLabel) && labelPlacement !== 'beside';
}
