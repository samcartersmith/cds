import React, { useCallback, useRef, useState } from 'react';
import { useToggler } from '@cbhq/cds-common2/hooks/useToggler';
import { DrawerRefBaseProps } from '@cbhq/cds-common2/types';

import { FeedCard } from '../../cards/FeedCard';
import { Menu } from '../../controls/Menu';
import { SelectOption } from '../../controls/SelectOption';
import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { Tray } from '../tray/Tray';

const simpleOptions: string[] = ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5'];

const FeedCardTray = () => {
  const [isTrayVisible, { toggleOff: handleCloseTray, toggleOn: handleOpenTray }] =
    useToggler(true);
  const [value, setValue] = useState<string>();
  const trayRef = useRef<DrawerRefBaseProps>(null);

  const handleOptionPress = useCallback(() => {
    trayRef.current?.handleClose();
  }, []);

  const handleFeedCardHeaderButtonPress = useCallback(() => {
    handleOpenTray();
  }, [handleOpenTray]);

  return (
    <>
      <FeedCard
        author="Earn crypto"
        avatar="https://images.coinbase.com/avatar?s=350"
        description="Amp is an Ethereum token that can be used as collateral to provide instant settlement assurance any time value is transferred."
        headerAction={{
          name: 'more',
          onPress: handleFeedCardHeaderButtonPress,
        }}
        image="https://static-assets.coinbase.com/card/introduction/v2/initial_funding.png"
        mediaPlacement="above"
        title="LEARN AMP. EARN $3 IN AMP."
      />
      {isTrayVisible && (
        <Tray ref={trayRef} onCloseComplete={handleCloseTray}>
          <Menu onChange={setValue} value={value}>
            {simpleOptions.map((option: string) => (
              <SelectOption
                key={option}
                description={option}
                onPress={handleOptionPress}
                value={option}
              />
            ))}
          </Menu>
        </Tray>
      )}
    </>
  );
};

export const TrayFeedCardScreen = () => {
  return (
    <ExampleScreen>
      <Example title="Feed Card with Tray">
        <FeedCardTray />
      </Example>
    </ExampleScreen>
  );
};

export default TrayFeedCardScreen;
