import { Text, View } from 'react-native';
import { render } from '@testing-library/react-native';

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
    const result = render(
      <ContentCell
        title={
          <View testID="title">
            <Text>Title</Text>
          </View>
        }
      />,
    );

    expect(result.queryByTestId('title')).not.toBeNull();
  });

  it('renders a subtitle', () => {
    const result = render(
      <ContentCell
        subtitle={
          <View testID="subtitle">
            <Text>Subtitle</Text>
          </View>
        }
      />,
    );

    expect(result.queryByTestId('subtitle')).not.toBeNull();
  });

  it('renders a description', () => {
    const result = render(
      <ContentCell
        description={
          <View testID="description">
            <Text>Description</Text>
          </View>
        }
      />,
    );

    expect(result.queryByTestId('description')).not.toBeNull();
  });

  it('renders meta', () => {
    const result = render(
      <ContentCell
        title="Title"
        meta={
          <View testID="meta">
            <Text>Meta</Text>
          </View>
        }
      />,
    );

    expect(result.queryByTestId('meta')).not.toBeNull();
  });

  it('renders media', () => {
    const result = render(
      <ContentCell media={<CellMedia type="icon" name="add" testID="media" />} />,
    );

    expect(result.queryByTestId('media')).not.toBeNull();
  });

  it('renders an accessory', () => {
    const result = render(<ContentCell accessory="arrow" />);

    expect(result.queryByTestId('accessory')).not.toBeNull();
  });

  it('renders empty strings without crashing', () => {
    const result = render(<ContentCell title="" subtitle="" description="" meta="" />);

    expect(result).not.toBeNull();
  });
});
