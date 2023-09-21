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
    render(<CellMedia type="icon" name="arrowUp" testID="cell-media-id" />);

    expect(screen.getByTestId('cell-media-id')).toBeAccessible();
  });

  it('asset passes accessibility', () => {
    render(<CellMedia type="asset" source="some/image/path" testID="cell-media-id" />);

    expect(screen.getByTestId('cell-media-id')).toBeAccessible();
  });

  it('avatar passes accessibility', () => {
    render(<CellMedia type="avatar" source="some/image/path" testID="cell-media-id" />);

    expect(screen.getByTestId('cell-media-id')).toBeAccessible();
  });

  it('image passes accessibility', () => {
    render(<CellMedia type="image" source="some/image/path" testID="cell-media-id" />);

    expect(screen.getByTestId('cell-media-id')).toBeAccessible();
  });

  it('pictogram passes accessibility', () => {
    render(
      <CellMedia type="pictogram" illustration={<Pictogram name="2fa" />} testID="cell-media-id" />,
    );

    expect(screen.getByTestId('cell-media-id')).toBeAccessible();
  });

  it('icon sets an accessible label', () => {
    render(
      <CellMedia
        type="icon"
        name="arrowUp"
        accessibilityLabel="Icon label"
        accessibilityHint="Icon hint"
      />,
    );

    expect(screen.getByLabelText('Icon label')).toBeTruthy();
    expect(screen.getByHintText('Icon hint')).toBeTruthy();
  });

  it('asset sets an accessible label', () => {
    render(
      <CellMedia
        type="asset"
        source="some/image/path"
        accessibilityLabel="Asset label"
        accessibilityHint="Asset hint"
      />,
    );

    expect(screen.getByLabelText('Asset label')).toBeTruthy();
    expect(screen.getByHintText('Asset hint')).toBeTruthy();
  });

  it('avatar sets an accessible label', () => {
    render(
      <CellMedia
        type="avatar"
        source="some/image/path"
        accessibilityLabel="Avatar label"
        accessibilityHint="Avatar hint"
      />,
    );

    expect(screen.getByLabelText('Avatar label')).toBeTruthy();
    expect(screen.getByHintText('Avatar hint')).toBeTruthy();
  });

  it('image sets an accessible label', () => {
    render(
      <CellMedia
        type="image"
        source="some/image/path"
        accessibilityLabel="Image label"
        accessibilityHint="Image hint"
      />,
    );

    expect(screen.getByLabelText('Image label')).toBeTruthy();
    expect(screen.getByHintText('Image hint')).toBeTruthy();
  });

  it('pictogram sets an accessible label on CellMedia', () => {
    render(
      <CellMedia
        type="pictogram"
        illustration={<Pictogram name="2fa" />}
        accessibilityLabel="Pictogram label"
        accessibilityHint="Pictogram hint"
      />,
    );

    expect(screen.getByLabelText('Pictogram label')).toBeTruthy();
    expect(screen.getByHintText('Pictogram hint')).toBeTruthy();
  });

  it('pictogram sets an accessible label on Pictogram', () => {
    render(
      <CellMedia
        type="pictogram"
        illustration={
          <Pictogram
            name="2fa"
            accessibilityLabel="Pictogram label"
            accessibilityHint="Pictogram hint"
          />
        }
      />,
    );

    expect(screen.getByLabelText('Pictogram label')).toBeTruthy();
    expect(screen.getByHintText('Pictogram hint')).toBeTruthy();
  });

  it('pictogram CellMedia accessible labels override Pictogram accessible labels', () => {
    render(
      <CellMedia
        type="pictogram"
        illustration={
          <Pictogram
            name="2fa"
            accessibilityLabel="Pictogram label"
            accessibilityHint="Pictogram hint"
          />
        }
        accessibilityLabel="CellMedia label"
        accessibilityHint="CellMedia hint"
      />,
    );

    expect(screen.getByLabelText('CellMedia label')).toBeTruthy();
    expect(screen.getByHintText('CellMedia hint')).toBeTruthy();
  });

  it('renders an icon', () => {
    render(<CellMedia type="icon" name="arrowUp" />);

    expect(screen.getByText(glyphMap['ui-arrowUp-16'])).toBeTruthy();
  });

  it('renders an asset', () => {
    render(<CellMedia type="asset" source="some/image/path" />);
    const image = screen.getByRole('image');

    expect(image).toHaveProp('source', { cache: undefined, uri: 'some/image/path' });
    expect(image).toHaveStyle({ borderRadius: 1000 });
  });

  it('renders an avatar', () => {
    render(<CellMedia type="avatar" source="some/image/path" />);
    const image = screen.getByRole('image');

    expect(image).toHaveProp('source', { cache: undefined, uri: 'some/image/path' });
    expect(image).toHaveStyle({ borderRadius: 1000 });
  });

  it('renders an image', () => {
    render(<CellMedia type="image" source="some/image/path" />);
    const image = screen.getByRole('image');

    expect(image).toHaveProp('source', { cache: undefined, uri: 'some/image/path' });
    expect(image).toHaveStyle({ borderRadius: 8 });
  });

  it('renders a pictogram', () => {
    render(
      <CellMedia type="pictogram" illustration={<Pictogram name="2fa" testID="pictogram-id" />} />,
    );

    expect(screen.getByTestId('pictogram-id')).toBeTruthy();
  });

  describe('at normal scale', () => {
    it('sets icon size', () => {
      render(<CellMedia type="icon" name="arrowUp" />);

      expect(screen.getByRole('image')).toHaveStyle({ width: 16, height: 16 });
    });

    it('sets asset size', () => {
      render(<CellMedia type="asset" source="some/image/path" />);

      expect(screen.getByRole('image')).toHaveStyle({ width: 32, height: 32 });
    });

    it('sets avatar size', () => {
      render(<CellMedia type="avatar" source="some/image/path" />);

      expect(screen.getByRole('image')).toHaveStyle({ width: 32, height: 32 });
    });

    it('sets image size', () => {
      render(<CellMedia type="image" source="some/image/path" />);

      expect(screen.getByRole('image')).toHaveStyle({ width: 48, height: 48 });
    });

    it('sets pictogram size', () => {
      render(
        <CellMedia
          type="pictogram"
          illustration={<Pictogram name="2fa" testID="pictogram-id" />}
        />,
      );

      expect(screen.getByTestId('pictogram-id')).toHaveStyle({ width: 48, height: 48 });
    });

    it('sets pictogram size and cannot be overridden by Pictogram props', () => {
      render(
        <CellMedia
          type="pictogram"
          illustration={
            <Pictogram name="2fa" testID="pictogram-id" dimension="64x64" scaleMultiplier={2} />
          }
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
      render(<CellMedia type="icon" name="arrowUp" />);

      expect(screen.getByRole('image')).toHaveStyle({ width: 12, height: 12 });
    });

    it('sets asset size', () => {
      render(<CellMedia type="asset" source="some/image/path" />);

      expect(screen.getByRole('image')).toHaveStyle({ width: 24, height: 24 });
    });

    it('sets avatar size', () => {
      render(<CellMedia type="avatar" source="some/image/path" />);

      expect(screen.getByRole('image')).toHaveStyle({ width: 24, height: 24 });
    });

    it('sets image size', () => {
      render(<CellMedia type="image" source="some/image/path" />);

      expect(screen.getByRole('image')).toHaveStyle({ width: 40, height: 40 });
    });

    it('sets pictogram size', () => {
      render(
        <CellMedia
          type="pictogram"
          illustration={<Pictogram name="2fa" testID="pictogram-id" />}
        />,
      );

      expect(screen.getByTestId('pictogram-id')).toHaveStyle({ width: 40, height: 40 });
    });

    it('sets pictogram size and cannot be overridden by Pictogram props', () => {
      render(
        <CellMedia
          type="pictogram"
          illustration={
            <Pictogram name="2fa" testID="pictogram-id" dimension="64x64" scaleMultiplier={2} />
          }
        />,
      );

      expect(screen.getByTestId('pictogram-id')).toHaveStyle({ width: 40, height: 40 });
    });
  });
});
