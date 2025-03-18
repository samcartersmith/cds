import React, { useCallback } from 'react';

import { useToast } from '../overlays/useToast';
import type { BoxBaseProps, ButtonBaseProps, StackBaseProps, ToastBaseProps } from '../types';

const onActionPressConsole = () => console.log('action pressed');

const onWillHideConsole = () => console.log('toast hiding');

const onDidHideConsole = () => console.log('toast hidden');

export type CreateToastProps = {
  Toast: React.ComponentType<React.PropsWithChildren<ToastBaseProps>>;
  Button: React.ComponentType<React.PropsWithChildren<ButtonBaseProps & { onPress?: () => void }>>;
  PortalProvider?: React.ComponentType<React.PropsWithChildren<unknown>>;
  Stack: React.ComponentType<React.PropsWithChildren<BoxBaseProps & StackBaseProps>>;
};

type UseToastProps = {
  hideCloseButton?: boolean;
  disablePortal?: boolean;
};

/** @deprecated don't use creator pattern in v8 */
export function toastBuilder({ Toast, Button, PortalProvider, Stack }: CreateToastProps) {
  const BasicToast = () => {
    const toast = useToast<UseToastProps>(Toast);

    const handleShow = useCallback(() => {
      toast.show('Toast copy', {
        action: { label: 'Action', onPress: onActionPressConsole },
        hideCloseButton: true,
        disablePortal: true,
        onWillHide: onWillHideConsole,
        onDidHide: onDidHideConsole,
      });
    }, [toast]);

    const handleShowMultiline = useCallback(() => {
      toast.show(`Very${' very'.repeat(30)} long toast copy`, {
        action: { label: 'Action', onPress: onActionPressConsole },
      });
    }, [toast]);

    const handleShowBottomOffset = useCallback(() => {
      toast.show('Toast copy', {
        action: { label: 'Action', onPress: onActionPressConsole },
        bottomOffset: 100,
      });
    }, [toast]);

    const handleVariant = useCallback(() => {
      toast.show('Toast copy', {
        variant: 'bgNegative',
      });
    }, [toast]);

    return (
      <Stack gap={3}>
        <Button onPress={handleShow}>Show Toast</Button>
        <Button onPress={handleShowMultiline}>Multiline Toast</Button>
        <Button onPress={handleShowBottomOffset}>Bottom Offset Toast</Button>
        <Button onPress={handleVariant}>Variant</Button>
      </Stack>
    );
  };

  const Wrapper = PortalProvider ?? React.Fragment;

  return {
    BasicToast: () => (
      <Wrapper>
        <BasicToast />
      </Wrapper>
    ),
  };
}
