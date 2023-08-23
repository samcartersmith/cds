import React, { memo } from 'react';
import { getAvatarFallbackColor } from '@cbhq/cds-common/media/getAvatarFallbackColor';
import { HStack, VStack } from '@cbhq/cds-web/layout';
import { Avatar } from '@cbhq/cds-web/media/Avatar';
import { FeatureFlagProvider } from '@cbhq/cds-web/system';
import { Pressable } from '@cbhq/cds-web/system/Pressable';
import { TextHeadline, TextLabel1, TextLabel2 } from '@cbhq/cds-web/typography';

import { Dropdown } from '../dropdown/Dropdown';
import { PopoverContentPositionConfig } from '../popover/PopoverProps';

import { UserSwitcherContent } from './UserSwitcherContent';

type SwitcherSubjectProps = {
  title: string;
  description?: string;
};

const userSwitcherWidth = 416;
const userSwitcherHeight = 674;

const Subject = ({ title, description }: SwitcherSubjectProps) => {
  const avatarColorScheme = getAvatarFallbackColor(title);
  return (
    <Pressable noScaleOnPress backgroundColor="transparent" as="button" borderRadius="rounded">
      <HStack gap={1} alignItems="center">
        <Avatar size="xl" alt={title} name={title} colorScheme={avatarColorScheme} />
        <VStack maxWidth={172} minWidth={0}>
          {description ? (
            <TextLabel1 overflow="truncate" as="p">
              {title}
            </TextLabel1>
          ) : (
            <TextHeadline overflow="truncate" as="span">
              {title}
            </TextHeadline>
          )}
          {description ? (
            <TextLabel2 overflow="truncate" as="p">
              {description}
            </TextLabel2>
          ) : null}
        </VStack>
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
    <FeatureFlagProvider frontierColor frontierButton>
      <HStack>
        <Dropdown
          width={userSwitcherWidth}
          maxHeight={userSwitcherHeight}
          // this forces truncation, otherwise minWidth default is min-content
          minWidth={0}
          content={<UserSwitcherContent />}
          showOverlay
          contentPosition={switcherPositionConfig}
          enableMobileModal
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
      <Subject title={title} description={description} />
    </UserSwitcherRecipe>
  );
};

export default {
  title: 'Overlays/Switchers/UserSwitcher',
  component: UserSwitcher,
};
