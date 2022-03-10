import React from 'react';

import { GroupBaseProps, RenderGroupItem } from '../../types';
import { storyBuilder } from '../utils/storyBuilder';

type Params<WrapperProps> = {
  CardGroup: React.ComponentType<GroupBaseProps<WrapperProps>>;
  renderHorizontalItem: RenderGroupItem<WrapperProps>;
};

 
const onPressConsole = () => console.log('pressed');

export function createConfigs<WrapperProps>({
  CardGroup,
  renderHorizontalItem,
}: Params<WrapperProps>) {
  const exampleProps = {
    title: 'Send a crypto gift',
    description: 'Share the gift of crypto this holiday season',
    spotSquare: 'coinbaseCardSparkle',
    action: 'Start gifting today',
    onActionPress: onPressConsole,
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
