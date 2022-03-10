import { render } from '@testing-library/react-native';
import { View, Text } from 'react-native';

import { Button } from '../../buttons';
import { CellMedia } from '../CellMedia';
import { ListCell } from '../ListCell';

describe('ListCell', () => {
  it('renders a title', () => {
    const result = render(
      <ListCell
        title={
          <View testID="title">
            <Text>Title</Text>
          </View>
        }
      />,
    );

    expect(result.queryByTestId('title')).not.toBeNull();
  });

  it('renders a description', () => {
    const result = render(
      <ListCell
        description={
          <View testID="description">
            <Text>Description</Text>
          </View>
        }
      />,
    );

    expect(result.queryByTestId('description')).not.toBeNull();
  });

  it('renders a detail', () => {
    const result = render(
      <ListCell
        detail={
          <View testID="detail">
            <Text>Detail</Text>
          </View>
        }
      />,
    );

    expect(result.queryByTestId('detail')).not.toBeNull();
  });

  it('renders a subdetail', () => {
    const result = render(
      <ListCell
        title="Title"
        subdetail={
          <View testID="subdetail">
            <Text>Subdetail</Text>
          </View>
        }
      />,
    );

    expect(result.queryByTestId('subdetail')).not.toBeNull();
  });

  it('renders media', () => {
    const result = render(<ListCell media={<CellMedia type="icon" name="add" testID="media" />} />);

    expect(result.queryByTestId('media')).not.toBeNull();
  });

  it('renders an accessory', () => {
    const result = render(<ListCell accessory="arrow" />);

    expect(result.queryByTestId('accessory')).not.toBeNull();
  });

  it('renders an action', () => {
    const button = <Button testID="button">Test</Button>;
    const result = render(<ListCell action={button} />);

    expect(result.queryByTestId('button')).not.toBeNull();
  });

  it('renders empty strings without crashing', () => {
    const result = render(<ListCell title="" description="" detail="" subdetail="" action="" />);

    expect(result).not.toBeNull();
  });
});
