import React, { useCallback } from 'react';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { TextTitle1 } from '../../typography';
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
      {/** I have an example here to test that title and description can take reactNode. If they take reactNode, we must specify the accessibilityLabel and accessibilityHint */}
      <Example title="Set title and description to be ReactNodes">
        <SelectOption
          value="Title"
          accessibilityLabel="Title"
          accessibilityHint="Hint"
          title={<TextTitle1>Title</TextTitle1>}
          description={<TextTitle1>Description</TextTitle1>}
          onPress={handleOptionPress}
        />
      </Example>
      <Example title="Multi line">
        <SelectOption
          multiline
          title="Title"
          description="This is a really long description that will be multiple lines long"
          value="test"
        />
      </Example>
    </ExampleScreen>
  );
}
