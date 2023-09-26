import { memo, useEffect, useRef } from 'react';
import { getAvatarFallbackColor } from '@cbhq/cds-common/media/getAvatarFallbackColor';
import { HStack } from '@cbhq/cds-web/layout';
import { Avatar } from '@cbhq/cds-web/media';
import { FeatureFlagProvider, PatternTag, Pressable, ThemeProvider } from '@cbhq/cds-web/system';

import { Dropdown, DropdownRefProps } from '../dropdown';
import { PopoverContentPositionConfig } from '../popover';

import { ProfileMenuContent } from './ProfileMenuContent';

const profileMenuWidth = 375;
const profileMenuHeight = 359;

type SwitcherSubjectProps = {
  title: string;
  description?: string;
};

const Subject = ({ title }: SwitcherSubjectProps) => {
  const avatarColorScheme = getAvatarFallbackColor(title);
  return (
    <Pressable noScaleOnPress backgroundColor="transparent" as="button" borderRadius="rounded">
      <HStack gap={1} alignItems="center">
        <Avatar size="xl" alt={title} name={title} colorScheme={avatarColorScheme} />
      </HStack>
    </Pressable>
  );
};

const switcherPositionConfig: PopoverContentPositionConfig = {
  placement: 'bottom',
  gap: 1,
};

const ProfileMenuRecipe = memo(({ children }: { children: React.ReactNode }) => {
  const dropdownRef = useRef<DropdownRefProps>(null);
  // open dropdown on mount for demo purpose only
  useEffect(() => {
    dropdownRef.current?.openMenu();
  }, []);
  return (
    <PatternTag profileMenu>
      <FeatureFlagProvider frontierColor frontierButton>
        <ThemeProvider>
          {/* below HStack is for demo purpose only */}
          <HStack>
            <Dropdown
              ref={dropdownRef}
              width={profileMenuWidth}
              maxHeight={profileMenuHeight}
              // this forces truncation, otherwise minWidth default is min-content
              minWidth={0}
              content={<ProfileMenuContent />}
              showOverlay
              contentPosition={switcherPositionConfig}
              enableMobileModal
            >
              {children}
            </Dropdown>
          </HStack>
        </ThemeProvider>
      </FeatureFlagProvider>
    </PatternTag>
  );
});

export const ProfileMenu = memo(({ title = 'Brian', description }: SwitcherSubjectProps) => {
  return (
    <ProfileMenuRecipe>
      <Subject title={title} description={description} />
    </ProfileMenuRecipe>
  );
});

export default {
  title: 'Overlays/Recipes/ProfileMenu',
  component: ProfileMenu,
};
