import React, { memo, ReactElement } from 'react';
import { useToggler } from '@cbhq/cds-common/hooks/useToggler';
import { NoopFn } from '@cbhq/cds-common/utils/mockUtils';

import { Button } from '../buttons/Button';
import { Cell } from '../cells/Cell';
import { DotCount } from '../dots/DotCount';
import { HStack, Spacer, VStack } from '../layout';
import { Avatar } from '../media/Avatar';
import { SectionTitle } from '../overlays/PopoverMenu/SectionTitle';
import { Pressable } from '../system/Pressable';
import { TextBody, TextHeadline, TextLabel1, TextLabel2, TextTitle3 } from '../typography';

import { Switcher } from './Switcher';

const Content = memo(() => {
  return (
    <VStack spacingVertical={2} spacingHorizontal={3}>
      <VStack gap={2} alignItems="center">
        <Avatar size="xxxl" selected alt="Brian Armstrong" />
        <VStack alignItems="center">
          <TextTitle3 align="center" as="h3">
            Brian Armstrong
          </TextTitle3>
          <TextBody align="center" as="p">
            brian.armstrong@coinbase.com
          </TextBody>
        </VStack>
      </VStack>
      <Spacer vertical={2} />
      <SectionTitle text="Your Accounts" />
      {/* This has to be a Cell for the truncation expand on hover to work */}
      <Cell onPress={NoopFn}>
        <VStack>
          <TextHeadline as="p">Brian Armstrong</TextHeadline>
          <TextBody as="p" color="foregroundMuted">
            Personal
          </TextBody>
        </VStack>
      </Cell>
      <Cell onPress={NoopFn}>
        <VStack>
          <TextHeadline as="p">Brian Armstrong</TextHeadline>
          <TextBody as="p" color="foregroundMuted">
            Personal
          </TextBody>
        </VStack>
      </Cell>
      <HStack>
        <Button flush="start" startIcon="followInactive" transparent>
          Add Account
        </Button>
      </HStack>
      <Spacer vertical={4} />
      <VStack alignItems="center" gap={1}>
        <Button block>Sign out</Button>
        <Button transparent>Sign out of all accounts</Button>
      </VStack>
    </VStack>
  );
});

type SwitcherSubjectProps = {
  title: string;
  description?: string;
};

const Subject = ({ title, description }: SwitcherSubjectProps) => {
  return (
    <Pressable backgroundColor="transparent" as="button" borderRadius="standard">
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

export type UserSwitcherProps = {
  children?: ReactElement;
} & SwitcherSubjectProps;

export const UserSwitcher = memo(({ title = 'Brian', description }: UserSwitcherProps) => {
  const [visible, { toggleOn: handleClickSubject, toggleOff: handleClose }] = useToggler(false);
  return (
    <HStack>
      <Switcher
        visible={visible}
        onPressSubject={handleClickSubject}
        onClose={handleClose}
        content={<Content />}
      >
        <Subject title={title} description={description} />
      </Switcher>
    </HStack>
  );
});

export const UserSwitcherWithDot = ({
  title = 'Emilie',
  description = 'Personal',
}: UserSwitcherProps) => {
  const [visible, { toggleOn: handleClickSubject, toggleOff: handleClose }] = useToggler(false);
  return (
    <HStack>
      <Switcher
        visible={visible}
        onPressSubject={handleClickSubject}
        onClose={handleClose}
        content={<Content />}
      >
        <DotCount pin="top-end" count={2}>
          <Subject title={title} description={description} />
        </DotCount>
      </Switcher>
    </HStack>
  );
};

export default {
  title: 'Core Components/Switchers/UserSwitcher',
  component: UserSwitcher,
};
