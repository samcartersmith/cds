import React, { useCallback } from 'react';
import { ButtonBaseProps } from '@cbhq/cds-common/types';
import type { ToastBaseProps } from '@cbhq/cds-common/types';
import { useToast } from '@cbhq/cds-common/overlays/useToast';

export type CreateToastProps = {
  Toast: React.ComponentType<ToastBaseProps>;
  Button: React.ComponentType<ButtonBaseProps & { onPress?: () => void }>;
  PortalProvider?: React.ComponentType;
};

export function createStories({ Toast, Button, PortalProvider }: CreateToastProps) {
  const BasicToast = () => {
    const toast = useToast(Toast);

    const handleShow = useCallback(() => {
      toast.show('Toast copy', {
        action: { label: 'Action', onPress: () => console.log('action pressed') },
        // hideCloseButton: true,
        // dangerouslySetDuration: 10000,
        onWillHide: () => {
          console.log('toast hiding');
        },
        onDidHide: () => {
          console.log('toast hidden');
        },
      });
    }, [toast]);

    return (
      <>
        <Button onPress={handleShow}>Show Toast</Button>
      </>
    );
  };

  const MultilineToast = () => {
    const toast = useToast(Toast);

    const handleShow = useCallback(() => {
      toast.show('Very very very very very long toast copy', {
        action: { label: 'Action', onPress: () => console.log('action pressed') },
      });
    }, [toast]);

    return (
      <>
        <Button onPress={handleShow}>Multiline Toast</Button>
      </>
    );
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
