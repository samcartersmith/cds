import React, { memo } from 'react';
import { getAvatarFallbackColor } from '@cbhq/cds-common/media/getAvatarFallbackColor';
import { HStack } from '@cbhq/cds-web/layout';
import { Avatar } from '@cbhq/cds-web/media/Avatar';
import { FeatureFlagProvider } from '@cbhq/cds-web/system';
import { Pressable } from '@cbhq/cds-web/system/Pressable';

import { Dropdown } from '../dropdown/Dropdown';
import { PopoverContentPositionConfig } from '../popover/PopoverProps';

import { UserSwitcherContent } from './UserSwitcherContent';

type SwitcherSubjectProps = {
  title: string;
  description?: string;
};

const userSwitcherWidth = 416;
const userSwitcherHeight = 674;

const Subject = ({ title }: SwitcherSubjectProps) => {
  const avatarColorScheme = getAvatarFallbackColor(title);
  return (
    <Pressable noScaleOnPress as="button" backgroundColor="transparent" borderRadius="rounded">
      <HStack alignItems="center" gap={1}>
        <Avatar alt={title} colorScheme={avatarColorScheme} name={title} size="xl" />
      </HStack>
    </Pressable>
  );
};

const switcherPositionConfig: PopoverContentPositionConfig = {
  placement: 'bottom',
  gap: 1,
};

const UserSwitcherRecipe = memo(({ children }: { children: React.ReactNode }) => {
  return (
    <FeatureFlagProvider frontierButton frontierColor>
      <HStack>
        <Dropdown
          enableMobileModal
          showOverlay
          content={<UserSwitcherContent />}
          contentPosition={switcherPositionConfig}
          maxHeight={userSwitcherHeight}
          minWidth={0} // this forces truncation, otherwise minWidth default is min-content
          width={userSwitcherWidth}
        >
          {children}
        </Dropdown>
      </HStack>
    </FeatureFlagProvider>
  );
});

export const UserSwitcher = ({ title = 'Brian', description }: SwitcherSubjectProps) => {
  return (
    <UserSwitcherRecipe>
      <Subject description={description} title={title} />
    </UserSwitcherRecipe>
  );
};

export default {
  title: 'Overlays/Switchers/UserSwitcher',
  component: UserSwitcher,
};
