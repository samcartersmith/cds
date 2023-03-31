import { memo } from 'react';
import { getAvatarFallbackColor } from '@cbhq/cds-common/media/getAvatarFallbackColor';

import { Dropdown } from '../dropdown';
import { HStack, VStack } from '../layout';
import { Avatar } from '../media/Avatar';
import { PopoverContentPositionConfig } from '../overlays/popover/PopoverProps';
import { FeatureFlagProvider } from '../system';
import { Pressable } from '../system/Pressable';
import { TextHeadline, TextLabel1, TextLabel2 } from '../typography';

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
  title: 'Core Components/Switchers/UserSwitcher',
  component: UserSwitcher,
};
