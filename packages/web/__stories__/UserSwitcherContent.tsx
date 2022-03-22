import React, { memo, useMemo } from 'react';
import { useToggler } from '@cbhq/cds-common/hooks/useToggler';
import { CellSpacing } from '@cbhq/cds-common/types';
import { NoopFn } from '@cbhq/cds-common/utils/mockUtils';

import { Button } from '../buttons/Button';
import { ListCell } from '../cells/ListCell';
import { CollapseArrow } from '../collapsible/CollapseArrow';
import { Collapsible } from '../collapsible/Collapsible';
import { Divider, HStack, VStack } from '../layout';
import { Avatar } from '../media/Avatar';
import { SectionTitle } from '../overlays/PopoverMenu/SectionTitle';
import { insetFocusRing } from '../styles/focus';
import { PressableOpacity } from '../system';
import { TextBody, TextTitle3 } from '../typography';

type UserSwitcherData = {
  name: string;
  email: string;
  selected?: boolean;
  authenticated?: boolean;
  avatarUri?: string;
};

const userSwitcherData: UserSwitcherData[] = [
  {
    name: 'Brian Armstrong',
    email: 'brian.armstrong@coinbase.com',
    selected: true,
    authenticated: true,
    avatarUri:
      'https://avatars.slack-edge.com/2019-12-09/865473396980_e8c83b072b452e4d03f7_192.jpg',
  },
  {
    name: 'Brian Armstrong',
    email: 'barmstrong@bisontrails.com',
    selected: false,
    authenticated: false,
  },
  {
    name: 'Brian Armstrong',
    email: 'bstrong@yahoo.com',
    selected: false,
    authenticated: true,
  },
];

const UserAccountListCell = ({
  name,
  email,
  selected,
  authenticated,
  avatarUri,
}: UserSwitcherData) => {
  const [collapsed, { toggle }] = useToggler(true);

  const userCellOuterSpacingConfig: CellSpacing = useMemo(
    () => ({
      spacingHorizontal: 2,
      spacingVertical: 0,
    }),
    [],
  );

  return (
    <>
      <PressableOpacity
        noScaleOnPress
        className={insetFocusRing}
        onPress={!selected ? toggle : NoopFn}
      >
        <ListCell
          title={name}
          selected={selected}
          description={email}
          action={!selected && <CollapseArrow degrees={90} collapsed={collapsed} />}
          outerSpacing={userCellOuterSpacingConfig}
          intermediary={!authenticated && 'Signed out'}
          priority="middle"
          media={<Avatar src={avatarUri} alt={name} />}
          compact
        />
      </PressableOpacity>
      <Collapsible collapsed={collapsed} dangerouslyDisableOverflowHidden>
        <HStack spacingVertical={0.5} spacingStart={4} gap={0.5}>
          <Button compact transparent variant="negative">
            Remove
          </Button>
          <Button compact transparent>
            Sign in
          </Button>
        </HStack>
      </Collapsible>
    </>
  );
};

type UserSwitcherContentProps = {
  data?: UserSwitcherData[];
};

const userAccountsListMaxHeight = 208;

export const UserSwitcherContent = memo(({ data = userSwitcherData }: UserSwitcherContentProps) => {
  const { name, email, avatarUri } = data.find((user) => user.selected) as UserSwitcherData;
  return (
    <VStack spacingHorizontal={1}>
      <VStack gap={1} alignItems="center" spacingTop={1}>
        <Avatar size="xxxl" selected alt="Brian Armstrong" src={avatarUri} />
        <VStack alignItems="center">
          <TextTitle3 align="center" as="h3">
            {name}
          </TextTitle3>
          <TextBody align="center" as="p">
            {email}
          </TextBody>
        </VStack>
        <Button compact transparent onPress={NoopFn}>
          Manage Settings
        </Button>
      </VStack>
      <SectionTitle text="Your Accounts" />
      <VStack maxHeight={userAccountsListMaxHeight} overflow="scroll" gap={0.5}>
        {data.map((userProps) => (
          <UserAccountListCell {...userProps} />
        ))}
        <HStack>
          <Button startIcon="followInactive" transparent>
            Add Account
          </Button>
        </HStack>
      </VStack>
      <Divider spacingTop={1} spacingBottom={2} />
      <VStack alignItems="center" gap={1}>
        <Button block>Sign out</Button>
        <Button transparent>Sign out of all accounts</Button>
      </VStack>
    </VStack>
  );
});
