import { ElementChildren } from './React';
import { SharedProps } from './SharedProps';

export type SparklineBaseProps = {
  /** @danger Use this only if the background color beneath the Sparkline is a non-CDS color. It ensures an accessible contrast by returning either white or black when color is set to 'auto'. Accepts any valid color format (hex, RGB, RGBA). */
  background?: string;
  /** The color of the Sparkline graph's line. Accepts any raw color value (hex, rgba, hsl, etc) or 'auto'. Using 'auto' dynamically selects black or white for optimal accessibility. Does not work with CDS theme color names like 'fgPrimary' or CSS variables.  */
  color: string;
  /** Height of the Sparkline */
  height: number;
  /** Svg path as string. CDS offers a `useSparklinePath` which is useful to generate this string. This is accessible via `import { useSparklinePath } from '@cbhq/cds-common/visualizations/useSparklinePath';`. Alternatively, you can use product tailored tooling to generate the SVG path. This component only requires a valid path string is provided. */
  path?: string;
  /** Width of the Sparkline */
  width: number;
  /** an optional SparklineArea that can be used to fill in the Sparkline */
  children?: ElementChildren<SparklineAreaBaseProps>;
} & SharedProps &
  SparklineScalingBaseProps;

export type SparklineScalingBaseProps = {
  /** Scales the sparkline to show more or less variance. Use a number less than 1 for less variance and a number greater than 1 for more variance. If you use a number greater than 1 it may clip the boundaries of the sparkline. */
  yAxisScalingFactor?: number;
};

export type SparklineFallbackProps = Pick<SparklineBaseProps, 'height' | 'width'>;

export type SparklineAreaBaseProps = {
  area?: string;
  patternId?: string;
};

export type SparklineAreaPatternBaseProps = {
  color: string;
  id: string;
};
