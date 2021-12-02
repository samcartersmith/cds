import { DotBaseProps } from './DotBaseProps';

export type DotCountBaseProps = Omit<DotBaseProps, 'size'> & { count: number };
