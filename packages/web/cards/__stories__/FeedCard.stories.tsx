import feedCardBuilder, { createConfigs } from '@cbhq/cds-common/internal/cards/feedCardBuilder';

import { Button } from '../../buttons/Button';
import { IconButton } from '../../buttons/IconButton';
import { CardGroup, CardGroupRenderItem } from '../CardGroup';
import { FeedCard } from '../FeedCard';

const renderHorizontalItem: CardGroupRenderItem = ({ item, Wrapper }) => (
  <Wrapper display="flex" width={250}>
    {item}
  </Wrapper>
);

const { defaultItem, vertical, horizontal } = createConfigs({
  Button,
  CardGroup,
  IconButton,
  renderHorizontalItem,
});
const { build, buildSheet } = feedCardBuilder(FeedCard);

export const Default = build(...defaultItem);
export const Vertical = buildSheet(...vertical);
export const Horizontal = buildSheet(...horizontal);

export default {
  title: 'Core Components/Cards/FeedCard',
  component: FeedCard,
};
