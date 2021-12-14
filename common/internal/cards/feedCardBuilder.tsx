import React from 'react';
import {
  ButtonBaseProps,
  IconButtonBaseProps,
  GroupBaseProps,
  NoopFn,
  RenderGroupItem,
} from '../../types';
import { storyBuilder } from '../utils/storyBuilder';

type CreateFeedCardSheetParams<WrapperProps, PressFn> = {
  Button: React.ComponentType<ButtonBaseProps & { onPress?: NoopFn | PressFn }>;
  CardGroup: React.ComponentType<GroupBaseProps<WrapperProps>>;
  IconButton: React.ComponentType<IconButtonBaseProps & { onPress?: NoopFn | PressFn }>;
  renderHorizontalItem: RenderGroupItem<WrapperProps>;
};

// eslint-disable-next-line no-console
const onPressConsole = () => console.log('pressed');

export function createConfigs<WrapperProps, PressFn>({
  Button,
  CardGroup,
  IconButton,
  renderHorizontalItem,
}: CreateFeedCardSheetParams<WrapperProps, PressFn>) {
  const defaultItem = {
    avatarUrl: 'https://via.placeholder.com/350x220',
    headerDescription: 'Earn crypto',
    headerActionNode: <IconButton name="more" variant="foregroundMuted" transparent />,
    bodyTitle: 'LEARN AMP. EARN $3 IN AMP.',
    bodyDescription:
      'Amp is an Ethereum token that can be used as collateral to provide instant settlement assurance any time value is transferred.',
    bodyMediaUrl: 'https://via.placeholder.com/350x220',
    bodyOrientation: 'vertical',
    footerActions: (
      <Button compact variant="secondary" onPress={onPressConsole}>
        Actions
      </Button>
    ),
  } as const;

  const VerticalGroup = CardGroup;
  const HorizontalGroup = (props: GroupBaseProps<WrapperProps>) => (
    <CardGroup {...props} direction="horizontal" renderItem={renderHorizontalItem} />
  );

  const sheet = [defaultItem, defaultItem, defaultItem] as const;

  return {
    defaultItem: [
      defaultItem,
      {
        parameters: {
          wrapper: VerticalGroup,
        },
      },
    ],
    vertical: [
      sheet,
      {
        parameters: {
          wrapper: VerticalGroup,
        },
      },
    ],
    horizontal: [
      sheet,
      {
        parameters: {
          wrapper: HorizontalGroup,
        },
      },
    ],
  } as const;
}

export default storyBuilder();
