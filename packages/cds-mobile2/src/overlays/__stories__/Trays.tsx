import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { FlatList } from 'react-native';
import { useToggler } from '@cbhq/cds-common2/hooks/useToggler';
import { prices } from '@cbhq/cds-common2/internal/data/prices';
import { DrawerRefBaseProps } from '@cbhq/cds-common2/types';

import { Button } from '../../buttons/Button';
import { Menu } from '../../controls/Menu';
import { SelectOption } from '../../controls/SelectOption';
import { Fallback, VStack } from '../../layout';
import { Tray } from '../Tray/Tray';

export const options: string[] = prices.slice(0, 4);

const lotsOfOptions: string[] = prices.slice(0, 30);

export const DefaultTray = ({ title }: { title?: React.ReactNode }) => {
  const [isTrayVisible, { toggleOff: handleCloseTray, toggleOn: handleOpenTray }] =
    useToggler(true);
  const [value, setValue] = useState<string>();
  const trayRef = useRef<DrawerRefBaseProps>(null);

  const handleOptionPress = () => {
    trayRef.current?.handleClose();
  };

  const handleTrayVisibilityChange = useCallback((e: 'visible' | 'hidden') => {
    console.log('Tray visibility changed:', e);
  }, []);

  return (
    <>
      <Button onPress={handleOpenTray}>Open</Button>
      {isTrayVisible && (
        <Tray
          ref={trayRef}
          onCloseComplete={handleCloseTray}
          onVisibilityChange={handleTrayVisibilityChange}
          title={title}
        >
          <Menu onChange={setValue} value={value}>
            {options.map((option: string) => (
              <SelectOption
                key={option}
                description="BTC"
                onPress={handleOptionPress}
                title={option}
                value={option}
              />
            ))}
          </Menu>
        </Tray>
      )}
    </>
  );
};

const TrayFallbackContent = () => {
  return (
    <VStack gap={2} paddingLeft={3}>
      {lotsOfOptions.map((item, i) => (
        <Fallback key={item} height={30} rectWidthVariant={i} width={100} />
      ))}
    </VStack>
  );
};

export const ScrollableTray = ({
  title,
  fallbackEnabled,
  verticalDrawerPercentageOfView,
}: {
  title?: React.ReactNode;
  fallbackEnabled?: boolean;
  verticalDrawerPercentageOfView?: number;
}) => {
  const [isTrayVisible, { toggleOff: handleCloseTray, toggleOn: handleOpenTray }] =
    useToggler(true);
  const [value, setValue] = useState<string>();
  const trayRef = useRef<DrawerRefBaseProps>(null);
  const [isLoading, toggleIsLoading] = useToggler(fallbackEnabled);

  useEffect(() => {
    if (isTrayVisible && fallbackEnabled) {
      toggleIsLoading.toggleOn();
      setTimeout(() => toggleIsLoading.toggleOff(), __DEV__ ? 2000 : 20000);
    }
  }, [toggleIsLoading, isTrayVisible, fallbackEnabled]);

  const spacingStyles = useMemo(
    () => ({
      paddingBottom: 200,
    }),
    [],
  );

  const handleOptionPress = useCallback(() => {
    trayRef.current?.handleClose();
  }, []);

  const renderItem = useCallback(
    ({ index, item }: { index: number; item: string }) => {
      return (
        <SelectOption
          key={index}
          description="BTC"
          onPress={handleOptionPress}
          title={item}
          value={item}
        />
      );
    },
    [handleOptionPress],
  );

  return (
    <>
      <Button onPress={handleOpenTray}>Open</Button>
      {isTrayVisible && (
        <Tray
          ref={trayRef}
          disableCapturePanGestureToDismiss
          onCloseComplete={handleCloseTray}
          title={title}
          verticalDrawerPercentageOfView={verticalDrawerPercentageOfView}
        >
          {isLoading ? (
            <TrayFallbackContent />
          ) : (
            <Menu onChange={setValue} value={value}>
              <FlatList
                contentContainerStyle={spacingStyles}
                data={lotsOfOptions}
                renderItem={renderItem}
              />
            </Menu>
          )}
        </Tray>
      )}
    </>
  );
};
