import { SharedProps } from './SharedProps';
import { ElementChildren } from './React';

export type SparklineBaseProps = {
  /** @danger Only use if you have a non CDS color powering the background color that a Sparkline will appear on top of. This is needed to validate the the `color` prop is an accessible color, otherwise it will pick an appropriate replacement. Accepts any valid color (hex, rgb, rgba). */
  background?: string;
  /** Color of the plotted Sparkline. Accepts any valid color value. Do not pass in a CDS alias such as 'foreground' or a CSS Variable.  */
  color: string;
  /** Height of the Sparkline */
  height: number;
  /** Svg path as string. CDS offers a `useSparklinePath` which is useful to generate this string. This is accessible via `import { useSparklinePath } from '@cbhq/cds-common/visualizations/useSparklinePath';`. Alternatively, you can use product tailored tooling to generate the SVG path. This component only requires a valid path string is provided. */
  path?: string;
  /** Width of the Sparkline */
  width: number;
  /** Scales the sparkline to show more or less variance. Use a number less than 1 for less variance and a number greater than 1 for more variance. If you use a number greater than 1 it may clip the boundaries of the sparkline. */
  yAxisScalingFactor?: number;
  /** an optional SparklineArea that can be used to fill in the Sparkline */
  children?: ElementChildren<SparklineAreaBaseProps>;
} & SharedProps;

export type SparklineFallbackProps = Pick<SparklineBaseProps, 'height' | 'width'>;

export type SparklineAreaBaseProps = {
  area: string;
};

export const sparklineAreaPatternId = 'cds-sparkline-area-pattern';
