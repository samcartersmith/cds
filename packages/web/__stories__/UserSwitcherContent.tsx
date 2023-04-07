import { memo, useMemo } from 'react';
import { useToggler } from '@cbhq/cds-common/hooks/useToggler';
import { getAvatarFallbackColor } from '@cbhq/cds-common/media/getAvatarFallbackColor';
import { useScaleConditional } from '@cbhq/cds-common/scale/useScaleConditional';
import { listHeight } from '@cbhq/cds-common/tokens/cell';
import { CellPriority, CellSpacing } from '@cbhq/cds-common/types';
import { NoopFn } from '@cbhq/cds-common/utils/mockUtils';

import { Button } from '../buttons/Button';
import { ListCell } from '../cells/ListCell';
import { Collapsible } from '../collapsible/Collapsible';
import { useSpacingValue } from '../hooks/useSpacingValue';
import { Divider, HStack, VStack } from '../layout';
import { Avatar } from '../media/Avatar';
import { AnimatedCaret } from '../motion/AnimatedCaret';
import { insetFocusRing } from '../styles/focus';
import { PressableOpacity } from '../system/PressableOpacity';
import { TextBody, TextCaption, TextLegal, TextTitle3 } from '../typography';

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

  const userCellOuterSpacingConfig: CellSpacing = useMemo(
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
          title={name}
          description={email}
          action={<AnimatedCaret rotate={collapsed ? 90 : 180} />}
          outerSpacing={userCellOuterSpacingConfig}
          intermediary={!authenticated && <TextLegal as="span">Signed out</TextLegal>}
          priority={cellPriority}
          media={
            <Avatar
              src={avatarUri}
              alt={name}
              name={name}
              // business accounts should use the gray colorScheme, all else should leverage getAvatarFallbackColor
              colorScheme={avatarColorScheme}
            />
          }
          compact
        />
      </PressableOpacity>
      <Collapsible collapsed={collapsed}>
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

/**
 * @deprecated this component will be removed from cds-web Q22023. It has been moved to cds-web-overlays.
 */
export const UserSwitcherContent = memo(({ data = userSwitcherData }: UserSwitcherContentProps) => {
  const { name, email, avatarUri } = data.find((user) => user.selected) as UserSwitcherData;
  const otherAccountsData = data.filter((user) => !user.selected);
  const gutter = useSpacingValue(1);
  const listCellHeight = useScaleConditional(listHeight);
  const userAccountsListMinHeight = listCellHeight * 2 + gutter;
  const userAccountsListMaxHeight = listCellHeight * 2.5 + gutter;
  return (
    <VStack spacingVertical={2}>
      <VStack gap={1} alignItems="center" spacingTop={1} spacingHorizontal={1}>
        {/* the selected user's avatar should always use the blue colorScheme */}
        <Avatar
          size="xxxl"
          selected
          alt="Brian Armstrong"
          src={avatarUri}
          name={name}
          colorScheme="blue"
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
        minHeight={userAccountsListMinHeight}
        maxHeight={userAccountsListMaxHeight}
        spacingBottom={1}
        overflow="auto"
        gap={0.5}
        spacingHorizontal={1}
      >
        {otherAccountsData.map((userProps) => (
          <UserAccountListCell key={userProps.email} {...userProps} />
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
    </VStack>
  );
});
