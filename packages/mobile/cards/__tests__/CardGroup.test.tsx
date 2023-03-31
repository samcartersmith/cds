import { render, screen } from '@testing-library/react-native';

import { AnnouncementCard } from '../../alpha/AnnouncementCard';
import { FeatureFlagProvider } from '../../system';
import { CardGroup } from '../CardGroup';

describe('CardGroup.test', () => {
  it('passes a11y', () => {
    render(
      <CardGroup testID="mock-card-group">
        <AnnouncementCard title="Item1 title" description="Item1 description" />
        <AnnouncementCard title="Item2 title" description="Item2 description" />
      </CardGroup>,
    );
    expect(screen.getByTestId('mock-card-group')).toBeAccessible();
  });

  it('renders children', () => {
    render(
      <CardGroup>
        <AnnouncementCard title="Item1 title" description="Item1 description" />
        <AnnouncementCard title="Item2 title" description="Item2 description" />
      </CardGroup>,
    );

    expect(screen.getByText('Item1 title')).toBeTruthy();
    expect(screen.getByText('Item1 description')).toBeTruthy();
    expect(screen.getByText('Item2 title')).toBeTruthy();
    expect(screen.getByText('Item2 description')).toBeTruthy();
  });

  it('renders horizontal group', () => {
    render(
      <CardGroup direction="horizontal">
        <AnnouncementCard title="Item1 title" description="Item1 description" />
        <AnnouncementCard title="Item2 title" description="Item2 description" />
      </CardGroup>,
    );

    expect(screen.getByText('Item1 title')).toBeTruthy();
    expect(screen.getByText('Item1 description')).toBeTruthy();
    expect(screen.getByText('Item2 title')).toBeTruthy();
    expect(screen.getByText('Item2 description')).toBeTruthy();
  });

  it('renders frontier', () => {
    render(
      <FeatureFlagProvider frontierCard>
        <CardGroup>
          <AnnouncementCard title="Item1 title" description="Item1 description" />
          <AnnouncementCard title="Item2 title" description="Item2 description" />
        </CardGroup>
      </FeatureFlagProvider>,
    );

    expect(screen.getByText('Item1 title')).toBeTruthy();
    expect(screen.getByText('Item1 description')).toBeTruthy();
    expect(screen.getByText('Item2 title')).toBeTruthy();
    expect(screen.getByText('Item2 description')).toBeTruthy();
  });
});
