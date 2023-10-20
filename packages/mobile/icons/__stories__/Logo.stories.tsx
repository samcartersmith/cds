import React from 'react';
import { SpectrumProvider } from '@cbhq/cds-common/spectrum/SpectrumProvider';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { Box } from '../../layout/Box';
import { HStack } from '../../layout/HStack';
import { VStack } from '../../layout/VStack';
import { LogoMark } from '../LogoMark';
import { LogoWordmark } from '../LogoWordmark';
import { SubBrandLogoMark } from '../SubBrandLogoMark';
import { SubBrandLogoWordmark } from '../SubBrandLogoWordmark';

const LogoScreen = () => {
  return (
    <ExampleScreen>
      <Example title="LogoMark">
        <HStack>
          <Box spacingEnd={2}>
            <LogoMark size={16} />
          </Box>
          <Box spacingEnd={2}>
            <LogoMark size={24} />
          </Box>
          <Box spacingEnd={2}>
            <LogoMark size={32} />
          </Box>
        </HStack>
        <HStack>
          <Box spacingEnd={2}>
            <LogoMark foreground size={16} />
          </Box>
          <Box spacingEnd={2}>
            <LogoMark foreground size={24} />
          </Box>
          <Box spacingEnd={2}>
            <LogoMark foreground size={32} />
          </Box>
        </HStack>
      </Example>

      <Example title="LogoWordmark">
        <VStack>
          <Box height={30} spacing={1}>
            <LogoWordmark />
          </Box>
          <SpectrumProvider value="light">
            <Box background height={30} spacing={1}>
              <LogoWordmark foreground />
            </Box>
          </SpectrumProvider>
          <SpectrumProvider value="dark">
            <Box background height={30} spacing={1}>
              <LogoWordmark foreground />
            </Box>
          </SpectrumProvider>
        </VStack>
      </Example>
      <Example title="SubBrandLogoMark">
        <VStack>
          <Box height={50} spacing={1}>
            <SubBrandLogoMark type="analytics" />
          </Box>
          <Box height={50} spacing={1}>
            <SubBrandLogoMark type="ventures" />
          </Box>
          <Box height={50} spacing={1}>
            <SubBrandLogoMark type="assetHub" />
          </Box>
          <Box height={50} spacing={1}>
            <SubBrandLogoMark type="commerce" />
          </Box>
          <Box height={50} spacing={1}>
            <SubBrandLogoMark type="wallet" />
          </Box>
        </VStack>
      </Example>

      <Example title="SubBrandLogoWordmark">
        <VStack>
          <Box height={50} spacing={1}>
            <SubBrandLogoWordmark type="analytics" />
          </Box>
          <Box height={50} spacing={1}>
            <SubBrandLogoWordmark type="ventures" />
          </Box>
          <Box height={50} spacing={1}>
            <SubBrandLogoWordmark type="assetHub" />
          </Box>
          <Box height={50} spacing={1}>
            <SubBrandLogoWordmark foreground type="commerce" />
          </Box>
          <Box height={50} spacing={1}>
            <SubBrandLogoWordmark foreground type="wallet" />
          </Box>
        </VStack>
      </Example>
    </ExampleScreen>
  );
};

export default LogoScreen;
