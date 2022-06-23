import { HStack } from '../../layout/HStack';
import { TextHeadline } from '../../typography';
import { useBreakpoints } from '../useBreakpoints';

const deviceMap: Record<string, string> = {
  isPhone: 'a phone',
  isPhoneLarge: 'a large phone',
  isTablet: 'a tablet',
  isTabletLandscape: 'a tablet in landscape',
  isDesktop: 'a desktop',
  isDesktopLarge: 'a large desktop',
  isExtraWide: 'an extra wide desktop',
};

const Example = () => {
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
    <HStack background="backgroundAlternate" spacing={3} borderColor="line" borderRadius="standard">
      <TextHeadline as="h3">I am as wide as {deviceName()}</TextHeadline>
    </HStack>
  );
};

export const Playground = () => <Example />;

export default {
  title: 'Hooks/useBreakpoints',
  component: Example,
};
