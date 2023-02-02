import React, { useCallback } from 'react';

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

  const LongTitleAlert = ({ singleAction }: { singleAction?: boolean }) => {
    const [visible, { toggleOn, toggleOff }] = useToggler();

    return (
      <>
        <Button onPress={toggleOn}>Show Alert</Button>
        <Alert
          visible={visible}
          title="Multiline title should be centered"
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
          testID={testID}
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
          accessibilityLabelledBy={accessibilityLabelledBy}
          accessibilityLabel={accessibilityLabel}
          disablePortal
        />
      </>
    );
  };

  return {
    BasicAlert,
    LongTitleAlert,
    VisibleAlert,
    SingleActionAlert: () => <BasicAlert singleAction />,
    PortalAlert,
    MockAlert,
  };
}
