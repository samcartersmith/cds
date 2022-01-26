import React from 'react';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { Box } from '../../layout/Box';
import { HStack } from '../../layout/HStack';
import { VStack } from '../../layout/VStack';
import { ThemeProvider } from '../../system/ThemeProvider';
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
            <LogoMark size={32} />
          </Box>
        </HStack>
      </Example>

      <Example title="LogoWordmark">
        <VStack>
          <Box height={30} spacing={1}>
            <LogoWordmark />
          </Box>
          <ThemeProvider spectrum="light">
            <Box height={30} background spacing={1}>
              <LogoWordmark foreground />
            </Box>
          </ThemeProvider>
          <ThemeProvider spectrum="dark">
            <Box height={30} background spacing={1}>
              <LogoWordmark foreground />
            </Box>
          </ThemeProvider>
        </VStack>
      </Example>
      <Example title="SubBrandLogoMark">
        <VStack>
          <Box spacing={1} height={50}>
            <SubBrandLogoMark type="analytics" />
          </Box>
          <Box spacing={1} height={50}>
            <SubBrandLogoMark type="ventures" />
          </Box>
          <Box spacing={1} height={50}>
            <SubBrandLogoMark type="assetHub" />
          </Box>
          <Box spacing={1} height={50}>
            <SubBrandLogoMark type="commerce" />
          </Box>
          <Box spacing={1} height={50}>
            <SubBrandLogoMark type="wallet" />
          </Box>
        </VStack>
      </Example>

      <Example title="SubBrandLogoWordmark">
        <VStack>
          <Box spacing={1} height={50}>
            <SubBrandLogoWordmark type="analytics" />
          </Box>
          <Box spacing={1} height={50}>
            <SubBrandLogoWordmark type="ventures" />
          </Box>
          <Box spacing={1} height={50}>
            <SubBrandLogoWordmark type="assetHub" />
          </Box>
          <Box spacing={1} height={50}>
            <SubBrandLogoWordmark foreground type="commerce" />
          </Box>
          <Box spacing={1} height={50}>
            <SubBrandLogoWordmark foreground type="wallet" />
          </Box>
        </VStack>
      </Example>
    </ExampleScreen>
  );
};

export default LogoScreen;
