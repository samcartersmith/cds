import { memo, useCallback, useMemo } from 'react';
import { useSpectrum, useToggler } from '@cbhq/cds-common';
import { getAvatarFallbackColor } from '@cbhq/cds-common/media/getAvatarFallbackColor';
import { Switch } from '@cbhq/cds-web/controls';
import { Icon, NavigationIcon } from '@cbhq/cds-web/icons';
import { Box, Divider, HStack, VStack } from '@cbhq/cds-web/layout';
import { Avatar } from '@cbhq/cds-web/media';
import { palette } from '@cbhq/cds-web/tokens';
import { TextHeadline, TextLegal } from '@cbhq/cds-web/typography';

import { MenuItem } from '../dropdown';

type ProfileMenuData = {
  name: string;
  email: string;
  selected?: boolean;
  authenticated?: boolean;
  avatarUri?: string;
};

type ProfileMenuContentProps = {
  data?: ProfileMenuData[];
};

const profileMenuData: ProfileMenuData[] = [
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

type ProfileMenuItemData = {
  name: string;
  label?: React.ReactNode;
  icon?: React.ReactNode;
  action?: React.ReactNode;
};

const ProfileMenuItem = memo(({ name, label, icon, action }: ProfileMenuItemData) => {
  return (
    <MenuItem value={name}>
      <HStack alignItems="center" flexGrow={1} gap={2} spacingHorizontal={1} spacingVertical={2}>
        <Box spacingEnd={0.5} spacingStart={0.5}>
          {icon}
        </Box>
        <HStack alignItems="center" flexGrow={1} justifyContent="space-between">
          {label || <TextHeadline as="p">{name}</TextHeadline>}
          {action}
        </HStack>
      </HStack>
    </MenuItem>
  );
});

export const ProfileMenuContent = memo(({ data = profileMenuData }: ProfileMenuContentProps) => {
  const { name, email, avatarUri } = data.find((user) => user.selected) as ProfileMenuData;
  const avatarColorScheme = getAvatarFallbackColor(name);
  const theme = useSpectrum();
  const [darkModeEnabled, { toggle: toggleDarkMode }] = useToggler(theme === 'dark');
  const handleThemeChange = useCallback(() => {
    toggleDarkMode();
  }, [toggleDarkMode]);
  const profileMenuItemsData = useMemo(() => {
    return [
      {
        name: 'Account preferences',
        icon: <NavigationIcon name="account" size="m" />,
      },
      {
        name: 'App settings',
        icon: <NavigationIcon name="sun" size="m" />,
      },
      {
        name: 'Dark Mode',
        text: (
          <TextHeadline as="p" dangerouslySetColor={palette.negative}>
            Sign out
          </TextHeadline>
        ),
        icon: <NavigationIcon name="moon" size="m" />,
        action: <Switch checked={darkModeEnabled} onChange={handleThemeChange} />,
      },
      {
        name: 'Sign out',
        icon: (
          <Icon
            dangerouslySetColor={palette.negative}
            name="backArrow"
            size="s"
            spacingHorizontal={0.5}
          />
        ),
      },
    ];
  }, [darkModeEnabled, handleThemeChange]);
  return (
    <VStack alignItems="stretch" gap={0} overflow="hidden" spacing={1}>
      <HStack alignItems="center" flexGrow={1} gap={2} spacing={2}>
        <Avatar
          selected
          alt={name}
          colorScheme={avatarColorScheme}
          name={name}
          size="l"
          src={avatarUri}
        />
        <VStack>
          <TextHeadline as="p">{name}</TextHeadline>
          <TextLegal as="p">{email}</TextLegal>
        </VStack>
      </HStack>
      <Divider spacingVertical={1} />
      {profileMenuItemsData.map((menuItem) => (
        <ProfileMenuItem key={menuItem.name} {...menuItem} />
      ))}
    </VStack>
  );
});
