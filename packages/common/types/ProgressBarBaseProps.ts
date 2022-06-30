import type { PaletteForeground } from './Palette';
import type { Placement } from './Placement';
import type { ProgressBaseProps } from './ProgressBaseProps';
import type { SpacingProps } from './SpacingProps';

export type ProgressBarLabel =
  | number
  | {
      value: number;
      render: (num: number, disabled?: boolean) => React.ReactNode;
    };

export type ProgressBarWithFixedLabelsProps = {
  /** Label that is pinned to the start of the container. If a number is used then it will format it as a percentage. */
  startLabel?: ProgressBarLabel;

  /** Label that is pinned to the end of the container. If a number is used then it will format it as a percentage. */
  endLabel?: ProgressBarLabel;

  /**
   * Position of label relative to the bar
   * @default beside
   * */
  labelPlacement?: Extract<Placement, 'above' | 'below' | 'beside'>;
} & Pick<ProgressBaseProps, 'disabled' | 'testID'>;

export type ProgressBarWithFloatLabelProps = {
  /** Label that is floated at the end of the filled in bar. If a number is used then it will format it as a percentage. */
  label: ProgressBarLabel;

  /**
   * Position of label relative to the bar
   * @default above
   * */
  labelPlacement?: Extract<Placement, 'above' | 'below'>;
} & Pick<ProgressBaseProps, 'progress' | 'disabled' | 'testID'>;

export type ProgressBarFloatLabelProps = Pick<
  ProgressBarWithFloatLabelProps,
  'label' | 'progress' | 'disabled' | 'labelPlacement'
>;

export type ProgressBarFixedLabelContainerProps = Omit<
  ProgressBarWithFixedLabelsProps,
  'labelPlacement' | 'progress'
> &
  Pick<SpacingProps, 'spacingBottom' | 'spacingTop'>;

export type ProgressBarFixedLabelBesideProps = {
  label: ProgressBarLabel;
} & Pick<ProgressBarWithFixedLabelsProps, 'disabled'>;

export type ProgressBarFixedLabelProps = {
  position: 'start' | 'end';
  label: ProgressBarLabel;
} & Pick<ProgressBarWithFixedLabelsProps, 'disabled'>;

export type ProgressTextLabelProps = {
  value: number;
  renderLabel?: (num: number, disabled?: boolean) => React.ReactNode;
  color?: PaletteForeground;
} & Pick<ProgressBaseProps, 'disabled'>;
