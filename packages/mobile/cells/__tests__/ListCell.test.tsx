import { Text, View } from 'react-native';
import { render, screen } from '@testing-library/react-native';

import { Button } from '../../buttons';
import { CellMedia } from '../CellMedia';
import { ListCell } from '../ListCell';

describe('ListCell', () => {
  it('renders a title', () => {
    render(
      <ListCell
        title={
          <View testID="title">
            <Text>Title</Text>
          </View>
        }
      />,
    );

    expect(screen.getByTestId('title')).not.toBeNull();
  });

  it('renders a description', () => {
    render(
      <ListCell
        description={
          <View testID="description">
            <Text>Description</Text>
          </View>
        }
      />,
    );

    expect(screen.getByTestId('description')).not.toBeNull();
  });

  it('renders a detail', () => {
    render(
      <ListCell
        detail={
          <View testID="detail">
            <Text>Detail</Text>
          </View>
        }
      />,
    );

    expect(screen.getByTestId('detail')).not.toBeNull();
  });

  it('renders a subdetail', () => {
    render(
      <ListCell
        title="Title"
        subdetail={
          <View testID="subdetail">
            <Text>Subdetail</Text>
          </View>
        }
      />,
    );

    expect(screen.getByTestId('subdetail')).not.toBeNull();
  });

  it('renders media', () => {
    render(<ListCell media={<CellMedia type="icon" name="add" testID="media" />} />);

    expect(screen.getByTestId('media')).not.toBeNull();
  });

  it('renders an accessory', () => {
    render(<ListCell accessory="arrow" />);

    expect(screen.getByTestId('accessory')).not.toBeNull();
  });

  it('renders an action', () => {
    const button = <Button testID="button">Test</Button>;
    render(<ListCell action={button} />);

    expect(screen.getByTestId('button')).not.toBeNull();
  });

  it('renders empty strings without crashing', () => {
    render(<ListCell title="" description="" detail="" subdetail="" action="" />);

    expect(screen.container).not.toBeNull();
  });
});
