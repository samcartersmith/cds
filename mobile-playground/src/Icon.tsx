import { FiatIcon } from '@cbhq/cds-mobile/icons/FiatIcon';
import { Icon } from '@cbhq/cds-mobile/icons/Icon';
import { IconBase } from '@cbhq/cds-mobile/icons/IconBase';
import { NavigationIcon } from '@cbhq/cds-mobile/icons/NavigationIcon';
import { Box } from '@cbhq/cds-mobile/layout/Box';
import { HStack } from '@cbhq/cds-mobile/layout/HStack';
import { TextHeadline } from '@cbhq/cds-mobile/typography/TextHeadline';
import { ICON_NAMES, NAVIGATIONICON_NAMES } from '@cbhq/cds-common/constants/IconNameEnum';

import Example from './internal/Example';
import ExamplesScreen from './internal/ExamplesScreen';

const IconScreen = () => {
  return (
    <ExamplesScreen>
      <Example>
        <Box spacing={1}>
          <TextHeadline>NavigationIcon (Active)</TextHeadline>
          <HStack flexWrap="wrap">
            {NAVIGATIONICON_NAMES.map(name => (
              <Box spacing={1}>
                <NavigationIcon key={name} active={true} name={name} />
              </Box>
            ))}
          </HStack>
          <TextHeadline>NavigationIcon (InActive)</TextHeadline>
          <HStack flexWrap="wrap">
            {NAVIGATIONICON_NAMES.map(name => (
              <Box spacing={1}>
                <NavigationIcon key={name} active={false} name={name} />
              </Box>
            ))}
          </HStack>
        </Box>
        <Box spacing={1}>
          <TextHeadline>IconBase</TextHeadline>
          <IconBase name="backArrow" size="m" />
        </Box>
        <Box spacing={1}>
          <TextHeadline>FiatIcon</TextHeadline>
          <HStack>
            <FiatIcon currencyCode="USD" />
            <FiatIcon currencyCode="EUR" />
            <FiatIcon currencyCode="GBP" />
            <FiatIcon currencyCode="JPY" />
          </HStack>
        </Box>
        <Box>
          <TextHeadline>Regular Icons</TextHeadline>
          <HStack flexWrap="wrap">
            {ICON_NAMES.map(name => (
              <Icon bordered spacingEnd={1} spacingBottom={1} key={name} size="l" name={name} />
            ))}
          </HStack>
        </Box>
      </Example>
    </ExamplesScreen>
  );
};

export default IconScreen;
