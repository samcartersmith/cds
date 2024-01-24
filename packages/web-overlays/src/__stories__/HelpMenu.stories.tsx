import { useRef } from 'react';
import { NavigationIconButton } from '@cbhq/cds-web/buttons';
import { Icon } from '@cbhq/cds-web/icons';
import { Box, HStack, VStack } from '@cbhq/cds-web/layout';
import { FeatureFlagProvider, ThemeProvider } from '@cbhq/cds-web/system';
import { TextHeadline } from '@cbhq/cds-web/typography';
import { enableJavascript } from '@cbhq/cds-web/utils/storybookParams/percy';

import { Dropdown, DropdownRefProps, MenuItem } from '../dropdown';
import { PopoverContentPositionConfig } from '../popover';

const switcherPositionConfig: PopoverContentPositionConfig = {
  placement: 'bottom-end',
  gap: 1,
};

const helpMenuItems = [
  {
    id: 'coinbase-assistant',
    label: 'Coinbase Assistant',
    media: <Icon color="secondaryForeground" name="support" size="s" />,
    onPress: console.log,
  },
  {
    id: 'faqs',
    label: 'FAQs',
    media: <Icon color="secondaryForeground" name="smartContract" size="s" />,
    onPress: console.log,
  },
];

const HelpMenuContent = () => {
  return (
    <VStack gap={1} spacingVertical={2}>
      {helpMenuItems.map(({ media, label, id, onPress }) => (
        <MenuItem onPress={onPress} value={id}>
          <HStack
            alignItems="center"
            flexGrow={1}
            gap={2}
            spacingHorizontal={1}
            spacingVertical={1}
          >
            <Box spacingEnd={0.5} spacingStart={0.5}>
              {media}
            </Box>
            <HStack alignItems="center" flexGrow={1}>
              <TextHeadline as="p">{label}</TextHeadline>
            </HStack>
          </HStack>
        </MenuItem>
      ))}
    </VStack>
  );
};

/** @deprecated @cbhq/cds-web-overlays will be removed in CDS v6.0.0. Please use cds-web instead */
export const HelpMenu = () => {
  const dropdownRef = useRef<DropdownRefProps>(null);

  return (
    <FeatureFlagProvider frontierButton frontierColor>
      <ThemeProvider>
        {/* below HStack is for demo purpose only */}
        <HStack>
          <Dropdown
            ref={dropdownRef}
            enableMobileModal
            content={<HelpMenuContent />}
            contentPosition={switcherPositionConfig}
            minWidth={0} // this forces truncation, otherwise minWidth default is min-content
            width={300}
          >
            <HStack alignItems="center" gap={1}>
              <NavigationIconButton
                aria-label="Help"
                name="helpCenterQuestionMark"
                variant="secondary"
              />
            </HStack>
          </Dropdown>
        </HStack>
      </ThemeProvider>
    </FeatureFlagProvider>
  );
};

export default {
  title: 'Deprecated/HelpMenu',
  component: HelpMenu,
};

HelpMenu.parameters = {
  percy: enableJavascript,
  a11y: { config: { rules: [{ id: 'color-contrast', enabled: false }] } },
};
