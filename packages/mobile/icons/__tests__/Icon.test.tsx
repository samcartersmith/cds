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
});
