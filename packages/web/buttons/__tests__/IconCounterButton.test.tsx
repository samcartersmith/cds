import '@testing-library/jest-dom/extend-expect';

import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import { IconCounterButton } from '../IconCounterButton';

describe('IconCounterButton', () => {
  it('renders without crashing', () => {
    render(<IconCounterButton icon="heartActive" />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<IconCounterButton icon="heart" onPress={handleClick} />);

    fireEvent.click(screen.getByRole('button'));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders custom icon', () => {
    const CustomIcon = () => <div data-testid="custom-icon">Custom Icon</div>;
    render(<IconCounterButton icon={<CustomIcon />} />);

    expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
  });

  it('displays the correct icon', () => {
    render(<IconCounterButton icon="heartActive" />);
    expect(screen.getByTestId('icon-base-glyph')).toHaveAttribute('data-icon-name', 'heartActive');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<IconCounterButton ref={ref} icon="heartActive" />);

    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('BUTTON');
  });

  it('passes testId correctly', () => {
    render(<IconCounterButton icon="heartActive" testID="icon-counter-button-test-id" />);

    expect(screen.getByTestId('icon-counter-button-test-id')).toBeInTheDocument();
  });

  it('displays the count correctly when count is less than 1000', () => {
    render(<IconCounterButton count={999} icon="heartActive" />);
    expect(screen.getByText('999')).toBeInTheDocument();
  });

  it('displays the count correctly when count is 1000', () => {
    render(<IconCounterButton count={1000} icon="heartActive" />);
    expect(screen.getByText('1K')).toBeInTheDocument();
  });

  it('displays the count correctly when count is 1500', () => {
    render(<IconCounterButton count={1500} icon="heartActive" />);
    expect(screen.getByText('1.5K')).toBeInTheDocument();
  });

  it('displays the count correctly when count is 1000000', () => {
    render(<IconCounterButton count={1000000} icon="heartActive" />);
    expect(screen.getByText('1M')).toBeInTheDocument();
  });

  it('displays the count correctly when count is 1500000', () => {
    render(<IconCounterButton count={1500000} icon="heartActive" />);
    expect(screen.getByText('1.5M')).toBeInTheDocument();
  });
});
