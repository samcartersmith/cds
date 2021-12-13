import React, { useState } from 'react';
import type { ButtonBaseProps, SelectOptionBaseProps, SharedProps, TrayBaseProps } from '../types';
import { useToggler } from '../hooks/useToggler';
import { prices } from './data/prices';

const options: string[] = prices.slice(0, 4);
const lotsOfOptions: string[] = prices.slice(0, 30);

type LinkableProps = {
  onPress?: null | ((event: unknown) => void) | undefined;
};

export type CreateTrayProps = {
  Tray: React.ComponentType<TrayBaseProps>;
  Button: React.ComponentType<ButtonBaseProps & SharedProps & { onPress?: () => void }>;
  SelectOption: React.ComponentType<SelectOptionBaseProps & LinkableProps>;
  ScrollView: React.ComponentType;
};

type DefaultTrayTypes = {
  compact?: boolean;
  title?: string;
};

export const trayBuilder = ({ Tray, Button, SelectOption, ScrollView }: CreateTrayProps) => {
  const DefaultTray = ({ compact, title }: DefaultTrayTypes) => {
    const [isTrayVisible, toggleTray] = useToggler(false);
    const [value, setValue] = useState<string>();
    return (
      <>
        {/* eslint-disable-next-line react-perf/jsx-no-new-function-as-prop */}
        <Button onPress={() => toggleTray.toggle()}>Open</Button>
        {isTrayVisible && (
          // eslint-disable-next-line react-perf/jsx-no-new-function-as-prop
          <Tray title={title} onCloseComplete={() => toggleTray.toggleOff()}>
            {({ closeTray }) =>
              options.map((option: string) => (
                <SelectOption
                  key={option}
                  compact={compact}
                  title={option}
                  description="Price"
                  selected={option === value}
                  // eslint-disable-next-line react-perf/jsx-no-new-function-as-prop
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
        {/* eslint-disable-next-line react-perf/jsx-no-new-function-as-prop */}
        <Button onPress={() => toggleTray.toggle()}>Open</Button>
        {isTrayVisible && (
          <Tray
            title={title}
            // eslint-disable-next-line react-perf/jsx-no-new-function-as-prop
            onCloseComplete={() => toggleTray.toggleOff()}
            disableCapturePanGestureToDismiss={false}
          >
            {({ closeTray }) => {
              return (
                <ScrollView>
                  {lotsOfOptions.map((option: string) => (
                    <SelectOption
                      key={option}
                      compact={compact}
                      title={option}
                      description="Price"
                      selected={option === value}
                      // eslint-disable-next-line react-perf/jsx-no-new-function-as-prop
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
