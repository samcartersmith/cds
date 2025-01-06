import React from 'react';
import { InputStackBaseProps } from '@cbhq/cds-common2';

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
      appendNode={
        <Box background="backgroundPrimary">
          <TextBody>Append</TextBody>
        </Box>
      }
      borderStyle={{
        borderWidth: 1,
      }}
      endNode={
        <Box background="backgroundPositive">
          <TextBody>EndContent</TextBody>
        </Box>
      }
      helperTextNode={
        <Box background="backgroundOverlay" height={30} width="100%">
          <TextBody>helperText</TextBody>
        </Box>
      }
      labelNode={
        <Box background="backgroundAlternate" height={30} width="100%">
          <TextBody>Label</TextBody>
        </Box>
      }
      prependNode={
        <Box background="backgroundPrimary">
          <TextBody>Prepend</TextBody>
        </Box>
      }
      startNode={
        <Box background="backgroundPositive">
          <TextBody>StartContent</TextBody>
        </Box>
      }
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
          focused
          inputNode={
            <Box background="backgroundAlternate" flexGrow={2}>
              <TextBody>Input</TextBody>
            </Box>
          }
        />
      </Example>
      <Example inline title="Input Prepend Only - Test for borderRadius">
        {/*
         * Ensure that every compartment does what its suppose to
         */}
        <InputStack
          borderStyle={{
            borderWidth: 1,
          }}
          endNode={
            <Box background="backgroundPositive">
              <TextBody>EndContent</TextBody>
            </Box>
          }
          helperTextNode={
            <Box background="backgroundOverlay" height={30} width="100%">
              <TextBody>helperText</TextBody>
            </Box>
          }
          inputNode={
            <Box background="backgroundAlternate" flexGrow={2}>
              <TextBody>Input</TextBody>
            </Box>
          }
          labelNode={
            <Box background="backgroundAlternate" height={30} width="100%">
              <TextBody>Label</TextBody>
            </Box>
          }
          prependNode={
            <Box background="backgroundPrimary">
              <TextBody>Prepend</TextBody>
            </Box>
          }
          startNode={
            <Box background="backgroundPositive">
              <TextBody>StartContent</TextBody>
            </Box>
          }
          variant="primary"
        />
      </Example>
      <Example inline title="Input Append Only - Test for borderRadius">
        {/*
         * Ensure that every compartment does what its suppose to
         */}
        <InputStack
          appendNode={
            <Box background="backgroundPrimary">
              <TextBody>Append</TextBody>
            </Box>
          }
          borderStyle={{
            borderWidth: 1,
          }}
          endNode={
            <Box background="backgroundPositive">
              <TextBody>EndContent</TextBody>
            </Box>
          }
          helperTextNode={
            <Box background="backgroundOverlay" height={30} width="100%">
              <TextBody>helperText</TextBody>
            </Box>
          }
          inputNode={
            <Box background="backgroundAlternate" flexGrow={2}>
              <TextBody>Input</TextBody>
            </Box>
          }
          labelNode={
            <Box background="backgroundAlternate" height={30} width="100%">
              <TextBody>Label</TextBody>
            </Box>
          }
          startNode={
            <Box background="backgroundPositive">
              <TextBody>StartContent</TextBody>
            </Box>
          }
          variant="primary"
        />
      </Example>
    </ExampleScreen>
  );
}
