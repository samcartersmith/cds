import { Text, View } from 'react-native';
import { render, screen } from '@testing-library/react-native';

import { CellMedia } from '../CellMedia';
import { ContentCell } from '../ContentCell';

describe('ContentCell', () => {
  it('errors if meta is provided without title/subtitle', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation();

    render(<ContentCell meta="Meta" />);

    expect(spy).toHaveBeenCalledWith(
      'ContentCell: Cannot use `meta` without a `title` or `subtitle`.',
    );

    spy.mockRestore();
  });

  it('renders a title', () => {
    render(
      <ContentCell
        title={
          <View testID="title">
            <Text>Title</Text>
          </View>
        }
      />,
    );

    expect(screen.getByTestId('title')).not.toBeNull();
  });

  it('Cell with title passes a11y', () => {
    render(
      <ContentCell
        testID="cell-with-title"
        title={
          <View testID="title">
            <Text>Title</Text>
          </View>
        }
      />,
    );

    expect(screen.getByTestId('cell-with-title')).toBeAccessible();
  });

  it('renders a subtitle', () => {
    render(
      <ContentCell
        subtitle={
          <View testID="subtitle">
            <Text>Subtitle</Text>
          </View>
        }
      />,
    );

    expect(screen.getByTestId('subtitle')).not.toBeNull();
  });
  it('Cell with subtitle passes a11y', () => {
    render(
      <ContentCell
        subtitle={
          <View testID="subtitle">
            <Text>Subtitle</Text>
          </View>
        }
        testID="cell-with-subtitle"
      />,
    );

    expect(screen.getByTestId('cell-with-subtitle')).toBeAccessible();
  });

  it('renders a description', () => {
    render(
      <ContentCell
        description={
          <View testID="description">
            <Text>Description</Text>
          </View>
        }
      />,
    );

    expect(screen.getByTestId('description')).not.toBeNull();
  });
  it('Cell with description passes a11y', () => {
    render(
      <ContentCell
        description={
          <View testID="description">
            <Text>Description</Text>
          </View>
        }
        testID="cell-with-description"
      />,
    );

    expect(screen.getByTestId('cell-with-description')).toBeAccessible();
  });

  it('renders meta', () => {
    render(
      <ContentCell
        meta={
          <View testID="meta">
            <Text>Meta</Text>
          </View>
        }
        title="Title"
      />,
    );

    expect(screen.getByTestId('meta')).not.toBeNull();
  });

  it('Cell with meta passes a11y', () => {
    render(
      <ContentCell
        meta={
          <View testID="meta">
            <Text>Meta</Text>
          </View>
        }
        testID="cell-with-meta"
        title="Title"
      />,
    );

    expect(screen.getByTestId('cell-with-meta')).toBeAccessible();
  });

  it('renders media', () => {
    render(<ContentCell media={<CellMedia name="add" testID="media" type="icon" />} />);

    expect(screen.getByTestId('media')).not.toBeNull();
  });

  it('Cell with media passes a11y', () => {
    render(
      <ContentCell
        media={<CellMedia name="add" testID="media" type="icon" />}
        testID="cell-with-media"
      />,
    );

    expect(screen.getByTestId('cell-with-media')).toBeAccessible();
  });

  it('renders an accessory', () => {
    render(<ContentCell accessory="arrow" />);

    expect(screen.getByTestId('accessory')).not.toBeNull();
  });

  it('Cell with accessory passes a11y', () => {
    render(<ContentCell accessory="arrow" testID="cell-with-accessory" />);

    expect(screen.getByTestId('cell-with-accessory')).toBeAccessible();
  });

  it('renders empty strings without crashing', () => {
    render(<ContentCell description="" meta="" subtitle="" title="" />);

    expect(screen.container).not.toBeNull();
  });
});
