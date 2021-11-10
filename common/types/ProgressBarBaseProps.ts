import { PaletteForeground, SharedProps } from '.';

export type ProgressBarColor = Extract<
  PaletteForeground,
  'positive' | 'negative' | 'primary' | 'foreground'
>;

export type ProgressBarWeight = 'normal' | 'heavy';

export type ProgressBarBaseProps = {
  /** Number between 0-1 representing the progress bar percentage */
  progress: number;

  /** Toggle used to show a thicker bar
   * @default normal
   * */
  weight?: ProgressBarWeight;

  /**
   * Toggle used to show a disabled bar and text
   * @default false
   */
  disabled?: boolean;

  /** Label that is pinned to the start of the container */
  startLabel?: {
    value: number;
    render?: (num: number, disabled?: boolean) => string | React.ReactNode;
  };

  /** Label that is pinned to the end of the container or floated at the end of the filled in bar. If a render function is omitted then the value will be formatted as a percentage. */
  endLabel?: {
    value: number;
    float?: boolean;
    render?: (num: number, disabled?: boolean) => string | React.ReactNode;
  };

  /**
   * Position of label relative to the bar
   * @default above
   * */
  labelPlacement?: 'above' | 'below' | 'beside';

  /**
   * Custom bar color.
   * @default primary
   */
  barColor?: ProgressBarColor;
} & SharedProps;

// The rest are not exposed to public
export type InnerProgressBarBaseProps = {
  height: number;
} & Pick<ProgressBarBaseProps, 'progress' | 'startLabel' | 'endLabel' | 'disabled'> &
  Required<Pick<ProgressBarBaseProps, 'barColor'>>;

export type ProgressLabelContainerBaseProps = Pick<
  ProgressBarBaseProps,
  'progress' | 'startLabel' | 'endLabel' | 'disabled'
>;

type ProgressLabelBaseProps = {
  label: {
    value: number;
    float?: boolean;
    render?: (num: number, disabled?: boolean) => string | React.ReactNode;
  };
} & Pick<ProgressBarBaseProps, 'disabled'>;

export type ProgressBarFixedLabelBaseProps = {
  position: 'start' | 'end';
} & ProgressLabelBaseProps;

export type ProgressBarFloatLabelBaseProps = {
  progress: number;
} & ProgressLabelBaseProps;

export type ProgressTextLabelProps = {
  startNum: number;
  endNum: number;
  renderLabel: (num: number, disabled?: boolean) => string | React.ReactNode;
} & Pick<ProgressLabelBaseProps, 'disabled'>;
