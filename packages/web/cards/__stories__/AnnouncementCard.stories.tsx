import announcementCardBuilder, {
  createConfigs,
} from '@cbhq/cds-common/internal/cards/announcementCardBuilder';

import { AnnouncementCard } from '../AnnouncementCard';
import { CardGroup, CardGroupRenderItem } from '../CardGroup';

const renderHorizontalItem: CardGroupRenderItem = ({ item, Wrapper }) => (
  <Wrapper display="flex" width={250}>
    {item}
  </Wrapper>
);

const { defaultItem, vertical, horizontal } = createConfigs({
  CardGroup,
  renderHorizontalItem,
});

const { build, buildSheet } = announcementCardBuilder(AnnouncementCard);

export const Default = build(...defaultItem);
export const Vertical = buildSheet(...vertical);
export const Horizontal = buildSheet(...horizontal);

export default {
  title: 'Core Components/Cards/AnnouncementCard',
  component: AnnouncementCard,
};
