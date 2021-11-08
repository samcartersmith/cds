import React, { useCallback } from 'react';
import { ButtonBaseProps, useToggler } from '@cbhq/cds-common';
import type { AlertBaseProps, SharedProps } from '@cbhq/cds-common/types';
import { useAlert } from '@cbhq/cds-common/overlays/useAlert';

export type CreateAlertProps = {
  Alert: React.ComponentType<AlertBaseProps & { disablePortal?: boolean }>;
  Button: React.ComponentType<ButtonBaseProps & SharedProps & { onPress?: () => void }>;
  PortalProvider: React.ComponentType;
};

export function createStories({ Alert, Button, PortalProvider }: CreateAlertProps) {
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
          onPreferredActionPress={() => console.log('primary pressed')}
          dismissActionLabel={singleAction ? undefined : 'Cancel'}
        />
      </>
    );
  };

  const PortalAlert = () => {
    function AlertExample() {
      const alert = useAlert();

      const showAlert = useCallback(
        () =>
          alert.open(
            <Alert
              visible
              title="Alert title"
              body="Alert body type that can run over multiple lines, but should be kept short."
              pictogram="warning"
              onRequestClose={() => console.log('Alert dimissed!')}
              preferredActionLabel="Save"
              onPreferredActionPress={() => console.log('primary pressed')}
              preferredActionVariant="negative"
              dismissActionLabel="Cancel"
            />,
          ),
        [alert],
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
          onPreferredActionPress={onPreferredActionPress ?? (() => {})}
          dismissActionLabel={dismissActionLabel}
          disablePortal
        />
      </>
    );
  };

  return {
    BasicAlert,
    SingleActionAlert: () => <BasicAlert singleAction />,
    PortalAlert,
    MockAlert,
  };
}
