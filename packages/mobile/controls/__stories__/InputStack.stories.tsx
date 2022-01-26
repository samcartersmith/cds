import React from 'react';
import { InputStackBaseProps } from '@cbhq/cds-common';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { Box } from '../../layout/Box';
import { TextBody } from '../../typography/TextBody';
import { InputStack } from '../InputStack';

const InputStackBasic = (props: InputStackBaseProps) => {
  // {/*
  //  * Ensure that every compartment does what its suppose to
  //  */}
  return (
    <InputStack
      prependNode={
        <Box background="primary">
          <TextBody>Prepend</TextBody>
        </Box>
      }
      appendNode={
        <Box background="primary">
          <TextBody>Append</TextBody>
        </Box>
      }
      startNode={
        <Box background="positive">
          <TextBody>StartContent</TextBody>
        </Box>
      }
      endNode={
        <Box background="positive">
          <TextBody>EndContent</TextBody>
        </Box>
      }
      labelNode={
        <Box background="backgroundAlternate" width="100%" height={30}>
          <TextBody>Label</TextBody>
        </Box>
      }
      helperTextNode={
        <Box background="backgroundOverlay" width="100%" height={30}>
          <TextBody>helperText</TextBody>
        </Box>
      }
      borderStyle={{
        borderWidth: 1,
      }}
      variant="primary"
      {...props}
    />
  );
};

export default function InputStackScreen() {
  return (
    <ExampleScreen>
      <Example inline title="Input Stack">
        <InputStackBasic
          inputNode={
            <Box background="backgroundAlternate" flexGrow={2}>
              <TextBody>Input</TextBody>
            </Box>
          }
        />
      </Example>
      <Example inline title="Input Stack Focused">
        <InputStackBasic
          inputNode={
            <Box background="backgroundAlternate" flexGrow={2}>
              <TextBody>Input</TextBody>
            </Box>
          }
          focused
        />
      </Example>
      <Example inline title="Input Prepend Only - Test for borderRadius">
        {/*
         * Ensure that every compartment does what its suppose to
         */}
        <InputStack
          prependNode={
            <Box background="primary">
              <TextBody>Prepend</TextBody>
            </Box>
          }
          startNode={
            <Box background="positive">
              <TextBody>StartContent</TextBody>
            </Box>
          }
          endNode={
            <Box background="positive">
              <TextBody>EndContent</TextBody>
            </Box>
          }
          inputNode={
            <Box background="backgroundAlternate" flexGrow={2}>
              <TextBody>Input</TextBody>
            </Box>
          }
          labelNode={
            <Box background="backgroundAlternate" width="100%" height={30}>
              <TextBody>Label</TextBody>
            </Box>
          }
          helperTextNode={
            <Box background="backgroundOverlay" width="100%" height={30}>
              <TextBody>helperText</TextBody>
            </Box>
          }
          borderStyle={{
            borderWidth: 1,
          }}
          variant="primary"
        />
      </Example>
      <Example inline title="Input Append Only - Test for borderRadius">
        {/*
         * Ensure that every compartment does what its suppose to
         */}
        <InputStack
          appendNode={
            <Box background="primary">
              <TextBody>Append</TextBody>
            </Box>
          }
          startNode={
            <Box background="positive">
              <TextBody>StartContent</TextBody>
            </Box>
          }
          endNode={
            <Box background="positive">
              <TextBody>EndContent</TextBody>
            </Box>
          }
          inputNode={
            <Box background="backgroundAlternate" flexGrow={2}>
              <TextBody>Input</TextBody>
            </Box>
          }
          labelNode={
            <Box background="backgroundAlternate" width="100%" height={30}>
              <TextBody>Label</TextBody>
            </Box>
          }
          helperTextNode={
            <Box background="backgroundOverlay" width="100%" height={30}>
              <TextBody>helperText</TextBody>
            </Box>
          }
          borderStyle={{
            borderWidth: 1,
          }}
          variant="primary"
        />
      </Example>
    </ExampleScreen>
  );
}
