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

  it('renders meta', () => {
    render(
      <ContentCell
        title="Title"
        meta={
          <View testID="meta">
            <Text>Meta</Text>
          </View>
        }
      />,
    );

    expect(screen.getByTestId('meta')).not.toBeNull();
  });

  it('renders media', () => {
    render(<ContentCell media={<CellMedia type="icon" name="add" testID="media" />} />);

    expect(screen.getByTestId('media')).not.toBeNull();
  });

  it('renders an accessory', () => {
    render(<ContentCell accessory="arrow" />);

    expect(screen.getByTestId('accessory')).not.toBeNull();
  });

  it('renders empty strings without crashing', () => {
    render(<ContentCell title="" subtitle="" description="" meta="" />);

    expect(screen.container).not.toBeNull();
  });
});
