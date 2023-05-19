import { render, screen } from '@testing-library/react-native';

import { Icon, IconProps } from '../Icon';

const testID = 'test-icon';
const IconExample = (props: Omit<IconProps, 'name' | 'size'>) => (
  <Icon name="copy" size="m" {...props} />
);

describe('Icon', () => {
  it('passes accessibility', async () => {
    render(<IconExample testID={testID} />);

    expect(screen.getByTestId(testID)).toBeAccessible();
  });

  it('sets accessibility attributes and labels', () => {
    render(<IconExample accessibilityLabel="An icon label" accessibilityHint="An icon hint" />);

    expect(screen.getByRole('image')).toHaveProp('accessible', true);
    expect(screen.getByLabelText('An icon label')).toBeTruthy();
    expect(screen.getByHintText('An icon hint')).toBeTruthy();
  });
});
