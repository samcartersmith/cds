import { render, screen } from '@testing-library/react';

import { NavigationBar } from '../NavigationBar';

describe('NavigationBar', () => {
  it('renders start, children, end and bottom correctly for valid props', () => {
    render(
      <NavigationBar start={<div>Start</div>} end={<div>End</div>} bottom={<div>Bottom</div>}>
        <div>Children</div>
      </NavigationBar>,
    );
    expect(screen.getByText('Start')).toBeInTheDocument();
    expect(screen.getByText('End')).toBeInTheDocument();
    expect(screen.getByText('Children')).toBeInTheDocument();
    expect(screen.getByText('Bottom')).toBeInTheDocument();
  });
  it('does not render start, children, end and bottom for invalid props', () => {
    render(
      <NavigationBar start={null} end={null} bottom={null}>
        <div />
      </NavigationBar>,
    );
    expect(screen.queryByText('Start')).not.toBeInTheDocument();
    expect(screen.queryByText('End')).not.toBeInTheDocument();
    expect(screen.queryByText('Bottom')).not.toBeInTheDocument();
  });
});
