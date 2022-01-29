import featureEntryCardBuilder, {
  createConfigs,
} from '@cbhq/cds-common/internal/cards/featureEntryCardBuilder';

import { CardGroup, CardGroupRenderItem } from '../CardGroup';
import { FeatureEntryCard } from '../FeatureEntryCard';

const renderHorizontalItem: CardGroupRenderItem = ({ item, Wrapper }) => (
  <Wrapper display="flex" width={250}>
    {item}
  </Wrapper>
);

const { defaultItem, vertical, horizontal } = createConfigs({
  CardGroup,
  renderHorizontalItem,
});

const { build, buildSheet } = featureEntryCardBuilder(FeatureEntryCard);

export const Default = build(...defaultItem);
export const Vertical = buildSheet(...vertical);
export const Horizontal = buildSheet(...horizontal);

export default {
  title: 'Core Components/Cards/FeatureEntryCard',
  component: FeatureEntryCard,
};
