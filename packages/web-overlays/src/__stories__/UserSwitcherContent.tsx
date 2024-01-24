import React, { memo, useMemo } from 'react';
import { useToggler } from '@cbhq/cds-common/hooks/useToggler';
import { getAvatarFallbackColor } from '@cbhq/cds-common/media/getAvatarFallbackColor';
import { useScaleConditional } from '@cbhq/cds-common/scale/useScaleConditional';
import { listHeight } from '@cbhq/cds-common/tokens/cell';
import { CellPriority, CellSpacing } from '@cbhq/cds-common/types';
import { NoopFn } from '@cbhq/cds-common/utils/mockUtils';
import { Button } from '@cbhq/cds-web/buttons/Button';
import { ListCell } from '@cbhq/cds-web/cells/ListCell';
import { Collapsible } from '@cbhq/cds-web/collapsible/Collapsible';
import { useSpacingValue } from '@cbhq/cds-web/hooks/useSpacingValue';
import { Divider, HStack, VStack } from '@cbhq/cds-web/layout';
import { Avatar } from '@cbhq/cds-web/media/Avatar';
import { AnimatedCaret } from '@cbhq/cds-web/motion/AnimatedCaret';
import { insetFocusRing } from '@cbhq/cds-web/styles/focus';
import { PressableOpacity } from '@cbhq/cds-web/system/PressableOpacity';
import { TextBody, TextCaption, TextLegal, TextTitle3 } from '@cbhq/cds-web/typography';

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

  const userCellOuterPaddingConfig: CellSpacing = useMemo(
    () => ({
      spacingHorizontal: 2,
      spacingVertical: 0,
    }),
    [],
  );

  // this will generate a unique hash from the name and associate it with a fallback color
  const avatarColorScheme = getAvatarFallbackColor(name);

  return (
    <VStack background={collapsed ? 'background' : 'backgroundAlternate'} borderRadius="rounded">
      <PressableOpacity noScaleOnPress className={insetFocusRing} onPress={toggle}>
        <ListCell
          compact
          action={<AnimatedCaret rotate={collapsed ? 90 : 180} />}
          description={email}
          intermediary={!authenticated && <TextLegal as="span">Signed out</TextLegal>}
          media={
            <Avatar
              alt={name}
              colorScheme={avatarColorScheme} // business accounts should use the gray colorScheme, all else should leverage getAvatarFallbackColor
              name={name}
              src={avatarUri}
            />
          }
          outerPadding={userCellOuterPaddingConfig}
          priority={cellPriority}
          title={name}
        />
      </PressableOpacity>
      <Collapsible collapsed={collapsed}>
        <HStack gap={0.5} spacingBottom={1} spacingStart={8} spacingTop={0.5}>
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

/** @deprecated @cbhq/cds-web-overlays will be removed in CDS v6.0.0. Please use cds-web instead */
export const UserSwitcherContent = memo(({ data = userSwitcherData }: UserSwitcherContentProps) => {
  const { name, email, avatarUri } = data.find((user) => user.selected) as UserSwitcherData;
  const otherAccountsData = data.filter((user) => !user.selected);
  const gutter = useSpacingValue(1);
  const listCellHeight = useScaleConditional(listHeight);
  const userAccountsListMinHeight = listCellHeight * 2 + gutter;
  const userAccountsListMaxHeight = listCellHeight * 2.5 + gutter;
  return (
    <VStack spacingVertical={2}>
      <VStack alignItems="center" gap={1} spacingHorizontal={1} spacingTop={1}>
        {/* the selected user's avatar should always use the blue colorScheme */}
        <Avatar
          selected
          alt="Brian Armstrong"
          colorScheme="blue"
          name={name}
          size="xxxl"
          src={avatarUri}
        />
        <VStack alignItems="center">
          <TextTitle3 align="center" as="h3" overflow="break">
            {name}
          </TextTitle3>
          <TextBody align="center" as="p" overflow="break">
            {email}
          </TextBody>
        </VStack>
        <Button compact transparent onPress={NoopFn}>
          Manage Settings
        </Button>
      </VStack>
      <Divider spacingTop={3} />
      <VStack spacingHorizontal={2}>
        <HStack spacingHorizontal={2} spacingVertical={2}>
          <TextCaption as="h2" color="foregroundMuted">
            Your other accounts
          </TextCaption>
        </HStack>
      </VStack>
      <VStack
        gap={0.5}
        maxHeight={userAccountsListMaxHeight}
        minHeight={userAccountsListMinHeight}
        overflow="auto"
        spacingBottom={1}
        spacingHorizontal={1}
      >
        {otherAccountsData.map((userProps) => (
          <UserAccountListCell key={userProps.email} {...userProps} />
        ))}
        <HStack spacingHorizontal={0.5}>
          <Button transparent startIcon="followInactive">
            Add Account
          </Button>
        </HStack>
      </VStack>
      <Divider spacingBottom={2} />
      <VStack alignItems="center" gap={1} spacingHorizontal={1}>
        <Button block variant="secondary">
          Sign out
        </Button>
        <Button block transparent>
          Sign out of all accounts
        </Button>
      </VStack>
    </VStack>
  );
});
