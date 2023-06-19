import { Text } from 'react-native';
import { render, screen } from '@testing-library/react-native';
import { borderRadius } from '@cbhq/cds-common/tokens/borderRadius';

import { Tag } from '../Tag';

describe('Tag', () => {
  const TEST_ID = 'cds-tag-test';
  it('should render text', () => {
    render(
      <Tag colorScheme="blue">
        <Text>Tag</Text>
      </Tag>,
    );
    expect(screen.getByText('Tag')).toBeDefined();
  });

  it('attaches testId', () => {
    render(
      <Tag colorScheme="blue" testID={TEST_ID}>
        <Text>Tag</Text>
      </Tag>,
    );
    expect(screen.getByTestId(TEST_ID)).toBeDefined();
  });

  it('check Tag passes a11y', () => {
    render(
      <Tag colorScheme="blue" testID={TEST_ID}>
        <Text>Tag</Text>
      </Tag>,
    );
    expect(screen.getByTestId(TEST_ID)).toBeAccessible();
  });

  it('set small border-radius when intent is informational', () => {
    render(
      <Tag colorScheme="blue" testID={TEST_ID}>
        <Text>Tag</Text>
      </Tag>,
    );
    expect(screen.getByTestId(TEST_ID)).toHaveStyle({
      borderRadius: borderRadius.roundedSmall,
    });
  });

  it('set full border-radius when intent is promotional', () => {
    render(
      <Tag colorScheme="blue" testID={TEST_ID} intent="promotional">
        <Text>Tag</Text>
      </Tag>,
    );
    expect(screen.getByTestId(TEST_ID)).toHaveStyle({
      borderRadius: borderRadius.roundedFull,
    });
  });

  it('can set different color scheme', () => {
    render(
      <Tag colorScheme="red" testID={TEST_ID}>
        <Text>Tag</Text>
      </Tag>,
    );
    expect(screen.getByTestId(TEST_ID)).toHaveStyle({
      backgroundColor: 'rgba(255,245,246,1)', // red
    });
  });
});
