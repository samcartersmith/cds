import React, { memo, useCallback, useMemo } from 'react';
import { SpacingScale, useSpectrum, useToggler } from '@cbhq/cds-common';
import { getAvatarFallbackColor } from '@cbhq/cds-common/media/getAvatarFallbackColor';
import { NoopFn } from '@cbhq/cds-common/utils/mockUtils';

import { ListCell } from '../cells/ListCell';
import { Switch } from '../controls';
import { Icon, NavigationIcon } from '../icons';
import { Box, Divider, VStack } from '../layout';
import { Avatar } from '../media';
import { palette } from '../tokens';
import { TextHeadline, TextLegal } from '../typography';

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
    name: 'Abby Smith',
    email: 'abby.smith@ventures.com',
    selected: true,
    authenticated: true,
  },
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
  icon?: React.ReactNode;
  action?: React.ReactNode;
  text?: React.ReactNode;
  accessibilityLabel?: string;
};

const ProfileMenuItem = memo(({ name, icon, action, accessibilityLabel }: ProfileMenuItemData) => {
  const outerSpacing = useMemo(() => {
    return {
      offsetVertical: 1 as SpacingScale,
    };
  }, []);
  return (
    <ListCell
      accessibilityLabel={accessibilityLabel}
      action={action}
      media={<Box spacingHorizontal={0.5}>{icon}</Box>}
      onPress={NoopFn}
      outerSpacing={outerSpacing}
      title={name}
    />
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
        icon: <NavigationIcon name="moon" size="m" />,
        action: (
          <Switch
            aria-label={`Dark mode ${darkModeEnabled ? 'on' : 'off'}`}
            checked={darkModeEnabled}
            onChange={handleThemeChange}
          />
        ),
        accessibilityLabel: 'Dark Mode',
      },
      {
        name: 'Sign out',
        text: (
          <TextHeadline as="p" dangerouslySetColor={palette.negative}>
            Sign out
          </TextHeadline>
        ),
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
  const outerSpacing = useMemo(() => {
    return {
      offsetBottom: 1 as SpacingScale,
    };
  }, []);
  return (
    <VStack alignItems="stretch" gap={0} overflow="hidden" spacing={0}>
      <ListCell
        description={<TextLegal as="p">{email}</TextLegal>}
        media={
          <Avatar
            selected
            alt={name}
            colorScheme={avatarColorScheme}
            name={name}
            size="l"
            src={avatarUri}
          />
        }
        onPress={NoopFn}
        outerSpacing={outerSpacing}
        title={name}
      />
      <Divider spacingVertical={1} />
      {profileMenuItemsData.map((menuItem) => (
        <ProfileMenuItem key={menuItem.name} {...menuItem} />
      ))}
    </VStack>
  );
});
