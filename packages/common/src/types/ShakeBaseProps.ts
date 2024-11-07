import { HintMotionBaseProps } from './MotionBaseProps';

export type ShakeRefBaseProps = {
  play: () => Promise<void>;
};

export type ShakeBaseProps = {
  children: React.ReactNode;
} & HintMotionBaseProps;
