import { TextField } from '@cbhq/cds-web/inputs/TextField';
import { HStack, Box } from '@cbhq/cds-web/layout';

export const TextFieldSheet = () => {
  return (
    <HStack gap={3} width="80%">
      <TextField label="Label" placeholder="Input text" helperText="Assistive Message" />
      <Box spacingTop={4}>
        <TextField compact label="Label" placeholder="Input text" helperText="Assistive Message" />
      </Box>
    </HStack>
  );
};
