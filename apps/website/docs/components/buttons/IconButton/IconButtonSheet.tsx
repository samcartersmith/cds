import { memo } from 'react';
import { capitalize } from '@cbhq/cds-utils';
import { IconButton } from '@cbhq/cds-web/buttons/IconButton';
import { Box } from '@cbhq/cds-web/layout/Box';
import { HStack } from '@cbhq/cds-web/layout/HStack';
import { VStack } from '@cbhq/cds-web/layout/VStack';

const transparentOptions = [
  {
    variant: 'primary',
    iconName: 'annotation',
  },
  {
    variant: 'secondary',
    iconName: 'lock',
  },
  {
    variant: 'foregroundMuted',
    iconName: 'info',
  },
] as const;

const defaultOptions = [
  {
    variant: 'primary',
    iconName: 'annotation',
  },
  {
    variant: 'secondary',
    iconName: 'lock',
  },
  {
    variant: 'foregroundMuted',
    iconName: 'info',
  },
] as const;

export const IconButtonSheet = memo(() => {
  return (
    <VStack>
      <HStack alignSelf="flex-start">
        {defaultOptions.map((option, index) => (
          <Box key={index} flexDirection="row" spacingEnd={10}>
            <IconButton
              accessibilityLabel={option.iconName}
              name={option.iconName}
              transparent={false}
              variant={option.variant}
            />
            <p style={{ paddingTop: 5, paddingLeft: 10 }}>{`${capitalize(option.variant)}`}</p>
          </Box>
        ))}
      </HStack>
      <HStack alignSelf="flex-start" spacingVertical={3}>
        {transparentOptions.map((option, index) => (
          <Box key={index} flexDirection="row" spacingEnd={2}>
            <IconButton
              transparent
              accessibilityLabel={option.iconName}
              name={option.iconName}
              variant={option.variant}
            />
            <p style={{ paddingTop: 5, paddingLeft: 10 }}>
              {`${capitalize(option.variant)} Transparent`}
            </p>
          </Box>
        ))}
      </HStack>
    </VStack>
  );
});
