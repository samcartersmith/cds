import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { renderA11y } from '@cbhq/cds-web-utils';

import { ContainedAssetCard } from '../ContainedAssetCard';

const DummyHeader = () => <div>Header</div>;

describe('ContainedAssetCard', () => {
  it('renders title, description and subtitle', () => {
    render(
      <ContainedAssetCard
        description="Description"
        header={<DummyHeader />}
        subtitle="Subtitle"
        title="Title"
      />,
    );

    expect(screen.getByText('Title')).toBeTruthy();
    expect(screen.getByText('Description')).toBeTruthy();
    expect(screen.getByText('Subtitle')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const onPress = jest.fn();
    render(
      <ContainedAssetCard header={<DummyHeader />} onPress={onPress} testID="card" title="Title" />,
    );

    fireEvent.click(screen.getByTestId('card'));

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('passes accessibility', async () => {
    expect(
      await renderA11y(
        <ContainedAssetCard
          description="Description"
          header={<DummyHeader />}
          subtitle="Subtitle"
          title="Title"
        />,
      ),
    ).toHaveNoViolations();
  });

  it('renders default width style', () => {
    render(
      <ContainedAssetCard
        description="Description"
        header={<DummyHeader />}
        subtitle="Subtitle"
        testID="card"
        title="Title"
      />,
    );

    expect(screen.getByTestId('card')).toHaveStyle({ maxWidth: '156px', minWidth: '156px' });
  });

  it('renders custom width correctly', () => {
    render(
      <ContainedAssetCard
        description="Description"
        header={<DummyHeader />}
        maxWidth="none"
        minWidth={120}
        subtitle="Subtitle"
        testID="card"
        title="Title"
      />,
    );

    expect(screen.getByTestId('card')).toHaveStyle({ maxWidth: 'none', minWidth: '120px' });
  });
});
