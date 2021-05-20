import { FiatIcon } from '@cbhq/cds-mobile/icons/FiatIcon';
import { Icon } from '@cbhq/cds-mobile/icons/Icon';
import { IconBase } from '@cbhq/cds-mobile/icons/IconBase';
import { NavigationIcon } from '@cbhq/cds-mobile/icons/NavigationIcon';
import { TextIcon } from '@cbhq/cds-mobile/icons/TextIcon';
import { Box } from '@cbhq/cds-mobile/layout/Box';
import { HStack } from '@cbhq/cds-mobile/layout/HStack';
import { TextBody, TextHeadline } from '@cbhq/cds-mobile/typography';

import Example from './internal/Example';
import ExamplesScreen from './internal/ExamplesScreen';
import { iconName, navigationIconName } from './data/iconData';

const IconScreen = () => {
  return (
    <ExamplesScreen>
      <Example>
        <Box spacing={1}>
          <TextHeadline>NavigationIcon (Active)</TextHeadline>
          <HStack flexWrap="wrap">
            {navigationIconName.map(name => (
              <Box spacing={1} key={name}>
                <NavigationIcon active={true} name={name} />
              </Box>
            ))}
          </HStack>
          <TextHeadline>NavigationIcon (InActive)</TextHeadline>
          <HStack flexWrap="wrap">
            {navigationIconName.map(name => (
              <Box spacing={1} key={name}>
                <NavigationIcon active={false} name={name} />
              </Box>
            ))}
          </HStack>
        </Box>
        <Box spacing={1}>
          <TextHeadline>Nested Icon</TextHeadline>
          <TextBody align="end">
            <TextIcon name="dot" size="xs" />
            <TextBody>This is some text</TextBody>
          </TextBody>
          <TextBody align="end">
            <TextIcon name="dot" size="xs" />
            <TextBody>
              This is soooooooooooooome reallllllllllllllllly loooooooonnngggggg text
            </TextBody>
          </TextBody>
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
            {iconName.map(name => (
              <Icon bordered spacingEnd={1} spacingBottom={1} key={name} size="l" name={name} />
            ))}
          </HStack>
        </Box>
      </Example>
    </ExamplesScreen>
  );
};

export default IconScreen;
