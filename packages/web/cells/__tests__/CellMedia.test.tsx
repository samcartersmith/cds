import { render, screen } from '@testing-library/react';
import { CellScaleDensity } from '@cbhq/cds-common/tokens/cell';
import { renderA11y } from '@cbhq/cds-web-utils/jest';

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

  it('passes accessibility', async () => {
    expect(
      await renderA11y(<CellMedia type="asset" source="some/image/path" title="Test" />),
    ).toHaveNoViolations();
  });

  it('renders an icon', () => {
    render(<CellMedia type="icon" name="arrowUp" />);

    expect(screen.getByTestId('icon-base-glyph')).toHaveAttribute('data-icon-name', 'arrowUp');
  });

  it('renders an asset', () => {
    render(<CellMedia type="asset" source="some/image/path" />);
    const image = screen.getByRole('img');

    expect(image).toHaveAttribute('src', 'some/image/path');
    expect(image).toHaveStyle({ borderRadius: '1000px' });
  });

  it('renders an avatar', () => {
    render(<CellMedia type="avatar" source="some/image/path" />);
    const image = screen.getByRole('img');

    expect(image).toHaveAttribute('src', 'some/image/path');
    expect(image).toHaveStyle({ borderRadius: '1000px' });
  });

  it('renders an image', () => {
    render(<CellMedia type="image" source="some/image/path" />);
    const image = screen.getByRole('img');

    expect(image).toHaveAttribute('src', 'some/image/path');
    expect(image).toHaveStyle({ borderRadius: '8px' });
  });

  it('renders a pictogram', () => {
    render(<CellMedia type="pictogram" illustration={<Pictogram name="2fa" />} />);

    expect(screen.getByRole('img')).toHaveAttribute('src', expect.stringContaining('2fa'));
  });

  describe('at normal scale', () => {
    it('sets icon size', () => {
      render(<CellMedia type="icon" name="arrowUp" />);

      expect(screen.getByTestId('icon-base-glyph')).toHaveStyle({ fontSize: '16px' });
    });

    it('sets asset size', () => {
      render(<CellMedia type="asset" source="some/image/path" />);
      const image = screen.getByRole('img');

      expect(image).toHaveAttribute('width', '32');
      expect(image).toHaveAttribute('height', '32');
    });

    it('sets avatar size', () => {
      render(<CellMedia type="avatar" source="some/image/path" />);
      const image = screen.getByRole('img');

      expect(image).toHaveAttribute('width', '32');
      expect(image).toHaveAttribute('height', '32');
    });

    it('sets image size', () => {
      render(<CellMedia type="image" source="some/image/path" />);
      const image = screen.getByRole('img');

      expect(image).toHaveAttribute('width', '48');
      expect(image).toHaveAttribute('height', '48');
    });

    it('sets pictogram size', () => {
      render(<CellMedia type="pictogram" illustration={<Pictogram name="2fa" />} />);
      const image = screen.getByRole('img');

      expect(image).toHaveAttribute('width', '48');
      expect(image).toHaveAttribute('height', '48');
    });

    it('sets pictogram size and cannot be overridden by Pictogram props', () => {
      render(
        <CellMedia
          type="pictogram"
          illustration={<Pictogram name="2fa" dimension="96x96" scaleMultiplier={2} />}
        />,
      );
      const image = screen.getByRole('img');

      expect(image).toHaveAttribute('width', '48');
      expect(image).toHaveAttribute('height', '48');
    });
  });

  describe('at dense scale', () => {
    beforeEach(() => {
      useScaleConditionalSpy.mockImplementation((config) => config.dense);
    });

    it('sets icon size', () => {
      render(<CellMedia type="icon" name="arrowUp" />);

      expect(screen.getByTestId('icon-base-glyph')).toHaveStyle({ fontSize: '12px' });
    });

    it('sets asset size', () => {
      render(<CellMedia type="asset" source="some/image/path" />);
      const image = screen.getByRole('img');

      expect(image).toHaveAttribute('width', '24');
      expect(image).toHaveAttribute('height', '24');
    });

    it('sets avatar size', () => {
      render(<CellMedia type="avatar" source="some/image/path" />);
      const image = screen.getByRole('img');

      expect(image).toHaveAttribute('width', '24');
      expect(image).toHaveAttribute('height', '24');
    });

    it('sets image size', () => {
      render(<CellMedia type="image" source="some/image/path" />);
      const image = screen.getByRole('img');

      expect(image).toHaveAttribute('width', '40');
      expect(image).toHaveAttribute('height', '40');
    });

    it('sets pictogram size', () => {
      render(<CellMedia type="pictogram" illustration={<Pictogram name="2fa" />} />);
      const image = screen.getByRole('img');

      expect(image).toHaveAttribute('width', '40.032');
      expect(image).toHaveAttribute('height', '40.032');
    });

    it('sets pictogram size and cannot be overridden by Pictogram props', () => {
      render(
        <CellMedia
          type="pictogram"
          illustration={<Pictogram name="2fa" dimension="96x96" scaleMultiplier={2} />}
        />,
      );
      const image = screen.getByRole('img');

      expect(image).toHaveAttribute('width', '40.032');
      expect(image).toHaveAttribute('height', '40.032');
    });
  });
});
