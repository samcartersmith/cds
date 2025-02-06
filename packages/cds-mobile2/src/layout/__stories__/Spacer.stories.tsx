import React from 'react';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { TextBody } from '../../typography';
import { Box } from '../Box';
import { HStack } from '../HStack';
import { Spacer } from '../Spacer';
import { VStack } from '../VStack';

const SpacerScreen = () => {
  return (
    <ExampleScreen>
      <Example title="Vertical space">
        <Box
          alignItems="center"
          background="bgAlternate"
          height={100}
          justifyContent="center"
          width="100%"
        >
          <TextBody>Top Content</TextBody>
        </Box>
        <Spacer vertical={3} />
        <Box
          alignItems="center"
          background="bgAlternate"
          height={100}
          justifyContent="center"
          width="100%"
        >
          <TextBody>Bottom Content</TextBody>
        </Box>
      </Example>

      <Example title="Horizontal space">
        <HStack>
          <Box
            alignItems="center"
            background="bgAlternate"
            height={30}
            justifyContent="center"
            width={150}
          >
            <TextBody>Left Content</TextBody>
          </Box>
          <Spacer horizontal={3} />
          <Box
            alignItems="center"
            background="bgAlternate"
            height={50}
            justifyContent="center"
            width={150}
          >
            <TextBody>Right Content</TextBody>
          </Box>
        </HStack>
      </Example>

      <Example title="Fluid space">
        <VStack background="bgPrimaryWash" height={150}>
          <Box bordered alignItems="center" height={50} justifyContent="center" width="100%">
            <TextBody>Top Content</TextBody>
          </Box>
          <Spacer />
          <Box bordered alignItems="center" height={50} justifyContent="center" width="100%">
            <TextBody>Bottom Content</TextBody>
          </Box>
        </VStack>

        <HStack>
          <Box
            alignItems="center"
            background="bgAlternate"
            height={50}
            justifyContent="center"
            width={150}
          >
            <TextBody>Left Content</TextBody>
          </Box>
          <Spacer />
          <Box
            alignItems="center"
            background="bgAlternate"
            height={50}
            justifyContent="center"
            width={150}
          >
            <TextBody>Right Content</TextBody>
          </Box>
        </HStack>
      </Example>
    </ExampleScreen>
  );
};

export default SpacerScreen;
