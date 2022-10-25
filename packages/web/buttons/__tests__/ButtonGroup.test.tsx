import { render, screen } from '@testing-library/react';

import { Button } from '../Button';
import { ButtonGroup } from '../ButtonGroup';

describe('ButtonGroup.test', () => {
  it('renders list', () => {
    render(
      <ButtonGroup accessibilityLabel="Group">
        <Button>Save</Button>
        <Button variant="secondary">Cancel</Button>
      </ButtonGroup>,
    );

    expect(screen.getByRole('group')).toBeTruthy();
    expect(screen.getAllByRole('listitem')).toBeTruthy();
    expect(screen.getAllByRole('button')).toBeTruthy();
  });

  it('renders vertical list', () => {
    render(
      <ButtonGroup vertical accessibilityLabel="Group">
        <Button>Save</Button>
        <Button variant="secondary">Cancel</Button>
      </ButtonGroup>,
    );

    expect(screen.getByRole('group')).toBeTruthy();
    expect(screen.getAllByRole('listitem')).toBeTruthy();
    expect(screen.getAllByRole('button')).toBeTruthy();
  });

  it('renders block buttons', () => {
    render(
      <ButtonGroup block accessibilityLabel="Group">
        <Button>Save</Button>
        <Button variant="secondary">Cancel</Button>
      </ButtonGroup>,
    );

    expect(screen.getByRole('group')).toBeTruthy();
    expect(screen.getAllByRole('listitem')).toBeTruthy();
    expect(screen.getAllByRole('button')).toBeTruthy();
  });

  it('renders null children', () => {
    render(
      <ButtonGroup block accessibilityLabel="Group">
        {null}
        {null}
      </ButtonGroup>,
    );

    expect(screen.getByRole('group')).toBeTruthy();
    expect(screen.queryAllByRole('listitem')).toHaveLength(0);
    expect(screen.queryAllByRole('button')).toHaveLength(0);
  });
});
