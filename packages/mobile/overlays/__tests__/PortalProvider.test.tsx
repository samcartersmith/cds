import { Text, View } from 'react-native';
import { render } from '@testing-library/react-native';

import { PortalHost } from '../PortalProvider';

describe('PortalProvider.test', () => {
  it('renders single portal node', () => {
    const mockNodes = [{ id: 'node1', element: <View testID="view1" key="node1" /> }];
    const { getByTestId } = render(<PortalHost nodes={mockNodes} />);

    expect(getByTestId('view1')).toBeTruthy();
  });

  it('renders multiple portal nodes', () => {
    const mockNodes = [
      {
        id: 'node1',
        element: (
          <View testID="view1" key="node1">
            <Text>Text1</Text>
          </View>
        ),
      },
      {
        id: 'node2',
        element: (
          <View testID="view2" key="node2">
            <Text>Text2</Text>
          </View>
        ),
      },
    ];

    const { getAllByText } = render(<PortalHost nodes={mockNodes} />);

    expect(getAllByText('Text1')).toHaveLength(1);
    expect(getAllByText('Text2')).toBeTruthy();
  });
});
