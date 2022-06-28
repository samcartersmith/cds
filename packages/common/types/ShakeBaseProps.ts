import { ReactNode } from 'react';

import { HintMotionBaseProps } from './MotionBaseProps';

export type ShakeRefBaseProps = {
  play: () => Promise<void>;
};

export type ShakeBaseProps = {
  children: ReactNode;
} & HintMotionBaseProps;
