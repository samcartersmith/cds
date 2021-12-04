import React from 'react';
import {
  BoxBaseProps,
  ButtonBaseProps,
  DrawerBaseProps,
  SelectOptionCellBaseProps,
  SharedProps,
  StackBaseProps,
  useToggler,
} from '@cbhq/cds-common';
import { GestureResponderEvent, ModalProps, ScrollViewProps } from 'react-native';
import { SafeAreaProvider, initialWindowMetrics } from 'react-native-safe-area-context';
import { prices } from '@cbhq/cds-common/internal/data/prices';

type LinkableProps = {
  onPress?: null | ((event: GestureResponderEvent) => void) | undefined;
};

export type CreateDrawerProps = {
  Drawer: React.ComponentType<DrawerBaseProps & Omit<ModalProps, 'onRequestClose' | 'children'>>;
  Button: React.ComponentType<ButtonBaseProps & SharedProps & { onPress?: () => void }>;
  LoremIpsum: React.ComponentType<Record<string, unknown>>;
  VStack: React.ComponentType<BoxBaseProps & StackBaseProps>;
  ScrollView: React.ComponentType<ScrollViewProps>;
  SelectOptionCell: React.ComponentType<SelectOptionCellBaseProps & LinkableProps>;
};

const lotsOfOptions: string[] = prices.slice(0, 30);

export const createStories = ({
  Drawer,
  Button,
  LoremIpsum,
  VStack,
  ScrollView,
  SelectOptionCell,
}: CreateDrawerProps) => {
  const DefaultDrawer = ({ pin = 'left' }: Pick<DrawerBaseProps, 'pin'>) => {
    const [isVisible, { toggleOn, toggleOff }] = useToggler(false);
    return (
      <>
        <Button onPress={toggleOn}>Open</Button>
        {isVisible && (
          <Drawer pin={pin} onCloseComplete={toggleOff}>
            {({ closeDrawer }) => (
              <VStack spacing={2}>
                <LoremIpsum />
                <Button
                  onPress={() => {
                    closeDrawer();
                  }}
                >
                  Close Drawer
                </Button>
              </VStack>
            )}
          </Drawer>
        )}
      </>
    );
  };

  /** for testing only */
  const MockDrawer: React.FC<Partial<DrawerBaseProps>> = ({ onCloseComplete, pin = 'bottom' }) => {
    const [isVisible, { toggleOn, toggleOff }] = useToggler(false);

    const handleRequestClose = () => {
      onCloseComplete?.();
      toggleOff();
    };

    return (
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <Button onPress={toggleOn} testID="open-drawer-button">
          Open Drawer
        </Button>
        {isVisible ? (
          <Drawer visible={isVisible} onCloseComplete={handleRequestClose} pin={pin}>
            {({ closeDrawer }) => (
              <VStack spacing={2}>
                <LoremIpsum />
                <Button
                  testID="close-drawer-button"
                  onPress={() => {
                    closeDrawer();
                  }}
                >
                  Close Drawer
                </Button>
              </VStack>
            )}
          </Drawer>
        ) : null}
      </SafeAreaProvider>
    );
  };

  const MockDrawerWithScrollableChildren: React.FC<Partial<DrawerBaseProps>> = ({
    onCloseComplete,
    pin = 'bottom',
    disableCapturePanGestureToDismiss,
  }) => {
    const [isVisible, { toggleOn, toggleOff }] = useToggler(false);

    const handleRequestClose = () => {
      onCloseComplete?.();
      toggleOff();
    };

    return (
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <Button onPress={toggleOn} testID="open-drawer-button">
          Open Drawer
        </Button>
        {isVisible ? (
          <Drawer
            visible={isVisible}
            onCloseComplete={handleRequestClose}
            pin={pin}
            disableCapturePanGestureToDismiss={disableCapturePanGestureToDismiss}
          >
            {({ closeDrawer }) => (
              <VStack>
                <ScrollView>
                  {lotsOfOptions.map((option: string) => (
                    <SelectOptionCell
                      key={option}
                      title={option}
                      description="Price"
                      onPress={() => {
                        closeDrawer();
                      }}
                    />
                  ))}
                </ScrollView>
                <Button
                  onPress={() => {
                    closeDrawer();
                  }}
                  testID="close-drawer-button"
                >
                  Close Drawer
                </Button>
              </VStack>
            )}
          </Drawer>
        ) : null}
      </SafeAreaProvider>
    );
  };

  return {
    DefaultDrawer,
    MockDrawer,
    MockDrawerWithScrollableChildren,
  };
};
