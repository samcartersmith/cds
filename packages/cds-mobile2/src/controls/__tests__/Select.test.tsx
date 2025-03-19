import React, { useCallback, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { fireEvent, render, screen } from '@testing-library/react-native';

import { Tray } from '../../overlays/tray/Tray';
import { Text } from '../../typography/Text';
import { DefaultThemeProvider, SAFE_AREA_METRICS } from '../../utils/testHelpers';
import { Select } from '../Select';
import { SelectOption } from '../SelectOption';

const DefaultSelect = ({ trayTitle, hasDescription, hideHandleBar, ...props }: any) => {
  const [isTrayVisible, setIsTrayVisible] = useState(false);
  const [selectedValue, setValue] = useState<string | undefined>();

  const openTray = useCallback(() => setIsTrayVisible(true), []);
  const closeTray = useCallback(() => setIsTrayVisible(false), []);

  const exampleOptions = ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5', 'Option 6'];

  return (
    <Select onChange={setValue} onPress={openTray} value={selectedValue} {...props}>
      {isTrayVisible && (
        <Tray
          hideHandleBar={hideHandleBar}
          onCloseComplete={closeTray}
          testID="select-input-tray"
          title={trayTitle}
        >
          {({ handleClose }) =>
            exampleOptions.map((option) => (
              <SelectOption
                key={option}
                description={hasDescription ? 'Description' : undefined}
                onPress={handleClose}
                title={option}
                value={option}
              />
            ))
          }
        </Tray>
      )}
    </Select>
  );
};

const placeholderText = 'Choose something';

describe('Select Input', () => {
  it('passes a11y', () => {
    render(
      <DefaultThemeProvider>
        <SafeAreaProvider initialMetrics={SAFE_AREA_METRICS}>
          <DefaultSelect placeholder={placeholderText} testID="mock-select" />
        </SafeAreaProvider>
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId('mock-select')).toBeAccessible();
  });
  it('renders the Select Input trigger', async () => {
    render(
      <DefaultThemeProvider>
        <SafeAreaProvider initialMetrics={SAFE_AREA_METRICS}>
          <DefaultSelect placeholder={placeholderText} />
        </SafeAreaProvider>
      </DefaultThemeProvider>,
    );

    expect(screen.getByText(placeholderText)).toBeTruthy();
  });
  it('prevents press interactions when disabled', () => {
    const onPressSpy = jest.fn();
    render(
      <DefaultThemeProvider>
        <SafeAreaProvider initialMetrics={SAFE_AREA_METRICS}>
          <DefaultSelect disabled onPress={onPressSpy} placeholder={placeholderText} />
        </SafeAreaProvider>
      </DefaultThemeProvider>,
    );

    fireEvent.press(screen.getByText(placeholderText));

    expect(onPressSpy).not.toHaveBeenCalled();
  });
  it('renders error icon in helper text when variant is negative', async () => {
    render(
      <DefaultThemeProvider>
        <SafeAreaProvider initialMetrics={SAFE_AREA_METRICS}>
          <DefaultSelect
            helperText="helper text"
            placeholder={placeholderText}
            variant="negative"
          />
        </SafeAreaProvider>
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId('select-error-icon')).toBeTruthy();
    expect(screen.getByTestId('select-error-icon')).toBeAccessible();
  });
  it('should not render error icon when passing helper text node', async () => {
    render(
      <DefaultThemeProvider>
        <SafeAreaProvider initialMetrics={SAFE_AREA_METRICS}>
          <DefaultSelect
            helperText={<Text>helper text</Text>}
            placeholder={placeholderText}
            variant="negative"
          />
        </SafeAreaProvider>
      </DefaultThemeProvider>,
    );

    expect(screen.queryByTestId('select-error-icon')).toBeFalsy();
  });
});
