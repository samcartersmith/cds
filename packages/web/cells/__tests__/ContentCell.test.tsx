import { fireEvent, render, screen } from '@testing-library/react';
import { noop } from '@cbhq/cds-utils';
import { renderA11y } from '@cbhq/cds-web-utils/jest';

import { CellMedia } from '../CellMedia';
import { ContentCell } from '../ContentCell';

const URL = 'https://www.google.com';

describe('ContentCell', () => {
  it('passes accessibility', async () => {
    expect(
      await renderA11y(
        <ContentCell title="Title" subtitle="Subtitle" description="Description" meta="Meta" />,
      ),
    ).toHaveNoViolations();
  });

  it('passes accessibility when a button', async () => {
    expect(
      await renderA11y(
        <ContentCell
          onPress={noop}
          title="Title"
          subtitle="Subtitle"
          description="Description"
          meta="Meta"
        />,
      ),
    ).toHaveNoViolations();
  });

  it('passes accessibility when a link', async () => {
    expect(
      await renderA11y(
        <ContentCell
          to={URL}
          title="Title"
          subtitle="Subtitle"
          description="Description"
          meta="Meta"
        />,
      ),
    ).toHaveNoViolations();
  });

  it('errors if meta is provided without title/subtitle', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation();

    render(<ContentCell meta="Meta" />);

    expect(spy).toHaveBeenCalledWith(
      'ContentCell: Cannot use `meta` without a `title` or `subtitle`.',
    );

    spy.mockRestore();
  });

  it('renders a title', () => {
    render(<ContentCell title={<div data-testid="title">Title</div>} />);

    expect(screen.getByTestId('title')).toBeVisible();
  });

  it('renders a subtitle', () => {
    render(<ContentCell subtitle={<div data-testid="subtitle">Subtitle</div>} />);

    expect(screen.getByTestId('subtitle')).toBeVisible();
  });

  it('renders a description', () => {
    render(<ContentCell description={<div data-testid="description">Description</div>} />);

    expect(screen.getByTestId('description')).toBeVisible();
  });

  it('renders meta', () => {
    render(<ContentCell title="Title" meta={<div data-testid="meta">Meta</div>} />);

    expect(screen.getByTestId('meta')).toBeVisible();
  });

  it('renders media', () => {
    render(<ContentCell media={<CellMedia type="icon" name="add" testID="media" />} />);

    expect(screen.getByTestId('media')).toBeVisible();
  });

  it('renders an accessory', () => {
    render(<ContentCell accessory="arrow" />);

    expect(screen.getByTestId('accessory')).toBeVisible();
  });

  it('renders button when onPress is defined', () => {
    render(<ContentCell onPress={noop} />);

    expect(screen.getByRole('button')).toBeVisible();
  });

  it('renders button when onKeyPress is defined', () => {
    render(<ContentCell onKeyPress={noop} />);

    expect(screen.getByRole('button')).toBeVisible();
  });

  it('renders button when onKeyDown is defined', () => {
    render(<ContentCell onKeyDown={noop} />);

    expect(screen.getByRole('button')).toBeVisible();
  });

  it('renders link when to is set with a url', () => {
    render(<ContentCell to={URL} />);

    const link = screen.getByRole('link');

    expect(link).toBeVisible();
    expect(link).toHaveAttribute('href', URL);
  });

  it('renders link when href is set with a url', () => {
    render(<ContentCell href={URL} />);

    const link = screen.getByRole('link');

    expect(link).toBeVisible();
    expect(link).toHaveAttribute('href', URL);
  });

  it('renders link when pressable callback is defined but to is set with a url', () => {
    render(<ContentCell onPress={noop} to={URL} />);

    const link = screen.getByRole('link');

    expect(link).toBeVisible();
    expect(link).toHaveAttribute('href', URL);
  });

  it('renders link when pressable callback is defined but href is set with a url', () => {
    render(<ContentCell onPress={noop} href={URL} />);

    const link = screen.getByRole('link');

    expect(link).toBeVisible();
    expect(link).toHaveAttribute('href', URL);
  });

  it('sets target on link when target is defined', () => {
    const target = '_blank';

    render(<ContentCell to={URL} target={target} />);

    expect(screen.getByRole('link')).toHaveAttribute('target', target);
  });

  it('fires onPress', () => {
    const onPressSpy = jest.fn();

    render(<ContentCell onPress={onPressSpy} />);
    fireEvent.click(screen.getByRole('button'));

    expect(onPressSpy).toHaveBeenCalledTimes(1);
  });

  it('fires onKeyPress', () => {
    const onKeyPressSpy = jest.fn();

    render(<ContentCell onKeyPress={onKeyPressSpy} />);
    fireEvent.keyPress(screen.getByRole('button'), { charCode: 13 });

    expect(onKeyPressSpy).toHaveBeenCalledTimes(1);
  });

  it('fires onKeyDown', () => {
    const onKeyDownSpy = jest.fn();

    render(<ContentCell onKeyDown={onKeyDownSpy} />);
    fireEvent.keyDown(screen.getByRole('button'), { charCode: 13 });

    expect(onKeyDownSpy).toHaveBeenCalledTimes(1);
  });
});
