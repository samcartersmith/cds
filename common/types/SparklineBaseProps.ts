import { SharedProps } from './SharedProps';

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
} & SharedProps;

export type SparklineFallbackProps = Pick<SparklineBaseProps, 'height' | 'width'>;
