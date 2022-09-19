import { render } from '@testing-library/react';

import { Button } from '../Button';
import { ButtonGroup } from '../ButtonGroup';

describe('ButtonGroup.test', () => {
  it('renders list', () => {
    const { getByRole, container } = render(
      <ButtonGroup accessibilityLabel="Group">
        <Button>Save</Button>
        <Button variant="secondary">Cancel</Button>
      </ButtonGroup>,
    );

    expect(getByRole('group')).toBeTruthy();
    expect(container.querySelector('ul')).toBeTruthy();
    expect(container.querySelector('li')).toBeTruthy();
    expect(container.querySelector('button')).toBeTruthy();
  });

  it('renders vertical list', () => {
    const { getByRole, container } = render(
      <ButtonGroup vertical accessibilityLabel="Group">
        <Button>Save</Button>
        <Button variant="secondary">Cancel</Button>
      </ButtonGroup>,
    );

    expect(getByRole('group')).toBeTruthy();
    expect(container.querySelector('ul')).toBeTruthy();
    expect(container.querySelector('li')).toBeTruthy();
    expect(container.querySelector('button')).toBeTruthy();
  });

  it('renders block buttons', () => {
    const { getByRole, container } = render(
      <ButtonGroup block accessibilityLabel="Group">
        <Button>Save</Button>
        <Button variant="secondary">Cancel</Button>
      </ButtonGroup>,
    );

    expect(getByRole('group')).toBeTruthy();
    expect(container.querySelector('ul')).toBeTruthy();
    expect(container.querySelector('li')).toBeTruthy();
    expect(container.querySelector('button')).toBeTruthy();
  });

  it('renders null children', () => {
    const { getByRole, container } = render(
      <ButtonGroup block accessibilityLabel="Group">
        {null}
        {null}
      </ButtonGroup>,
    );

    expect(getByRole('group')).toBeTruthy();
    expect(container.querySelector('ul')).toBeTruthy();
    expect(container.querySelector('li')).toBeNull();
  });
});
