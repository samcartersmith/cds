import React from 'react';

import {
  LogoMark,
  LogoWordmark,
  SubBrandLogoMark,
  SubBrandLogoWordmark,
} from '@cbhq/cds-mobile/icons';
import { Box, HStack, VStack } from '@cbhq/cds-mobile/layout';
import { ThemeProvider } from '@cbhq/cds-mobile/system';
import Example from './internal/Example';
import ExamplesScreen from './internal/ExamplesScreen';

const LogoScreen = () => {
  return (
    <ExamplesScreen>
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
    </ExamplesScreen>
  );
};

export default LogoScreen;
