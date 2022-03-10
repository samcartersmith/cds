import { Box, BoxProps } from '@cbhq/cds-web/layout';
import { TextBody } from '@cbhq/cds-web/typography';

export function ExampleBox({ children, ...otherProps }: BoxProps) {
  return (
    <Box spacing={1} background="backgroundAlternate" {...otherProps}>
      <TextBody as="p">{children}</TextBody>
    </Box>
  );
}
