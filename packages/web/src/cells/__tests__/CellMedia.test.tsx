import { render, screen } from '@testing-library/react';
import { CellScaleDensity } from '@cbhq/cds-common/tokens/cell';
import glyphMap from '@cbhq/cds-icons/__generated__/glyphMap';
import { renderA11y } from '@cbhq/cds-web-utils/jest';

import { Pictogram } from '../../illustrations';
import { CellMedia } from '../CellMedia';

describe('CellMedia', () => {
  beforeEach(() => {
    jest.spyOn(
      require('@cbhq/cds-common/scale/useScaleConditional'),
      'useScaleConditional',
    ) as jest.SpyInstance<number, [CellScaleDensity]>;
  });
  it('icon passes accessibility', async () => {
    expect(await renderA11y(<CellMedia name="arrowUp" type="icon" />)).toHaveNoViolations();
  });

  it('asset passes accessibility', async () => {
    expect(
      await renderA11y(<CellMedia source="some/image/path" type="asset" />),
    ).toHaveNoViolations();
  });

  it('avatar passes accessibility', async () => {
    expect(
      await renderA11y(<CellMedia source="some/image/path" type="avatar" />),
    ).toHaveNoViolations();
  });

  it('image passes accessibility', async () => {
    expect(
      await renderA11y(<CellMedia source="some/image/path" type="image" />),
    ).toHaveNoViolations();
  });

  it('pictogram passes accessibility', async () => {
    expect(
      await renderA11y(<CellMedia illustration={<Pictogram name="2fa" />} type="pictogram" />),
    ).toHaveNoViolations();
  });

  it('icon sets an accessible label', () => {
    render(<CellMedia accessibilityLabel="Icon label" name="arrowUp" type="icon" />);

    expect(screen.getByLabelText('Icon label')).toBeVisible();
  });

  it('asset sets an accessible label', () => {
    render(<CellMedia accessibilityLabel="Asset label" source="some/image/path" type="asset" />);

    expect(screen.getByAltText('Asset label')).toBeVisible();
  });

  it('avatar sets an accessible label', () => {
    render(<CellMedia accessibilityLabel="Avatar label" source="some/image/path" type="avatar" />);

    expect(screen.getByAltText('Avatar label')).toBeVisible();
  });

  it('image sets an accessible label', () => {
    render(<CellMedia accessibilityLabel="Image label" source="some/image/path" type="image" />);

    expect(screen.getByAltText('Image label')).toBeVisible();
  });

  it('pictogram sets an accessible label on CellMedia', () => {
    render(
      <CellMedia
        accessibilityLabel="Pictogram label"
        illustration={<Pictogram name="2fa" />}
        type="pictogram"
      />,
    );

    expect(screen.getByAltText('Pictogram label')).toBeVisible();
  });

  it('pictogram sets an accessible label on Pictogram', () => {
    render(
      <CellMedia illustration={<Pictogram alt="Pictogram label" name="2fa" />} type="pictogram" />,
    );

    expect(screen.getByAltText('Pictogram label')).toBeVisible();
  });

  it('pictogram CellMedia accessible label overrides Pictogram accessible label', () => {
    render(
      <CellMedia
        accessibilityLabel="CellMedia label"
        illustration={<Pictogram alt="Pictogram label" name="2fa" />}
        type="pictogram"
      />,
    );

    expect(screen.getByAltText('CellMedia label')).toBeVisible();
  });

  it('renders an icon', () => {
    render(<CellMedia name="arrowUp" type="icon" />);

    expect(screen.getByText(glyphMap['ui-arrowUp-16'])).toBeVisible();
  });

  it('renders an asset', () => {
    render(<CellMedia source="some/image/path" type="asset" />);
    const image = screen.getByRole('img');

    expect(image).toHaveAttribute('src', 'some/image/path');
    expect(image).toHaveStyle({ borderRadius: '1000px' });
  });

  it('renders an avatar', () => {
    render(<CellMedia source="some/image/path" type="avatar" />);
    const image = screen.getByRole('img');

    expect(image).toHaveAttribute('src', 'some/image/path');
    expect(image).toHaveStyle({ borderRadius: '1000px' });
  });

  it('renders an image', () => {
    render(<CellMedia source="some/image/path" type="image" />);
    const image = screen.getByRole('img');

    expect(image).toHaveAttribute('src', 'some/image/path');
    expect(image).toHaveStyle({ borderRadius: '8px' });
  });

  it('renders a pictogram', () => {
    render(<CellMedia illustration={<Pictogram name="2fa" />} type="pictogram" />);

    expect(screen.getByRole('img')).toHaveAttribute('src', expect.stringContaining('2fa'));
  });

  describe('at normal scale', () => {
    it('sets icon size', () => {
      render(<CellMedia name="arrowUp" type="icon" />);

      expect(screen.getByText(glyphMap['ui-arrowUp-16'])).toHaveStyle({ fontSize: '16px' });
    });

    it('sets asset size', () => {
      render(<CellMedia source="some/image/path" type="asset" />);
      const image = screen.getByRole('img');

      expect(image).toHaveAttribute('width', '32');
      expect(image).toHaveAttribute('height', '32');
    });

    it('sets avatar size', () => {
      render(<CellMedia source="some/image/path" type="avatar" />);
      const image = screen.getByRole('img');

      expect(image).toHaveAttribute('width', '32');
      expect(image).toHaveAttribute('height', '32');
    });

    it('sets image size', () => {
      render(<CellMedia source="some/image/path" type="image" />);
      const image = screen.getByRole('img');

      expect(image).toHaveAttribute('width', '48');
      expect(image).toHaveAttribute('height', '48');
    });

    it('sets pictogram size', () => {
      render(<CellMedia illustration={<Pictogram name="2fa" />} type="pictogram" />);
      const image = screen.getByRole('img');

      expect(image).toHaveAttribute('width', '48');
      expect(image).toHaveAttribute('height', '48');
    });

    it('sets pictogram size and cannot be overridden by Pictogram props', () => {
      render(
        <CellMedia
          illustration={<Pictogram dimension="64x64" name="2fa" scaleMultiplier={2} />}
          type="pictogram"
        />,
      );
      const image = screen.getByRole('img');

      expect(image).toHaveAttribute('width', '48');
      expect(image).toHaveAttribute('height', '48');
    });
  });

  describe('at dense scale', () => {
    beforeEach(() => {
      const useScaleConditionalSpy = jest.spyOn(
        require('@cbhq/cds-common/scale/useScaleConditional'),
        'useScaleConditional',
      ) as jest.SpyInstance<number, [CellScaleDensity]>;
      useScaleConditionalSpy.mockImplementation((config) => config.dense);
    });

    it('sets icon size', () => {
      render(<CellMedia name="arrowUp" type="icon" />);

      expect(screen.getByText(glyphMap['ui-arrowUp-12'])).toHaveStyle({ fontSize: '12px' });
    });

    it('sets asset size', () => {
      render(<CellMedia source="some/image/path" type="asset" />);
      const image = screen.getByRole('img');

      expect(image).toHaveAttribute('width', '24');
      expect(image).toHaveAttribute('height', '24');
    });

    it('sets avatar size', () => {
      render(<CellMedia source="some/image/path" type="avatar" />);
      const image = screen.getByRole('img');

      expect(image).toHaveAttribute('width', '24');
      expect(image).toHaveAttribute('height', '24');
    });

    it('sets image size', () => {
      render(<CellMedia source="some/image/path" type="image" />);
      const image = screen.getByRole('img');

      expect(image).toHaveAttribute('width', '40');
      expect(image).toHaveAttribute('height', '40');
    });

    it('sets pictogram size', () => {
      render(<CellMedia illustration={<Pictogram name="2fa" />} type="pictogram" />);
      const image = screen.getByRole('img');

      expect(image).toHaveAttribute('width', '40.032');
      expect(image).toHaveAttribute('height', '40.032');
    });

    it('sets pictogram size and cannot be overridden by Pictogram props', () => {
      render(
        <CellMedia
          illustration={<Pictogram dimension="64x64" name="2fa" scaleMultiplier={2} />}
          type="pictogram"
        />,
      );
      const image = screen.getByRole('img');

      expect(image).toHaveAttribute('width', '40.032');
      expect(image).toHaveAttribute('height', '40.032');
    });
  });
});
