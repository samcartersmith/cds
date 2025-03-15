import React, { useCallback, useEffect } from 'react';

import { useToggler } from '../hooks/useToggler';
import { useAlert } from '../overlays/useAlert';
import type {
  AlertBaseProps,
  ButtonBaseProps,
  SharedAccessibilityProps,
  SharedProps,
} from '../types';

const onPressConsole = () => console.log('pressed');

type AlertA11yProps = Pick<
  SharedAccessibilityProps,
  'accessibilityLabelledBy' | 'accessibilityLabel'
>;

export type CreateAlertProps = {
  Alert: React.ComponentType<
    React.PropsWithChildren<AlertBaseProps & AlertA11yProps & { disablePortal?: boolean }>
  >;
  Button: React.ComponentType<
    React.PropsWithChildren<ButtonBaseProps & SharedProps & { onPress?: () => void }>
  >;
  PortalProvider: React.ComponentType<React.PropsWithChildren<unknown>>;
};

export function alertBuilder({ Alert, Button, PortalProvider }: CreateAlertProps) {
  const BasicAlert = ({ singleAction = false }) => {
    const [visible, { toggleOn, toggleOff }] = useToggler(true);

    return (
      <>
        <Button onPress={toggleOn}>Show Alert</Button>
        <Alert
          body="Alert body type that can run over multiple lines, but should be kept short."
          dismissActionLabel={singleAction ? undefined : 'Cancel'}
          onPreferredActionPress={onPressConsole}
          onRequestClose={toggleOff}
          pictogram="warning"
          preferredActionLabel="Primary"
          title="Alert title"
          visible={visible}
        />
      </>
    );
  };

  const LongTitleAlert = ({ singleAction = false }) => {
    const [visible, { toggleOn, toggleOff }] = useToggler(true);

    return (
      <>
        <Button onPress={toggleOn}>Show Alert</Button>
        <Alert
          body="Alert body type that can run over multiple lines, but should be kept short."
          dismissActionLabel={singleAction ? undefined : 'Cancel'}
          onPreferredActionPress={onPressConsole}
          onRequestClose={toggleOff}
          pictogram="warning"
          preferredActionLabel="Primary"
          title="Multiline title should be centered"
          visible={visible}
        />
      </>
    );
  };

  const PortalAlert = () => {
    function AlertExample() {
      const { open, close } = useAlert();

      const showAlert = useCallback(
        () =>
          open(
            <Alert
              visible
              body="Alert body type that can run over multiple lines, but should be kept short."
              dismissActionLabel="Cancel"
              onPreferredActionPress={onPressConsole}
              onRequestClose={close}
              pictogram="warning"
              preferredActionLabel="Save"
              preferredActionVariant="negative"
              title="Alert title"
            />,
          ),
        [open, close],
      );

      useEffect(() => {
        showAlert();

        return () => close();
      }, [close, showAlert]);

      return <Button onPress={showAlert}>Show Alert</Button>;
    }

    return (
      <PortalProvider>
        <AlertExample />
      </PortalProvider>
    );
  };

  // for unit testing
  const MockAlert = ({
    visible: externalVisible,
    onRequestClose,
    title,
    body,
    pictogram,
    preferredActionLabel,
    onPreferredActionPress,
    dismissActionLabel,
    testID,
    accessibilityLabelledBy,
    accessibilityLabel,
  }: Partial<AlertBaseProps> & AlertA11yProps) => {
    const [visible, { toggleOn, toggleOff }] = useToggler(false);

    return (
      <>
        <Button onPress={toggleOn}>Show Alert</Button>
        <Alert
          disablePortal
          accessibilityLabel={accessibilityLabel}
          accessibilityLabelledBy={accessibilityLabelledBy}
          body={
            body ?? 'Alert body type that can run over multiple lines, but should be kept short.'
          }
          dismissActionLabel={dismissActionLabel}
          onPreferredActionPress={onPreferredActionPress ?? onPressConsole}
          onRequestClose={onRequestClose ?? toggleOff}
          pictogram={pictogram ?? 'warning'}
          preferredActionLabel={preferredActionLabel ?? 'Save'}
          testID={testID}
          title={title ?? 'Alert title'}
          visible={externalVisible ?? visible}
        />
      </>
    );
  };

  return {
    BasicAlert,
    LongTitleAlert,
    SingleActionAlert: () => <BasicAlert singleAction />,
    PortalAlert,
    MockAlert,
  };
}
