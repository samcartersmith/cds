import { Box, BoxProps } from './Box';

export type HStackProps = Omit<BoxProps, 'flexDirection'>;

export const HStack: React.FC<HStackProps> = props => <Box {...props} flexDirection="row" />;
