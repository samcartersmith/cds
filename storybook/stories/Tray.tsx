import React, { useState } from 'react';
import { useToggler } from '@cbhq/cds-common/hooks/useToggler';
import {
  ButtonBaseProps,
  SelectOptionCellBaseProps,
  SharedProps,
  TrayBaseProps,
} from '@cbhq/cds-common/types';
import { GestureResponderEvent, ScrollViewProps } from 'react-native';
import { prices } from '../data/prices';

const options: string[] = prices.slice(0, 5);
const lotsOfOptions: string[] = prices.slice(0, 30);

type LinkableProps = {
  onPress?: null | ((event: GestureResponderEvent) => void) | undefined;
};

export type CreateTrayProps = {
  Tray: React.ComponentType<TrayBaseProps>;
  Button: React.ComponentType<ButtonBaseProps & SharedProps & { onPress?: () => void }>;
  SelectOptionCell: React.ComponentType<SelectOptionCellBaseProps & LinkableProps>;
  ScrollView: React.ComponentType<ScrollViewProps>;
};

type DefaultTrayTypes = {
  compact?: boolean;
  title?: string;
};

export const createStories = ({ Tray, Button, SelectOptionCell, ScrollView }: CreateTrayProps) => {
  const DefaultTray = ({ compact, title }: DefaultTrayTypes) => {
    const [isTrayVisible, toggleTray] = useToggler(false);
    const [value, setValue] = useState<string>();
    return (
      <>
        <Button onPress={() => toggleTray.toggle()}>Open</Button>
        {isTrayVisible && (
          <Tray title={title} onCloseComplete={() => toggleTray.toggleOff()}>
            {({ closeTray }) =>
              options.map((option: string) => (
                <SelectOptionCell
                  key={option}
                  compact={compact}
                  title={option}
                  description="Price"
                  selected={option === value}
                  onPress={() => {
                    setValue(option);
                    closeTray();
                  }}
                />
              ))
            }
          </Tray>
        )}
      </>
    );
  };
  const ScrollableTray = ({ compact, title }: DefaultTrayTypes) => {
    const [isTrayVisible, toggleTray] = useToggler(false);
    const [value, setValue] = useState<string>();
    return (
      <>
        <Button onPress={() => toggleTray.toggle()}>Open</Button>
        {isTrayVisible && (
          <Tray
            title={title}
            onCloseComplete={() => toggleTray.toggleOff()}
            disableCapturePanGestureToDismiss={false}
          >
            {({ closeTray }) => {
              return (
                <ScrollView>
                  {lotsOfOptions.map((option: string) => (
                    <SelectOptionCell
                      key={option}
                      compact={compact}
                      title={option}
                      description="Price"
                      selected={option === value}
                      onPress={() => {
                        setValue(option);
                        closeTray();
                      }}
                    />
                  ))}
                </ScrollView>
              );
            }}
          </Tray>
        )}
      </>
    );
  };
  return {
    DefaultTray,
    ScrollableTray,
  };
};
