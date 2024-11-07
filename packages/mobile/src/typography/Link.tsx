import React, { memo, useCallback } from 'react';
import { GestureResponderEvent } from 'react-native';
import { SharedProps } from '@cbhq/cds-common';
import { LinkBaseProps, LinkTypography } from '@cbhq/cds-common/types/LinkBaseProps';

import { useWebBrowserOpener } from '../hooks/useWebBrowserOpener';

import { TextProps } from './createText';
import { TextBody } from './TextBody';
import { TextCaption } from './TextCaption';
import { TextHeadline } from './TextHeadline';
import { TextInherited } from './TextInherited';
import { TextLabel1 } from './TextLabel1';
import { TextLabel2 } from './TextLabel2';
import { TextLegal } from './TextLegal';
import { TextTitle1 } from './TextTitle1';
import { TextTitle2 } from './TextTitle2';
import { TextTitle3 } from './TextTitle3';
import { TextTitle4 } from './TextTitle4';

const TYPOGRAPHY_MAP: Record<
  LinkTypography,
  React.ComponentType<React.PropsWithChildren<TextProps>>
> = {
  body: TextBody,
  caption: TextCaption,
  headline: TextHeadline,
  label1: TextLabel1,
  label2: TextLabel2,
  title1: TextTitle1,
  title2: TextTitle2,
  title3: TextTitle3,
  title4: TextTitle4,
  legal: TextLegal,
  inherit: TextInherited,
};
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
  SharedProps;

export const Link = memo(
  ({
    accessibilityLabel,
    children,
    to,
    color = 'primary',
    testID,
    onPress,
    variant = 'inherit',
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

    const TextComponent = TYPOGRAPHY_MAP[variant];

    return (
      <TextComponent
        accessibilityHint={accessibilityLabel}
        accessibilityLabel={accessibilityLabel}
        accessibilityRole="link"
        color={color}
        mono={mono}
        onPress={openUrlOnPress}
        testID={testID}
        underline={underline}
      >
        {children}
      </TextComponent>
    );
  },
);

Link.displayName = 'Link';
