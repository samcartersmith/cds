import React from 'react';

import {
  ButtonBaseProps,
  GroupBaseProps,
  IconButtonBaseProps,
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

const onPressConsole = () => console.log('pressed');

export function createConfigs<WrapperProps, PressFn>({
  Button,
  CardGroup,
  IconButton,
  renderHorizontalItem,
}: CreateFeedCardSheetParams<WrapperProps, PressFn>) {
  const exampleProps = {
    avatarUrl: 'https://images.coinbase.com/avatar?s=350',
    headerDescription: 'Earn crypto',
    headerActionNode: <IconButton name="more" variant="foregroundMuted" transparent />,
    bodyTitle: 'LEARN AMP. EARN $3 IN AMP.',
    bodyDescription:
      'Amp is an Ethereum token that can be used as collateral to provide instant settlement assurance any time value is transferred.',
    bodyMediaUrl: 'https://static-assets.coinbase.com/card/introduction/v2/initial_funding.png',
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

  const sheet = [exampleProps, exampleProps, exampleProps] as const;

  return {
    exampleProps,
    defaultItem: [
      exampleProps,
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
