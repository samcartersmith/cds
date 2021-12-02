import React, { useState, useCallback } from 'react';
import { ButtonBaseProps, LinkBaseProps, TextInputBaseProps } from '@cbhq/cds-common/types';
import type { ToastBaseProps } from '@cbhq/cds-common/types';
import { useToast } from '@cbhq/cds-common/overlays/useToast';

export type CreateToastProps = {
  Toast: React.ComponentType<ToastBaseProps>;
  Button: React.ComponentType<ButtonBaseProps & { onPress?: () => void }>;
  Link: React.ComponentType<LinkBaseProps>;
  TextInput: React.ComponentType<
    TextInputBaseProps & { value: string; onChangeText: ((text: string) => void) | undefined }
  >;
};

export function createStories({ Toast, Button, Link, TextInput }: CreateToastProps) {
  const BasicToast = () => {
    const toast = useToast(Toast);
    const [toastCopy, setToastCopy] = useState('');

    const handlePress = useCallback(() => {
      toast.show(toastCopy || 'Toast copy', {
        action: <Link to="https://www.google.com/">Action</Link>,
        // hideCloseButton: true,
        // dangerouslySetDuration: 10000,
        onWillHide: () => {
          console.log('toast hiding');
        },
        onDidHide: () => {
          console.log('toast hidden');
        },
      });
    }, [toast, toastCopy]);

    return (
      <>
        <TextInput
          label="Toast copy"
          placeholder="Type anything to show in toast"
          value={toastCopy}
          onChangeText={setToastCopy}
        />
        <Button onPress={handlePress}>Show Toast</Button>
      </>
    );
  };

  return {
    BasicToast,
  };
}
