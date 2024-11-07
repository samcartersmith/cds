import React from 'react';

import { GroupBaseProps, RenderGroupItem } from '../../types';
import { storyBuilder } from '../utils/storyBuilder';

type CreateFeedCardSheetParams<WrapperProps> = {
  CardGroup: React.ComponentType<React.PropsWithChildren<GroupBaseProps<WrapperProps>>>;
  renderHorizontalItem: RenderGroupItem<WrapperProps>;
};

export function createConfigs<WrapperProps>({
  CardGroup,
  renderHorizontalItem,
}: CreateFeedCardSheetParams<WrapperProps>) {
  const exampleProps = {
    avatar: 'https://images.coinbase.com/avatar?s=350',
    author: 'Earn crypto',
    headerAction: {
      name: 'more',
      variant: 'foregroundMuted',
    },
    title: 'LEARN AMP. EARN $3 IN AMP.',
    description:
      'Amp is an Ethereum token that can be used as collateral to provide instant settlement assurance any time value is transferred.',
    image: 'https://static-assets.coinbase.com/card/introduction/v2/initial_funding.png',
    mediaPlacement: 'above',
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
