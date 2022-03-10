import React, { useCallback } from 'react';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { SelectOption } from '../SelectOption';

export default function SelectOptionScreen() {
  const handleOptionPress = useCallback(() => {
    console.log('pressed');
  }, []);
  return (
    <ExampleScreen>
      <Example title="Default">
        <SelectOption value="Title" description="Description" onPress={handleOptionPress} />
      </Example>
      <Example title="Default with description">
        <SelectOption
          value="Title"
          title="Title"
          description="Description"
          onPress={handleOptionPress}
        />
      </Example>
      <Example title="Default with description and selected">
        <SelectOption
          value="Title"
          title="Title"
          description="Description"
          onPress={handleOptionPress}
        />
      </Example>
    </ExampleScreen>
  );
}
