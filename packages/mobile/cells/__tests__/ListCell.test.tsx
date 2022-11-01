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

  it('ListCell with title passes a11y', () => {
    render(
      <ListCell
        testID="listcell-with-title"
        title={
          <View testID="title">
            <Text>Title</Text>
          </View>
        }
      />,
    );

    expect(screen.getByTestId('listcell-with-title')).toBeAccessible();
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

  it('passes a11y with description', () => {
    render(
      <ListCell
        testID="listcell-with-description"
        description={
          <View testID="description">
            <Text>Description</Text>
          </View>
        }
      />,
    );
    expect(screen.getByTestId('listcell-with-description')).toBeAccessible();
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

  it('passes a11y for detail ListCell', () => {
    render(
      <ListCell
        testID="listcell-with-detail"
        detail={
          <View testID="detail">
            <Text>Detail</Text>
          </View>
        }
      />,
    );

    expect(screen.getByTestId('listcell-with-detail')).toBeAccessible();
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

  it('passes a11y with subdetail', () => {
    render(
      <ListCell
        testID="listcell-with-subdetail"
        title="Title"
        subdetail={
          <View testID="subdetail">
            <Text>Subdetail</Text>
          </View>
        }
      />,
    );

    expect(screen.getByTestId('listcell-with-subdetail')).toBeAccessible();
  });

  it('renders media', () => {
    render(<ListCell media={<CellMedia type="icon" name="add" testID="media" />} />);

    expect(screen.getByTestId('media')).not.toBeNull();
  });

  it('passes a11y with media', () => {
    render(
      <ListCell
        testID="listcell-with-media"
        media={<CellMedia type="icon" name="add" testID="media" />}
      />,
    );
    expect(screen.getByTestId('listcell-with-media')).toBeAccessible();
  });

  it('renders an accessory', () => {
    render(<ListCell accessory="arrow" />);

    expect(screen.getByTestId('accessory')).not.toBeNull();
  });

  it('passes a11y with accessory', () => {
    render(<ListCell testID="listcell-with-accessory" accessory="arrow" />);
    expect(screen.getByTestId('listcell-with-accessory')).toBeAccessible();
  });

  it('renders an action', () => {
    const button = <Button testID="button">Test</Button>;
    render(<ListCell action={button} />);

    expect(screen.getByTestId('button')).not.toBeNull();
  });

  it('passes a11y with action', () => {
    render(<ListCell testID="listcell-with-action" accessory="arrow" />);
    expect(screen.getByTestId('listcell-with-action')).toBeAccessible();
  });

  it('renders empty strings without crashing', () => {
    render(<ListCell title="" description="" detail="" subdetail="" action="" />);

    expect(screen.container).not.toBeNull();
  });
});
