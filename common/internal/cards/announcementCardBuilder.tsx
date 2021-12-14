import React from 'react';
import { GroupBaseProps, RenderGroupItem } from '../../types';
import { storyBuilder } from '../utils/storyBuilder';
import { assets } from '../data/assets';

type Params<WrapperProps> = {
  CardGroup: React.ComponentType<GroupBaseProps<WrapperProps>>;
  renderHorizontalItem: RenderGroupItem<WrapperProps>;
};

// eslint-disable-next-line no-console
const onPressConsole = () => console.log('pressed');

export function createConfigs<WrapperProps>({
  CardGroup,
  renderHorizontalItem,
}: Params<WrapperProps>) {
  const defaultItem = {
    title: 'Introducing SHIB',
    description: 'Shiba Inu (SHIB) is now on Coinbase',
    pictogram: 'worldwide',
    headerDescription: 'Actor name',
    headerMetaData: 'Metadata',
    headerAvatarUrl: assets.btc.imageUrl,
    headerAction: 'more',
    footerAction: 'View asset',
    onHeaderActionPress: onPressConsole,
    onFooterActionPress: onPressConsole,
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
