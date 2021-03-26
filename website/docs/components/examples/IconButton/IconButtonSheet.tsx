import { IconButton } from '@cbhq/cds-web/buttons/IconButton';
import { HStack, Box } from '@cbhq/cds-web/layout';

const variants = ['primary', 'secondary'] as const;

export const IconButtonSheet = () => {
  return (
    <HStack alignSelf="center">
      {variants.map((variant, index) => (
        <Box flexDirection="row" key={index} width={140}>
          <IconButton variant={variant} accessibilityLabel="allTimeHigh" name="allTimeHigh" />
          <p style={{ paddingTop: 5, paddingLeft: 10 }}>
            {variant.charAt(0).toUpperCase() + variant.slice(1)}
          </p>
        </Box>
      ))}
    </HStack>
  );
};
