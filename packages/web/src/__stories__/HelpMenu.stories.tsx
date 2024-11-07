import { useRef } from 'react';

import { NavigationIconButton } from '../buttons';
import { Dropdown, DropdownRefProps, MenuItem } from '../dropdown';
import { Icon } from '../icons';
import { Box, HStack, VStack } from '../layout';
import { PopoverContentPositionConfig } from '../overlays';
import { TextHeadline } from '../typography';

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

export const HelpMenu = () => {
  const dropdownRef = useRef<DropdownRefProps>(null);

  return (
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
  );
};

export default {
  title: 'Recipes/HelpMenu',
  component: HelpMenu,
};

HelpMenu.parameters = {
  percy: { enableJavaScript: true },
  a11y: { config: { rules: [{ id: 'color-contrast', enabled: false }] } },
};
