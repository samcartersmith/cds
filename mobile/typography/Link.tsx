import React, { useCallback, memo } from 'react';

import { SharedProps } from '@cbhq/cds-common';
import { LinkBaseProps } from '@cbhq/cds-common/types/LinkBaseProps';
import { GestureResponderEvent } from 'react-native';

import { useOpenExternalUrl } from '../hooks/useOpenExternalUrl';
import { PressableOpacity } from '../system/PressableOpacity';
import { TextHeadline } from './TextHeadline';

export interface LinkProps extends LinkBaseProps, SharedProps {
  onPress?: (event: GestureResponderEvent) => void;
}

export const Link = memo(
  ({ accessibilityLabel, children, to, color = 'primary', testID, onPress }: LinkProps) => {
    const openUrl = useOpenExternalUrl();

    const openUrlOnPress = useCallback(
      (event: GestureResponderEvent) => {
        onPress?.(event);
        if (to !== undefined) openUrl(to);
      },
      [openUrl, to, onPress]
    );

    return (
      <PressableOpacity feedback="light" onPress={openUrlOnPress} testID={testID}>
        <TextHeadline
          color={color}
          accessibilityHint={accessibilityLabel}
          accessibilityLabel={accessibilityLabel}
        >
          {children}
        </TextHeadline>
      </PressableOpacity>
    );
  }
);

Link.displayName = 'Link';
