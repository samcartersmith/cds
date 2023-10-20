import { Box, BoxProps } from '@cbhq/cds-web/layout';
import { TextBody } from '@cbhq/cds-web/typography';

export function ExampleBox({ children, ...otherProps }: BoxProps) {
  return (
    <Box background="backgroundAlternate" spacing={1} {...otherProps}>
      <TextBody as="p">{children}</TextBody>
    </Box>
  );
}
