import { useCallback, useEffect, useRef } from 'react';
import { getAvatarFallbackColor } from '@cbhq/cds-common/media/getAvatarFallbackColor';

import { Dropdown, DropdownRefProps } from '../dropdown';
import { HStack } from '../layout';
import { Avatar } from '../media';
import { PopoverContentPositionConfig } from '../overlays';
import { Pressable } from '../system';

import { ProfileMenuContent } from './ProfileMenuContent';

const profileMenuWidth = 375;
const profileMenuHeight = 359;

const switcherPositionConfig: PopoverContentPositionConfig = {
  placement: 'bottom-end',
  gap: 1,
};

export const ProfileMenu = ({
  title = 'Brian',
  isOpen = true,
}: {
  title: string;
  isOpen?: boolean;
}) => {
  const avatarColorScheme = getAvatarFallbackColor(title);
  const dropdownRef = useRef<DropdownRefProps>(null);
  const pressableRef = useRef<HTMLButtonElement>(null);
  // open dropdown on mount for demo purpose only
  useEffect(() => {
    if (!isOpen) return;
    dropdownRef.current?.openMenu();
  }, [isOpen]);
  const onCloseMenu = useCallback(() => {
    pressableRef?.current?.focus();
  }, []);
  return (
    <HStack>
      <Dropdown
        ref={dropdownRef}
        enableMobileModal
        showOverlay
        content={<ProfileMenuContent />}
        contentPosition={switcherPositionConfig}
        maxHeight={profileMenuHeight}
        minWidth={0} // this forces truncation, otherwise minWidth default is min-content
        onCloseMenu={onCloseMenu}
        width={profileMenuWidth}
      >
        <Pressable
          ref={pressableRef}
          noScaleOnPress
          accessibilityLabel="profile menu"
          as="button"
          background="transparent"
          borderRadius="roundedFull"
        >
          <HStack alignItems="center" gap={1}>
            <Avatar alt={title} colorScheme={avatarColorScheme} name={title} size="xl" />
          </HStack>
        </Pressable>
      </Dropdown>
    </HStack>
  );
};

export default {
  title: 'Recipes/ProfileMenu',
  component: ProfileMenu,
};

ProfileMenu.parameters = {
  percy: { enableJavaScript: true },
  a11y: { config: { rules: [{ id: 'color-contrast', enabled: false }] } },
};
