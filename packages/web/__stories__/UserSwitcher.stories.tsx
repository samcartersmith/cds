import { memo } from 'react';

import { Dropdown } from '../dropdown';
import { HStack, VStack } from '../layout';
import { Avatar } from '../media/Avatar';
import { PopoverContentPositionConfig } from '../overlays/positionedOverlay/PositionedOverlayProps';
import { FeatureFlagProvider } from '../system';
import { Pressable } from '../system/Pressable';
import { TextHeadline, TextLabel1, TextLabel2 } from '../typography';

import { UserSwitcherContent } from './UserSwitcherContent';

type SwitcherSubjectProps = {
  title: string;
  description?: string;
};

const userSwitcherWidth = 400;

const Subject = ({ title, description }: SwitcherSubjectProps) => {
  return (
    <Pressable noScaleOnPress backgroundColor="transparent" as="button" borderRadius="standard">
      <HStack gap={1} alignItems="center">
        <Avatar size="xl" alt="Test" />
        <VStack maxWidth={172} minWidth={0}>
          {description ? (
            <TextLabel1 overflow="truncate" as="p">
              {title}
            </TextLabel1>
          ) : (
            <TextHeadline overflow="truncate" as="h3">
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

const UserSwitcherRecipe = memo(({ children }) => {
  return (
    <FeatureFlagProvider frontierColor frontierButton>
      <HStack>
        <Dropdown
          width={400}
          maxHeight={600}
          content={<UserSwitcherContent />}
          maxWidth={userSwitcherWidth}
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
