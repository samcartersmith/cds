import React, { useCallback } from 'react';

import { useToggler } from '../hooks/useToggler';
import { useAlert } from '../overlays/useAlert';
import type { AlertBaseProps, ButtonBaseProps, SharedProps } from '../types';

const onPressConsole = () => console.log('pressed');

export type CreateAlertProps = {
  Alert: React.ComponentType<AlertBaseProps & { disablePortal?: boolean }>;
  Button: React.ComponentType<ButtonBaseProps & SharedProps & { onPress?: () => void }>;
  PortalProvider: React.ComponentType;
};

export function alertBuilder({ Alert, Button, PortalProvider }: CreateAlertProps) {
  const BasicAlert = ({ singleAction }: { singleAction?: boolean }) => {
    const [visible, { toggleOn, toggleOff }] = useToggler();

    return (
      <>
        <Button onPress={toggleOn}>Show Alert</Button>
        <Alert
          visible={visible}
          title="Alert title"
          body="Alert body type that can run over multiple lines, but should be kept short."
          pictogram="warning"
          onRequestClose={toggleOff}
          preferredActionLabel="Primary"
          onPreferredActionPress={onPressConsole}
          dismissActionLabel={singleAction ? undefined : 'Cancel'}
        />
      </>
    );
  };

  const VisibleAlert = ({ singleAction }: { singleAction?: boolean }) => {
    const [visible, { toggleOff }] = useToggler(true);

    return (
      <Alert
        visible={visible}
        title="Alert title"
        body="Alert body type that can run over multiple lines, but should be kept short."
        pictogram="warning"
        preferredActionLabel="Primary"
        onPreferredActionPress={onPressConsole}
        dismissActionLabel={singleAction ? undefined : 'Cancel'}
        onRequestClose={toggleOff}
      />
    );
  };

  const PortalAlert = () => {
    // eslint-disable-next-line react/no-unstable-nested-components
    function AlertExample() {
      const { open, close } = useAlert();

      const showAlert = useCallback(
        () =>
          open(
            <Alert
              visible
              title="Alert title"
              body="Alert body type that can run over multiple lines, but should be kept short."
              pictogram="warning"
              onRequestClose={close}
              preferredActionLabel="Save"
              onPreferredActionPress={onPressConsole}
              preferredActionVariant="negative"
              dismissActionLabel="Cancel"
            />,
          ),
        [open, close],
      );

      return <Button onPress={showAlert}>Show Alert</Button>;
    }

    return (
      <PortalProvider>
        <AlertExample />
      </PortalProvider>
    );
  };

  // for unit testing
  const MockAlert: React.FC<Partial<AlertBaseProps>> = ({
    visible: externalVisible,
    onRequestClose,
    title,
    body,
    pictogram,
    preferredActionLabel,
    onPreferredActionPress,
    dismissActionLabel,
  }) => {
    const [visible, { toggleOn, toggleOff }] = useToggler();

    return (
      <>
        <Button onPress={toggleOn}>Show Alert</Button>
        <Alert
          visible={externalVisible ?? visible}
          title={title ?? 'Alert title'}
          body={
            body ?? 'Alert body type that can run over multiple lines, but should be kept short.'
          }
          pictogram={pictogram ?? 'warning'}
          onRequestClose={onRequestClose ?? toggleOff}
          preferredActionLabel={preferredActionLabel ?? 'Save'}
          onPreferredActionPress={onPreferredActionPress ?? onPressConsole}
          dismissActionLabel={dismissActionLabel}
          disablePortal
        />
      </>
    );
  };

  return {
    BasicAlert,
    VisibleAlert,
    SingleActionAlert: () => <BasicAlert singleAction />,
    PortalAlert,
    MockAlert,
  };
}
