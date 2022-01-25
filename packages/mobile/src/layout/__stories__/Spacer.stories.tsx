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
          height={100}
          width="100%"
          alignItems="center"
          justifyContent="center"
          background="backgroundAlternate"
        >
          <TextBody>Top Content</TextBody>
        </Box>
        <Spacer vertical={3} />
        <Box
          height={100}
          width="100%"
          alignItems="center"
          justifyContent="center"
          background="backgroundAlternate"
        >
          <TextBody>Bottom Content</TextBody>
        </Box>
      </Example>

      <Example title="Horizontal space">
        <HStack>
          <Box
            height={30}
            width={150}
            alignItems="center"
            justifyContent="center"
            background="backgroundAlternate"
          >
            <TextBody>Left Content</TextBody>
          </Box>
          <Spacer horizontal={3} />
          <Box
            height={50}
            width={150}
            alignItems="center"
            justifyContent="center"
            background="backgroundAlternate"
          >
            <TextBody>Right Content</TextBody>
          </Box>
        </HStack>
      </Example>

      <Example title="Fluid space">
        <VStack height={150} background="primaryWash">
          <Box height={50} width="100%" alignItems="center" justifyContent="center" bordered>
            <TextBody>Top Content</TextBody>
          </Box>
          <Spacer />
          <Box height={50} width="100%" alignItems="center" justifyContent="center" bordered>
            <TextBody>Bottom Content</TextBody>
          </Box>
        </VStack>

        <HStack>
          <Box
            height={50}
            width={150}
            alignItems="center"
            justifyContent="center"
            background="backgroundAlternate"
          >
            <TextBody>Left Content</TextBody>
          </Box>
          <Spacer />
          <Box
            height={50}
            width={150}
            alignItems="center"
            justifyContent="center"
            background="backgroundAlternate"
          >
            <TextBody>Right Content</TextBody>
          </Box>
        </HStack>
      </Example>
    </ExampleScreen>
  );
};

export default SpacerScreen;
