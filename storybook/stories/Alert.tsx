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
          pictogramName="warning"
          onRequestClose={toggleOff}
          primaryActionTitle="Primary"
          primaryActionOnPress={() => console.log('primary pressed')}
          secondaryActionTitle={singleAction ? undefined : 'Secondary'}
          secondaryActionOnPress={singleAction ? undefined : () => console.log('secondary pressed')}
        />
      </>
    );
  };

  const PortalAlert = () => {
    function AlertExample() {
      const alert = useAlert();

      const showAlert = useCallback(
        () =>
          alert.show(
            <Alert
              visible
              title="Alert title"
              body="Alert body type that can run over multiple lines, but should be kept short."
              pictogramName="warning"
              onRequestClose={() => console.log('Alert dimissed!')}
              primaryActionTitle="Primary"
              primaryActionOnPress={() => console.log('primary pressed')}
              secondaryActionTitle="Secondary"
              secondaryActionOnPress={() => console.log('secondary pressed')}
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
    pictogramName,
    primaryActionTitle,
    primaryActionOnPress,
    secondaryActionTitle,
    secondaryActionOnPress,
  }) => {
    const [visible, { toggleOn, toggleOff }] = useToggler();

    return (
      <>
        <Button onPress={toggleOn}>Show Alert</Button>
        <Alert
          testID="alert-mock"
          visible={externalVisible ?? visible}
          title={title ?? 'Alert title'}
          body={
            body ?? 'Alert body type that can run over multiple lines, but should be kept short.'
          }
          pictogramName={pictogramName ?? 'warning'}
          onRequestClose={onRequestClose ?? toggleOff}
          primaryActionTitle={primaryActionTitle ?? 'Primary'}
          primaryActionOnPress={primaryActionOnPress ?? (() => {})}
          secondaryActionTitle={secondaryActionTitle}
          secondaryActionOnPress={secondaryActionOnPress}
        />
      </>
    );
  };

  return {
    BasicAlert,
    PortalAlert,
    MockAlert,
  };
}
