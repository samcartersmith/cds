import { useCallback, useEffect, useRef } from 'react';
import { getAvatarFallbackColor } from '@cbhq/cds-common/media/getAvatarFallbackColor';
import { HStack } from '@cbhq/cds-web/layout';
import { Avatar } from '@cbhq/cds-web/media';
import { FeatureFlagProvider, Pressable, ThemeProvider } from '@cbhq/cds-web/system';
import { enableJavascript } from '@cbhq/cds-web/utils/storybookParams/percy';

import { Dropdown, DropdownRefProps } from '../dropdown';
import { PopoverContentPositionConfig } from '../popover';

import { ProfileMenuContent } from './ProfileMenuContent';

const profileMenuWidth = 375;
const profileMenuHeight = 359;

const switcherPositionConfig: PopoverContentPositionConfig = {
  placement: 'bottom-end',
  gap: 1,
};

/** @deprecated @cbhq/cds-web-overlays will be removed in CDS v6.0.0. Please use cds-web instead */
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
    <FeatureFlagProvider frontierButton frontierColor>
      <ThemeProvider>
        {/* below HStack is for demo purpose only */}
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
              backgroundColor="transparent"
              borderRadius="roundedFull"
            >
              <HStack alignItems="center" gap={1}>
                <Avatar alt={title} colorScheme={avatarColorScheme} name={title} size="xl" />
              </HStack>
            </Pressable>
          </Dropdown>
        </HStack>
      </ThemeProvider>
    </FeatureFlagProvider>
  );
};

export default {
  title: 'Deprecated/ProfileMenu',
  component: ProfileMenu,
};

ProfileMenu.parameters = {
  percy: enableJavascript,
  a11y: { config: { rules: [{ id: 'color-contrast', enabled: false }] } },
};
