import { render, screen } from '@testing-library/react';
import glyphMap from '@cbhq/cds-icons/__generated__/glyphMap';
import { renderA11y } from '@cbhq/cds-web-utils/jest';

import { Pictogram } from '../../illustrations/Pictogram';
import { DefaultThemeProvider } from '../../utils/test';
import { CellMedia } from '../CellMedia';

describe('CellMedia', () => {
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
      await renderA11y(
        <DefaultThemeProvider>
          <CellMedia illustration={<Pictogram name="2fa" />} type="pictogram" />
        </DefaultThemeProvider>,
      ),
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
      <DefaultThemeProvider>
        <CellMedia
          accessibilityLabel="Pictogram label"
          illustration={<Pictogram name="2fa" />}
          type="pictogram"
        />
      </DefaultThemeProvider>,
    );

    expect(screen.getByAltText('Pictogram label')).toBeVisible();
  });

  it('pictogram sets an accessible label on Pictogram', () => {
    render(
      <DefaultThemeProvider>
        <CellMedia illustration={<Pictogram alt="Pictogram label" name="2fa" />} type="pictogram" />
      </DefaultThemeProvider>,
    );

    expect(screen.getByAltText('Pictogram label')).toBeVisible();
  });

  it('pictogram CellMedia accessible label overrides Pictogram accessible label', () => {
    render(
      <DefaultThemeProvider>
        <CellMedia
          accessibilityLabel="CellMedia label"
          illustration={<Pictogram alt="Pictogram label" name="2fa" />}
          type="pictogram"
        />
      </DefaultThemeProvider>,
    );

    expect(screen.getByAltText('CellMedia label')).toBeVisible();
  });

  it('renders an icon', () => {
    render(<CellMedia name="arrowUp" type="icon" />);

    expect(screen.getByText(glyphMap['ui-arrowUp-12'])).toBeVisible();
  });

  it('renders an asset', () => {
    render(<CellMedia source="some/image/path" type="asset" />);
    const image = screen.getByRole('img');

    expect(image).toHaveAttribute('src', 'some/image/path');
    expect(image.className).toMatch('cds-circle');
  });

  it('renders an avatar', () => {
    render(<CellMedia source="some/image/path" type="avatar" />);
    const image = screen.getByRole('img');

    expect(image).toHaveAttribute('src', 'some/image/path');
    expect(image.className).toMatch('cds-circle');
  });

  it('renders an image', () => {
    render(<CellMedia source="some/image/path" type="image" />);
    const image = screen.getByRole('img');

    expect(image).toHaveAttribute('src', 'some/image/path');
    expect(image.className).toMatch('cds-squircle');
  });

  it('renders a pictogram', () => {
    render(
      <DefaultThemeProvider>
        <CellMedia illustration={<Pictogram name="2fa" />} type="pictogram" />
      </DefaultThemeProvider>,
    );

    expect(screen.getByRole('img')).toHaveAttribute('src', expect.stringContaining('2fa'));
  });
});
