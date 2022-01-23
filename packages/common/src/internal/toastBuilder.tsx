import React, { useCallback } from 'react';
import type { ButtonBaseProps, ToastBaseProps } from '../types';
import { useToast } from '../overlays/useToast';

// eslint-disable-next-line no-console
const onActionPressConsole = () => console.log('action pressed');
// eslint-disable-next-line no-console
const onWillHideConsole = () => console.log('toast hiding');
// eslint-disable-next-line no-console
const onDidHideConsole = () => console.log('toast hidden');

export type CreateToastProps = {
  Toast: React.ComponentType<ToastBaseProps>;
  Button: React.ComponentType<ButtonBaseProps & { onPress?: () => void }>;
  PortalProvider?: React.ComponentType;
};

export function toastBuilder({ Toast, Button, PortalProvider }: CreateToastProps) {
  const BasicToast = () => {
    const toast = useToast(Toast);

    const handleShow = useCallback(() => {
      toast.show('Toast copy', {
        action: { label: 'Action', onPress: onActionPressConsole },
        // hideCloseButton: true,
        // dangerouslySetDuration: 10000,
        onWillHide: onWillHideConsole,
        onDidHide: onDidHideConsole,
      });
    }, [toast]);

    return <Button onPress={handleShow}>Show Toast</Button>;
  };

  const MultilineToast = () => {
    const toast = useToast(Toast);

    const handleShow = useCallback(() => {
      toast.show('Very very very very very long toast copy', {
        action: { label: 'Action', onPress: onActionPressConsole },
      });
    }, [toast]);

    return <Button onPress={handleShow}>Multiline Toast</Button>;
  };

  const Wrapper = PortalProvider ?? React.Fragment;

  return {
    BasicToast: () => (
      <Wrapper>
        <BasicToast />
      </Wrapper>
    ),
    MultilineToast: () => (
      <Wrapper>
        <MultilineToast />
      </Wrapper>
    ),
  };
}
