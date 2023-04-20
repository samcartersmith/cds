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
  afterEach(() => {
    useScaleConditionalSpy.mockReset();
  });

  afterAll(() => {
    useScaleConditionalSpy.mockRestore();
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
            <Pictogram name="2fa" testID="pictogram-id" dimension="96x96" scaleMultiplier={2} />
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
            <Pictogram name="2fa" testID="pictogram-id" dimension="96x96" scaleMultiplier={2} />
          }
        />,
      );

      expect(screen.getByTestId('pictogram-id')).toHaveStyle({ width: 40, height: 40 });
    });
  });
});
