import React from 'react';

import { Example } from '../../examples/ExampleScreen';
import { Box } from '../../layout';
import { TextTitle1 } from '../TextTitle1';

import TextExamplesScreen from './TextExamples';

export default () => (
  <TextExamplesScreen
    component={TextTitle1}
    extraExample={
      <Example title="Accessible Heading">
        <Box>
          <TextTitle1 accessibilityRole="header">Title</TextTitle1>
        </Box>
      </Example>
    }
  />
);
