import React, { memo } from 'react';
import { getAvatarFallbackColor } from '@cbhq/cds-common/media/getAvatarFallbackColor';

import { Dropdown } from '../dropdown/Dropdown';
import { HStack } from '../layout';
import { Avatar } from '../media/Avatar';
import { PopoverContentPositionConfig } from '../overlays';
import { Pressable } from '../system/Pressable';

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
    <Pressable noScaleOnPress as="button" background="transparent" borderRadius="rounded">
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
  title: 'Recipes/UserSwitcher',
  component: UserSwitcher,
};
