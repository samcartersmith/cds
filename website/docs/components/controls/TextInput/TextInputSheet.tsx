import { TextInput } from '@cbhq/cds-web/controls/TextInput';
import { HStack, Box } from '@cbhq/cds-web/layout';

export const TextInputSheet = () => {
  return (
    <HStack gap={3} width="80%">
      <TextInput label="Label" placeholder="Input text" helperText="Assistive Message" />
      <Box spacingTop={4}>
        <TextInput compact label="Label" placeholder="Input text" helperText="Assistive Message" />
      </Box>
    </HStack>
  );
};
