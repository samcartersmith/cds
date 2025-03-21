import React, { memo, useCallback } from 'react';
import { GestureResponderEvent } from 'react-native';
import { SharedProps } from '@cbhq/cds-common2';
import { LinkBaseProps } from '@cbhq/cds-common2/types/LinkBaseProps';

import { useWebBrowserOpener } from '../hooks/useWebBrowserOpener';

import { type TextProps, Text } from './Text';

export type LinkProps = {
  /** Callback to fire when pressed */
  onPress?: (event: GestureResponderEvent) => void;
  /**
   * Toggles whether the link should be opened outside or within app
   * @default false
   * */
  forceOpenOutsideApp?: boolean;
  /**
   * Toggles whether we allow users to go back to app
   * when they are in an external browser
   * @default false
   */
  preventRedirectionIntoApp?: boolean;
  /**
   * Toggles readerMode flag for web browser.
   * Note: readerMode is only available on ios
   * @default false
   */
  readerMode?: boolean;
} & LinkBaseProps &
  SharedProps &
  Pick<TextProps, 'font'>;

export const Link = memo(
  ({
    accessibilityLabel,
    children,
    to,
    color = 'fgPrimary',
    testID,
    onPress,
    font = 'inherit',
    forceOpenOutsideApp = false,
    preventRedirectionIntoApp = false,
    readerMode = false,
    mono,
    underline = false,
  }: LinkProps) => {
    const openUrl = useWebBrowserOpener();

    const openUrlOnPress = useCallback(
      (event: GestureResponderEvent) => {
        onPress?.(event);
        if (to !== undefined) {
          void openUrl(to, {
            forceOpenOutsideApp,
            preventRedirectionIntoApp,
            readerMode,
          });
        }
      },
      [openUrl, to, onPress, forceOpenOutsideApp, preventRedirectionIntoApp, readerMode],
    );

    return (
      <Text
        accessibilityHint={accessibilityLabel}
        accessibilityLabel={accessibilityLabel}
        accessibilityRole="link"
        color={color}
        font={font}
        mono={mono}
        onPress={openUrlOnPress}
        testID={testID}
        underline={underline}
      >
        {children}
      </Text>
    );
  },
);

Link.displayName = 'Link';
