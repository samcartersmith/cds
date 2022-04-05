import { memo, useMemo } from 'react';
import { useToggler } from '@cbhq/cds-common/hooks/useToggler';
import { CellPriority, CellSpacing } from '@cbhq/cds-common/types';
import { NoopFn } from '@cbhq/cds-common/utils/mockUtils';

import { Button } from '../buttons/Button';
import { ListCell } from '../cells/ListCell';
import { CollapseArrow } from '../collapsible/CollapseArrow';
import { Collapsible } from '../collapsible/Collapsible';
import { Divider, HStack, VStack } from '../layout';
import { Avatar } from '../media/Avatar';
import { SectionTitle } from '../overlays/PopoverMenu/SectionTitle';
import { insetFocusRing } from '../styles/focus';
import { PressableOpacity } from '../system/PressableOpacity';
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
  {
    name: 'Test Account',
    email: 'brian.armstrong+test@coinbase.com',
    selected: false,
    authenticated: false,
  },
];

const cellPriority: CellPriority[] = ['middle', 'end'];

const UserAccountListCell = ({ name, email, authenticated, avatarUri }: UserSwitcherData) => {
  const [collapsed, { toggle }] = useToggler(true);

  const userCellOuterSpacingConfig: CellSpacing = useMemo(
    () => ({
      spacingHorizontal: 2,
      spacingVertical: 0,
    }),
    [],
  );

  return (
    <VStack background={collapsed ? 'background' : 'backgroundAlternate'} borderRadius="standard">
      <PressableOpacity noScaleOnPress className={insetFocusRing} onPress={toggle}>
        <ListCell
          title={name}
          description={email}
          action={<CollapseArrow degrees={90} collapsed={collapsed} />}
          outerSpacing={userCellOuterSpacingConfig}
          intermediary={!authenticated && 'Signed out'}
          priority={cellPriority}
          media={<Avatar src={avatarUri} alt={name} />}
          compact
        />
      </PressableOpacity>
      <Collapsible collapsed={collapsed} dangerouslyDisableOverflowHidden>
        <HStack spacingTop={0.5} spacingBottom={1} spacingStart={8} gap={0.5}>
          <Button compact>Sign in</Button>
          <Button compact transparent variant="secondary">
            Remove
          </Button>
        </HStack>
      </Collapsible>
    </VStack>
  );
};

type UserSwitcherContentProps = {
  data?: UserSwitcherData[];
};

const userAccountsListMaxHeight = 208;

export const UserSwitcherContent = memo(({ data = userSwitcherData }: UserSwitcherContentProps) => {
  const { name, email, avatarUri } = data.find((user) => user.selected) as UserSwitcherData;
  const otherAccountsData = data.filter((user) => !user.selected);
  return (
    <>
      <VStack gap={1} alignItems="center" spacingTop={1} spacingHorizontal={1}>
        <Avatar size="xxxl" selected alt="Brian Armstrong" src={avatarUri} />
        <VStack alignItems="center">
          <TextTitle3 align="center" as="h3" overflow="wrap">
            {name}
          </TextTitle3>
          <TextBody align="center" as="p" overflow="wrap">
            {email}
          </TextBody>
        </VStack>
        <Button compact transparent onPress={NoopFn}>
          Manage Settings
        </Button>
      </VStack>
      <VStack spacingHorizontal={2}>
        <SectionTitle text="Your other accounts" />
      </VStack>
      <VStack
        maxHeight={userAccountsListMaxHeight}
        spacingBottom={1}
        overflow="auto"
        gap={0.5}
        spacingHorizontal={1}
      >
        {otherAccountsData.map((userProps) => (
          <UserAccountListCell {...userProps} />
        ))}
        <HStack spacingHorizontal={0.5}>
          <Button startIcon="followInactive" transparent>
            Add Account
          </Button>
        </HStack>
      </VStack>
      <Divider spacingBottom={2} />
      <VStack alignItems="center" gap={1} spacingHorizontal={1}>
        <Button variant="secondary" block>
          Sign out
        </Button>
        <Button transparent block>
          Sign out of all accounts
        </Button>
      </VStack>
    </>
  );
});
