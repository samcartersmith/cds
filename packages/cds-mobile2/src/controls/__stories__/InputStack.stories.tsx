import React from 'react';
import { InputStackBaseProps } from '@cbhq/cds-common2';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { Box } from '../../layout/Box';
import { Text } from '../../typography/Text';
import { InputStack } from '../InputStack';

const InputStackBasic = (props: InputStackBaseProps) => {
  // {/*
  //  * Ensure that every compartment does what its suppose to
  //  */}
  return (
    <InputStack
      appendNode={
        <Box background="bgPrimary">
          <Text>Append</Text>
        </Box>
      }
      borderStyle={{
        borderWidth: 1,
      }}
      endNode={
        <Box background="bgPositive">
          <Text>EndContent</Text>
        </Box>
      }
      helperTextNode={
        <Box background="bgOverlay" height={30} width="100%">
          <Text>helperText</Text>
        </Box>
      }
      labelNode={
        <Box background="bgAlternate" height={30} width="100%">
          <Text>Label</Text>
        </Box>
      }
      prependNode={
        <Box background="bgPrimary">
          <Text>Prepend</Text>
        </Box>
      }
      startNode={
        <Box background="bgPositive">
          <Text>StartContent</Text>
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
            <Box background="bgAlternate" flexGrow={2}>
              <Text>Input</Text>
            </Box>
          }
        />
      </Example>
      <Example inline title="Input Stack Focused">
        <InputStackBasic
          focused
          inputNode={
            <Box background="bgAlternate" flexGrow={2}>
              <Text>Input</Text>
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
            <Box background="bgPositive">
              <Text>EndContent</Text>
            </Box>
          }
          helperTextNode={
            <Box background="bgOverlay" height={30} width="100%">
              <Text>helperText</Text>
            </Box>
          }
          inputNode={
            <Box background="bgAlternate" flexGrow={2}>
              <Text>Input</Text>
            </Box>
          }
          labelNode={
            <Box background="bgAlternate" height={30} width="100%">
              <Text>Label</Text>
            </Box>
          }
          prependNode={
            <Box background="bgPrimary">
              <Text>Prepend</Text>
            </Box>
          }
          startNode={
            <Box background="bgPositive">
              <Text>StartContent</Text>
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
            <Box background="bgPrimary">
              <Text>Append</Text>
            </Box>
          }
          borderStyle={{
            borderWidth: 1,
          }}
          endNode={
            <Box background="bgPositive">
              <Text>EndContent</Text>
            </Box>
          }
          helperTextNode={
            <Box background="bgOverlay" height={30} width="100%">
              <Text>helperText</Text>
            </Box>
          }
          inputNode={
            <Box background="bgAlternate" flexGrow={2}>
              <Text>Input</Text>
            </Box>
          }
          labelNode={
            <Box background="bgAlternate" height={30} width="100%">
              <Text>Label</Text>
            </Box>
          }
          startNode={
            <Box background="bgPositive">
              <Text>StartContent</Text>
            </Box>
          }
          variant="primary"
        />
      </Example>
    </ExampleScreen>
  );
}
