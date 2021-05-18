import React, { useCallback, memo } from 'react';

import { SharedProps } from '@cbhq/cds-common';
import { LinkBaseProps, LinkTypography } from '@cbhq/cds-common/types/LinkBaseProps';
import { GestureResponderEvent } from 'react-native';

import { useOpenExternalUrl } from '../hooks/useOpenExternalUrl';
import { TextProps } from './createText';
import { TextBody } from './TextBody';
import { TextCaption } from './TextCaption';
import { TextHeadline } from './TextHeadline';
import { TextLabel1 } from './TextLabel1';
import { TextLabel2 } from './TextLabel2';
import { TextLegal } from './TextLegal';
import { TextTitle1 } from './TextTitle1';
import { TextTitle2 } from './TextTitle2';
import { TextTitle3 } from './TextTitle3';

const TYPOGRAPHY_MAP: Record<LinkTypography, React.ComponentType<TextProps>> = {
  body: TextBody,
  caption: TextCaption,
  headline: TextHeadline,
  label1: TextLabel1,
  label2: TextLabel2,
  title1: TextTitle1,
  title2: TextTitle2,
  title3: TextTitle3,
  legal: TextLegal,
};
export interface LinkProps extends LinkBaseProps, SharedProps {
  /** Callback to fire when pressed */
  onPress?: (event: GestureResponderEvent) => void;
}

export const Link = memo(
  ({
    accessibilityLabel,
    children,
    to,
    color = 'primary',
    testID,
    onPress,
    variant = 'headline',
  }: LinkProps) => {
    const openUrl = useOpenExternalUrl();

    const openUrlOnPress = useCallback(
      (event: GestureResponderEvent) => {
        onPress?.(event);
        if (to !== undefined) openUrl(to);
      },
      [openUrl, to, onPress]
    );

    const TextComponent = TYPOGRAPHY_MAP[variant];

    return (
      <TextComponent
        accessibilityHint={accessibilityLabel}
        accessibilityLabel={accessibilityLabel}
        testID={testID}
        onPress={openUrlOnPress}
        color={color}
      >
        {children}
      </TextComponent>
    );
  }
);

Link.displayName = 'Link';
