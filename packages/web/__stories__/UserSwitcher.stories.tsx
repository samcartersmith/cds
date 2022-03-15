import { memo, ReactElement } from 'react';
import { useToggler } from '@cbhq/cds-common/hooks/useToggler';
import { assets } from '@cbhq/cds-common/internal/data/assets';

import { Button } from '../buttons/Button';
import { IconButton } from '../buttons/IconButton';
import { NavigationIconButton } from '../buttons/NavigationIconButton';
import { DotSymbol } from '../dots/DotSymbol';
import { HStack } from '../layout/HStack';
import { VStack } from '../layout/VStack';
import { PortalProvider } from '../overlays/PortalProvider';
import { PositionedOverlay } from '../overlays/positionedOverlay/PositionedOverlay';

const UserSwitcherContent = memo(() => {
  // This is the content that will vary across app and user.
  return (
    <VStack gap={2} maxWidth={400} background="background" spacing={1}>
      <Button>Btn 1</Button>
      <Button>Btn 2</Button>
      <Button>Btn 3</Button>
    </VStack>
  );
});

export type UserSwitcherRecipeProps = {
  children: ReactElement;
};

// Recipe to be turned into the Switcher component
const UserSwitcherRecipe = memo(({ children }: UserSwitcherRecipeProps) => {
  const [visible, { toggleOn: handleClickSubject, toggleOff: handleClose }] = useToggler(false);
  return (
    <PositionedOverlay
      visible={visible}
      onClickSubject={handleClickSubject}
      onClose={handleClose}
      showOverlay
      content={<UserSwitcherContent />}
    >
      {children}
    </PositionedOverlay>
  );
});

export default {
  title: 'Core Components/UserSwitcher',
  component: UserSwitcherRecipe,
};

export const Base = () => {
  return (
    <PortalProvider>
      <HStack pin="right" spacingHorizontal={2} gap={3}>
        <UserSwitcherRecipe>
          <VStack spacing={2}>
            <IconButton name="bell" variant="secondary" />
          </VStack>
        </UserSwitcherRecipe>
        <UserSwitcherRecipe>
          <VStack spacing={2}>
            <DotSymbol size="m" pin="bottom-start" source={assets.eth.imageUrl}>
              <IconButton name="bell" variant="secondary" />
            </DotSymbol>
          </VStack>
        </UserSwitcherRecipe>

        <UserSwitcherRecipe>
          <VStack spacing={2}>
            <NavigationIconButton name="appSwitcher" />
          </VStack>
        </UserSwitcherRecipe>
        <UserSwitcherRecipe>
          <VStack spacing={2}>
            <DotSymbol size="m" pin="bottom-start" source={assets.eth.imageUrl}>
              <NavigationIconButton name="appSwitcher" />
            </DotSymbol>
          </VStack>
        </UserSwitcherRecipe>
      </HStack>
    </PortalProvider>
  );
};
