import { render, screen } from '@testing-library/react';
import { CellScaleDensity } from '@cbhq/cds-common/tokens/cell';
import glyphMap from '@cbhq/cds-icons/__generated__/glyphMap';
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

  it('icon passes accessibility', async () => {
    expect(await renderA11y(<CellMedia type="icon" name="arrowUp" />)).toHaveNoViolations();
  });

  it('asset passes accessibility', async () => {
    expect(
      await renderA11y(<CellMedia type="asset" source="some/image/path" />),
    ).toHaveNoViolations();
  });

  it('avatar passes accessibility', async () => {
    expect(
      await renderA11y(<CellMedia type="avatar" source="some/image/path" />),
    ).toHaveNoViolations();
  });

  it('image passes accessibility', async () => {
    expect(
      await renderA11y(<CellMedia type="image" source="some/image/path" />),
    ).toHaveNoViolations();
  });

  it('pictogram passes accessibility', async () => {
    expect(
      await renderA11y(<CellMedia type="pictogram" illustration={<Pictogram name="2fa" />} />),
    ).toHaveNoViolations();
  });

  it('icon sets an accessible label', () => {
    render(<CellMedia type="icon" name="arrowUp" accessibilityLabel="Icon label" />);

    expect(screen.getByLabelText('Icon label')).toBeVisible();
  });

  it('asset sets an accessible label', () => {
    render(<CellMedia type="asset" source="some/image/path" accessibilityLabel="Asset label" />);

    expect(screen.getByAltText('Asset label')).toBeVisible();
  });

  it('avatar sets an accessible label', () => {
    render(<CellMedia type="avatar" source="some/image/path" accessibilityLabel="Avatar label" />);

    expect(screen.getByAltText('Avatar label')).toBeVisible();
  });

  it('image sets an accessible label', () => {
    render(<CellMedia type="image" source="some/image/path" accessibilityLabel="Image label" />);

    expect(screen.getByAltText('Image label')).toBeVisible();
  });

  it('pictogram sets an accessible label on CellMedia', () => {
    render(
      <CellMedia
        type="pictogram"
        illustration={<Pictogram name="2fa" />}
        accessibilityLabel="Pictogram label"
      />,
    );

    expect(screen.getByAltText('Pictogram label')).toBeVisible();
  });

  it('pictogram sets an accessible label on Pictogram', () => {
    render(
      <CellMedia type="pictogram" illustration={<Pictogram name="2fa" alt="Pictogram label" />} />,
    );

    expect(screen.getByAltText('Pictogram label')).toBeVisible();
  });

  it('pictogram CellMedia accessible label overrides Pictogram accessible label', () => {
    render(
      <CellMedia
        type="pictogram"
        illustration={<Pictogram name="2fa" alt="Pictogram label" />}
        accessibilityLabel="CellMedia label"
      />,
    );

    expect(screen.getByAltText('CellMedia label')).toBeVisible();
  });

  it('renders an icon', () => {
    render(<CellMedia type="icon" name="arrowUp" />);

    expect(screen.getByText(glyphMap['ui-arrowUp-16'])).toBeVisible();
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

      expect(screen.getByText(glyphMap['ui-arrowUp-16'])).toHaveStyle({ fontSize: '16px' });
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
          illustration={<Pictogram name="2fa" dimension="64x64" scaleMultiplier={2} />}
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

      expect(screen.getByText(glyphMap['ui-arrowUp-12'])).toHaveStyle({ fontSize: '12px' });
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
          illustration={<Pictogram name="2fa" dimension="64x64" scaleMultiplier={2} />}
        />,
      );
      const image = screen.getByRole('img');

      expect(image).toHaveAttribute('width', '40.032');
      expect(image).toHaveAttribute('height', '40.032');
    });
  });
});
