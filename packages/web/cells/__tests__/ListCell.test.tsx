import { fireEvent, render, screen } from '@testing-library/react';
import { noop } from '@cbhq/cds-utils';
import { renderA11y } from '@cbhq/cds-web-utils/jest';

import { Button } from '../../buttons';
import { CellMedia } from '../CellMedia';
import { ListCell } from '../ListCell';

const URL = 'https://www.google.com';
const A11Y_TEXT = 'Some accessible text';

describe('ListCell', () => {
  it('passes accessibility', async () => {
    expect(
      await renderA11y(
        <ListCell description="Description" detail="Detail" subdetail="Subdetail" title="Title" />,
      ),
    ).toHaveNoViolations();
  });

  it('passes accessibility when a button', async () => {
    expect(
      await renderA11y(
        <ListCell
          description="Description"
          detail="Detail"
          onPress={noop}
          subdetail="Subdetail"
          title="Title"
        />,
      ),
    ).toHaveNoViolations();
  });

  it('passes accessibility when a link', async () => {
    expect(
      await renderA11y(
        <ListCell
          description="Description"
          detail="Detail"
          subdetail="Subdetail"
          title="Title"
          to={URL}
        />,
      ),
    ).toHaveNoViolations();
  });

  it('sets an accessibile label with accessibilityLabel when pressable', () => {
    render(<ListCell accessibilityLabel={A11Y_TEXT} onPress={noop} />);

    expect(screen.getByRole('button')).toHaveAccessibleName(A11Y_TEXT);
  });

  it('sets an accessibile label with accessibilityLabelledBy when pressable', () => {
    const labelId = 'label-id';

    render(
      <>
        <span id={labelId}>{A11Y_TEXT}</span>
        <ListCell accessibilityLabelledBy={labelId} onPress={noop} />
      </>,
    );

    expect(screen.getByRole('button')).toHaveAccessibleName(A11Y_TEXT);
  });

  it('sets an accessibile description with accessibilityHint when pressable', () => {
    const descriptionId = 'description-id';

    render(
      <>
        <span id={descriptionId}>{A11Y_TEXT}</span>
        <ListCell accessibilityHint={descriptionId} onPress={noop} />
      </>,
    );

    expect(screen.getByRole('button')).toHaveAccessibleDescription(A11Y_TEXT);
  });

  it('renders a title', () => {
    render(<ListCell title={<div data-testid="title">Title</div>} />);

    expect(screen.getByTestId('title')).toBeVisible();
  });

  it('renders a description', () => {
    render(<ListCell description={<div data-testid="description">Description</div>} />);

    expect(screen.getByTestId('description')).toBeVisible();
  });

  it('renders a detail', () => {
    render(<ListCell detail={<div data-testid="detail">Detail</div>} />);

    expect(screen.getByTestId('detail')).toBeVisible();
  });

  it('renders a subdetail', () => {
    render(<ListCell subdetail={<div data-testid="subdetail">Subdetail</div>} title="Title" />);

    expect(screen.getByTestId('subdetail')).toBeVisible();
  });

  it('renders media', () => {
    render(<ListCell media={<CellMedia name="add" testID="media" type="icon" />} />);

    expect(screen.getByTestId('media')).toBeVisible();
  });

  it('renders an accessory', () => {
    render(<ListCell accessory="arrow" />);

    expect(screen.getByTestId('accessory')).toBeVisible();
  });

  it('renders an action', () => {
    const button = <Button data-testid="button">Test</Button>;
    render(<ListCell action={button} />);

    expect(screen.getByTestId('button')).toBeVisible();
  });

  it('renders button when onPress is defined', () => {
    render(<ListCell onPress={noop} />);

    expect(screen.getByRole('button')).toBeVisible();
  });

  it('renders button when onKeyPress is defined', () => {
    render(<ListCell onKeyPress={noop} />);

    expect(screen.getByRole('button')).toBeVisible();
  });

  it('renders button when onKeyDown is defined', () => {
    render(<ListCell onKeyDown={noop} />);

    expect(screen.getByRole('button')).toBeVisible();
  });

  it('renders link when to is set with a url', () => {
    render(<ListCell to={URL} />);

    const link = screen.getByRole('link');

    expect(link).toBeVisible();
    expect(link).toHaveAttribute('href', URL);
  });

  it('renders link when href is set with a url', () => {
    render(<ListCell href={URL} />);

    const link = screen.getByRole('link');

    expect(link).toBeVisible();
    expect(link).toHaveAttribute('href', URL);
  });

  it('renders link when pressable callback is defined but to is set with a url', () => {
    render(<ListCell onPress={noop} to={URL} />);

    const link = screen.getByRole('link');

    expect(link).toBeVisible();
    expect(link).toHaveAttribute('href', URL);
  });

  it('renders link when pressable callback is defined but href is set with a url', () => {
    render(<ListCell href={URL} onPress={noop} />);

    const link = screen.getByRole('link');

    expect(link).toBeVisible();
    expect(link).toHaveAttribute('href', URL);
  });

  it('sets target on link when target is defined', () => {
    const target = '_blank';

    render(<ListCell target={target} to={URL} />);

    expect(screen.getByRole('link')).toHaveAttribute('target', target);
  });

  it('fires onPress', () => {
    const onPressSpy = jest.fn();

    render(<ListCell onPress={onPressSpy} />);
    fireEvent.click(screen.getByRole('button'));

    expect(onPressSpy).toHaveBeenCalledTimes(1);
  });

  it('fires onKeyPress', () => {
    const onKeyPressSpy = jest.fn();

    render(<ListCell onKeyPress={onKeyPressSpy} />);
    fireEvent.keyPress(screen.getByRole('button'), { charCode: 13 });

    expect(onKeyPressSpy).toHaveBeenCalledTimes(1);
  });

  it('fires onKeyDown', () => {
    const onKeyDownSpy = jest.fn();

    render(<ListCell onKeyDown={onKeyDownSpy} />);
    fireEvent.keyDown(screen.getByRole('button'), { charCode: 13 });

    expect(onKeyDownSpy).toHaveBeenCalledTimes(1);
  });
});
