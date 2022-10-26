import React, { useCallback, useState } from 'react';

import { Button } from '../../buttons';
import { HStack, VStack } from '../../layout';
import { TextTitle1 } from '../../typography';
import { TextInput } from '../TextInput';

export const AddressForm = ({ ...props }) => {
  const gap = 3;
  const [onClick, setOnClick] = useState(false);

  const hanldeOnClick = useCallback(() => {
    setOnClick(!onClick);
  }, [onClick]);

  return (
    <form {...props} method="get">
      <VStack gap={gap}>
        <TextInput
          label="Street address"
          placeholder="4321 Jade Palace"
          helperText="Please enter your primary address."
        />
        <TextInput label="Unit #" aria-required="true" />
        <HStack gap={gap}>
          <TextInput label="City/town" width="70%" />
          <TextInput label="State" width="30%" />
        </HStack>
        <HStack gap={gap}>
          <TextInput label="Postal code" width="40%" />
          <TextInput label="Country" width="60%" />
        </HStack>
        <Button onPress={hanldeOnClick} testID="save-btn" type="submit">
          Save
        </Button>
        {onClick && <TextTitle1 as="h1">Submit button was clicked</TextTitle1>}
      </VStack>
    </form>
  );
};
