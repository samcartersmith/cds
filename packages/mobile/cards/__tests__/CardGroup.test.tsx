import { render } from '@testing-library/react-native';

import { AnnouncementCard } from '../../alpha/AnnouncementCard';
import { FeatureFlagProvider } from '../../system';
import { CardGroup } from '../CardGroup';

describe('CardGroup.test', () => {
  it('renders children', () => {
    const { getByText } = render(
      <CardGroup>
        <AnnouncementCard title="Item1 title" description="Item1 description" />
        <AnnouncementCard title="Item2 title" description="Item2 description" />
      </CardGroup>,
    );

    expect(getByText('Item1 title')).toBeTruthy();
    expect(getByText('Item1 description')).toBeTruthy();
    expect(getByText('Item2 title')).toBeTruthy();
    expect(getByText('Item2 description')).toBeTruthy();
  });

  it('renders horizontal group', () => {
    const { getByText } = render(
      <CardGroup horizontal>
        <AnnouncementCard title="Item1 title" description="Item1 description" />
        <AnnouncementCard title="Item2 title" description="Item2 description" />
      </CardGroup>,
    );

    expect(getByText('Item1 title')).toBeTruthy();
    expect(getByText('Item1 description')).toBeTruthy();
    expect(getByText('Item2 title')).toBeTruthy();
    expect(getByText('Item2 description')).toBeTruthy();
  });

  it('renders frontier', () => {
    const { getByText } = render(
      <FeatureFlagProvider frontierCard>
        <CardGroup>
          <AnnouncementCard title="Item1 title" description="Item1 description" />
          <AnnouncementCard title="Item2 title" description="Item2 description" />
        </CardGroup>
      </FeatureFlagProvider>,
    );

    expect(getByText('Item1 title')).toBeTruthy();
    expect(getByText('Item1 description')).toBeTruthy();
    expect(getByText('Item2 title')).toBeTruthy();
    expect(getByText('Item2 description')).toBeTruthy();
  });
});
