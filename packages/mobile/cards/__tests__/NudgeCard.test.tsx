import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react-native';
import { NoopFn as noopFn } from '@cbhq/cds-common/utils/mockUtils';
import { PictogramName } from '@cbhq/cds-illustrations';

import { NudgeCard as BaseNudgeCard, NudgeCardProps } from '../NudgeCard';

const exampleProps = {
  title: "It's Onchain Summer!",
  description: 'Stand with crypto and mint your NFT.',
  pictogram: 'ethStaking' as PictogramName,
  action: 'Join the movement',
  onActionPress: noopFn,
  testID: 'nudge-card-test',
};

const NudgeCard = (props: Partial<Pick<NudgeCardProps, 'onDismissPress' | 'onActionPress'>>) => (
  <BaseNudgeCard {...exampleProps} {...props} />
);

describe('createNudgeCard', () => {
  it('passes accessibility', () => {
    render(<NudgeCard />);
    expect(screen.getByTestId(exampleProps.testID)).toBeAccessible();
  });

  it('passes accessibility when dismissable', () => {
    render(<NudgeCard />);
    expect(screen.getByTestId(exampleProps.testID)).toBeAccessible();
  });

  it('renders the card with the correct title', () => {
    render(<NudgeCard />);

    expect(screen.getByText(exampleProps.title)).toBeDefined();
  });

  it('renders the card with the correct description', () => {
    render(<NudgeCard />);

    expect(screen.getByText(exampleProps.description)).toBeDefined();
  });

  it('renders the card with the correct action', () => {
    render(<NudgeCard />);

    expect(screen.getByText(exampleProps.action)).toBeDefined();
  });

  it('calls the onActionPress function when the action button is pressed', () => {
    const onActionPress = jest.fn();
    render(<NudgeCard onActionPress={onActionPress} />);

    fireEvent.press(screen.getByText(exampleProps.action));

    expect(onActionPress).toHaveBeenCalled();
  });

  it('renders the dismiss button when onDismissPress is provided', () => {
    render(<NudgeCard onDismissPress={noopFn} />);

    expect(screen.getByTestId(`${exampleProps.testID}-dismiss-button`)).toBeVisible();
  });

  it('calls the onDismissPress function when the dismiss button is pressed', () => {
    const onDismissPress = jest.fn();
    render(<NudgeCard onDismissPress={onDismissPress} />);

    fireEvent.press(screen.getByTestId(`${exampleProps.testID}-dismiss-button`));

    expect(onDismissPress).toHaveBeenCalled();
  });
});
