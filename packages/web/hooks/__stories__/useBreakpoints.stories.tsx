import { ResponsiveProps } from '@cbhq/cds-common/types/ResponsiveProps';

import { HStack } from '../../layout/HStack';
import { VStack } from '../../layout/VStack';
import { BreakpointsProvider } from '../../system/BreakpointsProvider';
import { TextHeadline } from '../../typography';
import { enableJavascript } from '../../utils/storybookParams/percy';
import { useBreakpoints } from '../useBreakpoints';

const deviceMap: Record<string, string> = {
  isPhone: 'a phone',
  isPhoneLandscape: 'a phone in landscape',
  isTablet: 'a tablet',
  isTabletLandscape: 'a tablet in landscape',
  isDesktop: 'a desktop',
  isDesktopLarge: 'a large desktop',
  isExtraWide: 'an extra wide desktop',
};

const Example = (props: PlaygroundProps) => {
  const result = useBreakpoints();
  const deviceArr: string[] = [];

  const deviceName = () => {
    for (const device in result) {
      if (result[device]) {
        deviceArr.push(deviceMap[device]);
      }
    }
    if (deviceArr.length === 1) {
      return deviceArr[0];
    }
    if (deviceArr.length) {
      return deviceArr.join(' and ');
    }
    return 'no device breakpoints';
  };

  return (
    <HStack
      background="backgroundAlternate"
      spacing={3}
      borderColor="line"
      borderRadius="standard"
      {...props}
    >
      <TextHeadline as="h3">I am as wide as {deviceName()}</TextHeadline>
    </HStack>
  );
};

type PlaygroundProps = {
  responsiveConfig?: ResponsiveProps;
};

export const Playground = (props: PlaygroundProps) => <Example {...props} />;
Playground.parameters = { percy: enableJavascript };

export const DefaultToDevice = () => {
  return (
    <VStack gap={2}>
      <BreakpointsProvider device="phone">
        <Example />
      </BreakpointsProvider>
    </VStack>
  );
};
DefaultToDevice.parameters = { percy: enableJavascript };

export default {
  title: 'Hooks/useBreakpoints',
  component: Example,
};
