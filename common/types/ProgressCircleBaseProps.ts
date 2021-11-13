import { ProgressBaseProps } from './ProgressBaseProps';

export type ProgressCircleBaseProps = {
  /** Toggle used to hide the inner circle percentage */
  hideProgressText: boolean;
} & ProgressBaseProps;

export type ProgressCircleBaseText = Pick<ProgressCircleBaseProps, 'progress'>;
