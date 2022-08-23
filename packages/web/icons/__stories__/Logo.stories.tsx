import { Box, HStack, VStack } from '../../layout';
import { ThemeProvider } from '../../system/ThemeProvider';
import { LogoMark } from '../LogoMark';
import { LogoWordmark } from '../LogoWordmark';
import { SubBrandLogoMark } from '../SubBrandLogoMark';
import { SubBrandLogoWordmark } from '../SubBrandLogoWordmark';

export default {
  title: 'Core Components/Logo Sheet',
  component: LogoMark,
};

export const LogoSheet = () => {
  return (
    <VStack gap={3}>
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
          <LogoMark size={16} foreground />
        </Box>
        <Box spacingEnd={2}>
          <LogoMark size={24} foreground />
        </Box>
        <Box spacingEnd={2}>
          <LogoMark size={32} foreground />
        </Box>
      </HStack>
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
    </VStack>
  );
};
