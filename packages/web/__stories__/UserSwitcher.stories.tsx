import React, { memo } from 'react';
import { useToggler } from '@cbhq/cds-common/hooks/useToggler';

import { HStack, VStack } from '../layout';
import { Avatar } from '../media/Avatar';
import { Switcher } from '../navigation/Switcher';
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

const UserSwitcherRecipe = memo(({ children }) => {
  const [visible, { toggleOn: handleClickSubject, toggleOff: handleClose }] = useToggler(false);
  return (
    <FeatureFlagProvider frontierColor frontierButton>
      <HStack>
        <Switcher
          visible={visible}
          onPressSubject={handleClickSubject}
          onClose={handleClose}
          content={<UserSwitcherContent />}
          maxWidth={userSwitcherWidth}
        >
          {children}
        </Switcher>
      </HStack>
    </FeatureFlagProvider>
  );
});

export const UserSwitcher = memo(({ title = 'Brian', description }: SwitcherSubjectProps) => {
  return (
    <UserSwitcherRecipe>
      <Subject title={title} description={description} />
    </UserSwitcherRecipe>
  );
});

export default {
  title: 'Core Components/Switchers/UserSwitcher',
  component: UserSwitcher,
};
