import { memo } from 'react';
import { getAvatarFallbackColor } from '@cbhq/cds-common/media/getAvatarFallbackColor';

import { Dropdown } from '../dropdown';
import { HStack, VStack } from '../layout';
import { Avatar } from '../media/Avatar';
import { PopoverContentPositionConfig } from '../overlays/popover/PopoverProps';
import { FeatureFlagProvider } from '../system';
import { Pressable } from '../system/Pressable';
import { TextHeadline, TextLabel1, TextLabel2 } from '../typography';

import { UserSwitcherContent } from './UserSwitcherContent';

type SwitcherSubjectProps = {
  title: string;
  description?: string;
};

const userSwitcherWidth = 416;
const userSwitcherHeight = 674;

const Subject = ({ title, description }: SwitcherSubjectProps) => {
  const avatarColorScheme = getAvatarFallbackColor(title);
  return (
    <Pressable noScaleOnPress as="button" backgroundColor="transparent" borderRadius="rounded">
      <HStack alignItems="center" gap={1}>
        <Avatar alt={title} colorScheme={avatarColorScheme} name={title} size="xl" />
        <VStack maxWidth={172} minWidth={0}>
          {description ? (
            <TextLabel1 as="p" overflow="truncate">
              {title}
            </TextLabel1>
          ) : (
            <TextHeadline as="span" overflow="truncate">
              {title}
            </TextHeadline>
          )}
          {description ? (
            <TextLabel2 as="p" overflow="truncate">
              {description}
            </TextLabel2>
          ) : null}
        </VStack>
      </HStack>
    </Pressable>
  );
};

const switcherPositionConfig: PopoverContentPositionConfig = {
  placement: 'bottom',
  gap: 1,
};

const UserSwitcherRecipe = memo(({ children }: { children: React.ReactNode }) => {
  return (
    <FeatureFlagProvider frontierButton frontierColor>
      <HStack>
        <Dropdown
          enableMobileModal
          showOverlay
          content={<UserSwitcherContent />}
          contentPosition={switcherPositionConfig}
          maxHeight={userSwitcherHeight}
          minWidth={0} // this forces truncation, otherwise minWidth default is min-content
          width={userSwitcherWidth}
        >
          {children}
        </Dropdown>
      </HStack>
    </FeatureFlagProvider>
  );
});

/**
 * @deprecated this component will be removed from cds-web Q22023. It has been moved to cds-web-overlays.
 */
export const UserSwitcher = ({ title = 'Brian', description }: SwitcherSubjectProps) => {
  return (
    <UserSwitcherRecipe>
      <Subject description={description} title={title} />
    </UserSwitcherRecipe>
  );
};

/**
 * @deprecated this component will be removed from cds-web Q22023. It has been moved to cds-web-overlays.
 */
export default {
  title: 'Core Components/Switchers/UserSwitcher  (deprecated - moved to cds-web-overlays)',
  component: UserSwitcher,
};
