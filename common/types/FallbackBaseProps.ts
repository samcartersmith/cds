import { Shape } from './Shape';

export interface FallbackBaseProps {
  height: number;
  shape?: Shape;
  width: number | string;
}
