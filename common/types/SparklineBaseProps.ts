import { SharedProps } from './SharedProps';

export interface SparklineBaseProps extends SharedProps {
  color: string;
  height: number;
  path?: string;
  width: number;
}
