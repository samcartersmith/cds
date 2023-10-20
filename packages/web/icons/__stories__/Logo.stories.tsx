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
          <LogoMark foreground size={16} />
        </Box>
        <Box spacingEnd={2}>
          <LogoMark foreground size={24} />
        </Box>
        <Box spacingEnd={2}>
          <LogoMark foreground size={32} />
        </Box>
      </HStack>
      <VStack>
        <Box height={30} spacing={1}>
          <LogoWordmark />
        </Box>
        <ThemeProvider spectrum="light">
          <Box background height={30} spacing={1}>
            <LogoWordmark foreground />
          </Box>
        </ThemeProvider>
        <ThemeProvider spectrum="dark">
          <Box background height={30} spacing={1}>
            <LogoWordmark foreground />
          </Box>
        </ThemeProvider>
      </VStack>

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
    </VStack>
  );
};
