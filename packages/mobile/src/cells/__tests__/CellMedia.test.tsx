import { render, screen } from '@testing-library/react-native';
import { CellScaleDensity } from '@cbhq/cds-common/tokens/cell';
import glyphMap from '@cbhq/cds-icons/__generated__/glyphMap';

import { Pictogram } from '../../illustrations';
import { CellMedia } from '../CellMedia';

const useScaleConditionalSpy = jest.spyOn(
  require('@cbhq/cds-common/scale/useScaleConditional'),
  'useScaleConditional',
) as jest.SpyInstance<number, [CellScaleDensity]>;

describe('CellMedia', () => {
  it('icon passes accessibility', () => {
    render(<CellMedia name="arrowUp" testID="cell-media-id" type="icon" />);

    expect(screen.getByTestId('cell-media-id')).toBeAccessible();
  });

  it('asset passes accessibility', () => {
    render(<CellMedia source="some/image/path" testID="cell-media-id" type="asset" />);

    expect(screen.getByTestId('cell-media-id')).toBeAccessible();
  });

  it('avatar passes accessibility', () => {
    render(<CellMedia source="some/image/path" testID="cell-media-id" type="avatar" />);

    expect(screen.getByTestId('cell-media-id')).toBeAccessible();
  });

  it('image passes accessibility', () => {
    render(<CellMedia source="some/image/path" testID="cell-media-id" type="image" />);

    expect(screen.getByTestId('cell-media-id')).toBeAccessible();
  });

  it('pictogram passes accessibility', () => {
    render(
      <CellMedia illustration={<Pictogram name="2fa" />} testID="cell-media-id" type="pictogram" />,
    );

    expect(screen.getByTestId('cell-media-id')).toBeAccessible();
  });

  it('icon sets an accessible label', () => {
    render(
      <CellMedia
        accessibilityHint="Icon hint"
        accessibilityLabel="Icon label"
        name="arrowUp"
        type="icon"
      />,
    );

    expect(screen.getByLabelText('Icon label')).toBeTruthy();
    expect(screen.getByHintText('Icon hint')).toBeTruthy();
  });

  it('asset sets an accessible label', () => {
    render(
      <CellMedia
        accessibilityHint="Asset hint"
        accessibilityLabel="Asset label"
        source="some/image/path"
        type="asset"
      />,
    );

    expect(screen.getByLabelText('Asset label')).toBeTruthy();
    expect(screen.getByHintText('Asset hint')).toBeTruthy();
  });

  it('avatar sets an accessible label', () => {
    render(
      <CellMedia
        accessibilityHint="Avatar hint"
        accessibilityLabel="Avatar label"
        source="some/image/path"
        type="avatar"
      />,
    );

    expect(screen.getByLabelText('Avatar label')).toBeTruthy();
    expect(screen.getByHintText('Avatar hint')).toBeTruthy();
  });

  it('image sets an accessible label', () => {
    render(
      <CellMedia
        accessibilityHint="Image hint"
        accessibilityLabel="Image label"
        source="some/image/path"
        type="image"
      />,
    );

    expect(screen.getByLabelText('Image label')).toBeTruthy();
    expect(screen.getByHintText('Image hint')).toBeTruthy();
  });

  it('pictogram sets an accessible label on CellMedia', () => {
    render(
      <CellMedia
        accessibilityHint="Pictogram hint"
        accessibilityLabel="Pictogram label"
        illustration={<Pictogram name="2fa" />}
        type="pictogram"
      />,
    );

    expect(screen.getByLabelText('Pictogram label')).toBeTruthy();
    expect(screen.getByHintText('Pictogram hint')).toBeTruthy();
  });

  it('pictogram sets an accessible label on Pictogram', () => {
    render(
      <CellMedia
        illustration={
          <Pictogram
            accessibilityHint="Pictogram hint"
            accessibilityLabel="Pictogram label"
            name="2fa"
          />
        }
        type="pictogram"
      />,
    );

    expect(screen.getByLabelText('Pictogram label')).toBeTruthy();
    expect(screen.getByHintText('Pictogram hint')).toBeTruthy();
  });

  it('pictogram CellMedia accessible labels override Pictogram accessible labels', () => {
    render(
      <CellMedia
        accessibilityHint="CellMedia hint"
        accessibilityLabel="CellMedia label"
        illustration={
          <Pictogram
            accessibilityHint="Pictogram hint"
            accessibilityLabel="Pictogram label"
            name="2fa"
          />
        }
        type="pictogram"
      />,
    );

    expect(screen.getByLabelText('CellMedia label')).toBeTruthy();
    expect(screen.getByHintText('CellMedia hint')).toBeTruthy();
  });

  it('renders an icon', () => {
    render(<CellMedia name="arrowUp" type="icon" />);

    expect(screen.getByText(glyphMap['ui-arrowUp-16'])).toBeTruthy();
  });

  it('renders an asset', () => {
    render(<CellMedia source="some/image/path" type="asset" />);
    const image = screen.getByRole('image');

    expect(image).toHaveProp('source', { cache: undefined, uri: 'some/image/path' });
    expect(image).toHaveStyle({ borderRadius: 1000 });
  });

  it('renders an avatar', () => {
    render(<CellMedia source="some/image/path" type="avatar" />);
    const image = screen.getByRole('image');

    expect(image).toHaveProp('source', { cache: undefined, uri: 'some/image/path' });
    expect(image).toHaveStyle({ borderRadius: 1000 });
  });

  it('renders an image', () => {
    render(<CellMedia source="some/image/path" type="image" />);
    const image = screen.getByRole('image');

    expect(image).toHaveProp('source', { cache: undefined, uri: 'some/image/path' });
    expect(image).toHaveStyle({ borderRadius: 8 });
  });

  it('renders a pictogram', () => {
    render(
      <CellMedia illustration={<Pictogram name="2fa" testID="pictogram-id" />} type="pictogram" />,
    );

    expect(screen.getByTestId('pictogram-id')).toBeTruthy();
  });

  describe('at normal scale', () => {
    it('sets icon size', () => {
      render(<CellMedia name="arrowUp" type="icon" />);

      expect(screen.getByRole('image')).toHaveStyle({ width: 16, height: 16 });
    });

    it('sets asset size', () => {
      render(<CellMedia source="some/image/path" type="asset" />);

      expect(screen.getByRole('image')).toHaveStyle({ width: 32, height: 32 });
    });

    it('sets avatar size', () => {
      render(<CellMedia source="some/image/path" type="avatar" />);

      expect(screen.getByRole('image')).toHaveStyle({ width: 32, height: 32 });
    });

    it('sets image size', () => {
      render(<CellMedia source="some/image/path" type="image" />);

      expect(screen.getByRole('image')).toHaveStyle({ width: 48, height: 48 });
    });

    it('sets pictogram size', () => {
      render(
        <CellMedia
          illustration={<Pictogram name="2fa" testID="pictogram-id" />}
          type="pictogram"
        />,
      );

      expect(screen.getByTestId('pictogram-id')).toHaveStyle({ width: 48, height: 48 });
    });

    it('sets pictogram size and cannot be overridden by Pictogram props', () => {
      render(
        <CellMedia
          illustration={
            <Pictogram dimension="64x64" name="2fa" scaleMultiplier={2} testID="pictogram-id" />
          }
          type="pictogram"
        />,
      );

      expect(screen.getByTestId('pictogram-id')).toHaveStyle({ width: 48, height: 48 });
    });
  });

  describe('at dense scale', () => {
    beforeEach(() => {
      useScaleConditionalSpy.mockImplementation((config) => config.dense);
    });

    it('sets icon size', () => {
      render(<CellMedia name="arrowUp" type="icon" />);

      expect(screen.getByRole('image')).toHaveStyle({ width: 12, height: 12 });
    });

    it('sets asset size', () => {
      render(<CellMedia source="some/image/path" type="asset" />);

      expect(screen.getByRole('image')).toHaveStyle({ width: 24, height: 24 });
    });

    it('sets avatar size', () => {
      render(<CellMedia source="some/image/path" type="avatar" />);

      expect(screen.getByRole('image')).toHaveStyle({ width: 24, height: 24 });
    });

    it('sets image size', () => {
      render(<CellMedia source="some/image/path" type="image" />);

      expect(screen.getByRole('image')).toHaveStyle({ width: 40, height: 40 });
    });

    it('sets pictogram size', () => {
      render(
        <CellMedia
          illustration={<Pictogram name="2fa" testID="pictogram-id" />}
          type="pictogram"
        />,
      );

      expect(screen.getByTestId('pictogram-id')).toHaveStyle({ width: 40, height: 40 });
    });

    it('sets pictogram size and cannot be overridden by Pictogram props', () => {
      render(
        <CellMedia
          illustration={
            <Pictogram dimension="64x64" name="2fa" scaleMultiplier={2} testID="pictogram-id" />
          }
          type="pictogram"
        />,
      );

      expect(screen.getByTestId('pictogram-id')).toHaveStyle({ width: 40, height: 40 });
    });
  });
});
