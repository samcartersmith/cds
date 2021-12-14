import React, { useCallback } from 'react';
import { SelectOption } from '../SelectOption';
import { Example, ExampleScreen } from '../../examples/ExampleScreen';

export default function SelectOptionScreen() {
  const handleOptionPress = useCallback(() => {
    // eslint-disable-next-line no-console
    console.log('pressed');
  }, []);
  return (
    <ExampleScreen>
      <Example title="Default">
        <SelectOption description="Description" onPress={handleOptionPress} />
      </Example>
      <Example title="Default with description">
        <SelectOption title="Title" description="Description" onPress={handleOptionPress} />
      </Example>
      <Example title="Default with description and selected">
        <SelectOption
          title="Title"
          description="Description"
          selected
          onPress={handleOptionPress}
        />
      </Example>
      <Example title="Default (Compact)">
        <SelectOption compact description="Description" onPress={handleOptionPress} />
      </Example>
      <Example title="Default with description (Compact)">
        <SelectOption compact title="Title" description="Description" onPress={handleOptionPress} />
      </Example>
      <Example title="Default with description and selected (Compact)">
        <SelectOption
          compact
          title="Title"
          description="Description"
          selected
          onPress={handleOptionPress}
        />
      </Example>
    </ExampleScreen>
  );
}
