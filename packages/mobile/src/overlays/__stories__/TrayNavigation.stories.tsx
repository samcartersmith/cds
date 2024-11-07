import React, { useCallback, useRef, useState } from 'react';
import { useToggler } from '@cbhq/cds-common/hooks/useToggler';
import { navigationOptions } from '@cbhq/cds-common/internal/data/navigation';
import { DrawerRefBaseProps, IllustrationPictogramNames } from '@cbhq/cds-common/types';
import { NoopFn } from '@cbhq/cds-common/utils/mockUtils';

import { IconButton } from '../../buttons/IconButton';
import { Menu } from '../../controls/Menu';
import { SelectOption } from '../../controls/SelectOption';
import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { Pictogram } from '../../illustrations/Pictogram';
import { HStack } from '../../layout';
import { Tray } from '../Tray/Tray';

const NavigationTray = () => {
  const [isTrayVisible, { toggleOff: handleCloseTray, toggleOn: handleOpenTray }] =
    useToggler(true);
  const [value, setValue] = useState<string>();
  const trayRef = useRef<DrawerRefBaseProps>(null);

  const handleOptionPress = useCallback(() => {
    trayRef.current?.handleClose();
  }, []);
  const handleAppSwitcherPress = useCallback(() => {
    handleOpenTray();
  }, [handleOpenTray]);

  return (
    <>
      <HStack gap={2} justifyContent="flex-end" minHeight={200}>
        <IconButton name="hamburger" onPress={handleAppSwitcherPress} />
        <IconButton name="profile" onPress={NoopFn} />
      </HStack>
      {isTrayVisible && (
        <Tray ref={trayRef} onCloseComplete={handleCloseTray}>
          <Menu onChange={setValue} value={value}>
            {navigationOptions.map(({ name, value: optionValue, description, mediaName }) => (
              <SelectOption
                key={optionValue}
                description={description}
                media={
                  <Pictogram dimension="48x48" name={mediaName as IllustrationPictogramNames} />
                }
                onPress={handleOptionPress}
                title={name}
                value={optionValue}
              />
            ))}
          </Menu>
        </Tray>
      )}
    </>
  );
};

export const TrayNavigationScreen = () => {
  return (
    <ExampleScreen>
      <Example title="Navigation with Tray">
        <NavigationTray />
      </Example>
    </ExampleScreen>
  );
};

export default TrayNavigationScreen;
