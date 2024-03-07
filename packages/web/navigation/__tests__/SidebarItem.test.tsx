import { render, screen } from '@testing-library/react';

import { Sidebar } from '../Sidebar';
import { SidebarItem } from '../SidebarItem';

jest.mock('../../hooks/useDimensions', () => ({
  useDimensions: jest.fn(() => {
    return {
      width: 1280,
      height: 100,
      observe: jest.fn(),
    };
  }),
}));

const CustomComponent = () => <div>Custom Component</div>;

describe('SidebarItem', () => {
  it('should render primary sidebar item when variant is primary in sidebar context', () => {
    render(
      <Sidebar>
        <SidebarItem icon="chartPie" testID="sidebar-item-asset" title="Assets" />
        <SidebarItem icon="trading" testID="sidebar-item-trade" title="Trade" />
      </Sidebar>,
    );

    expect(screen.getByTestId('sidebar-item-asset')).toBeInTheDocument();
    expect(screen.getByTestId('sidebar-item-trade')).toBeInTheDocument();
    expect(screen.getAllByTestId('sidebar-item-primary')[0]).toBeInTheDocument();
    expect(screen.getByText('Assets')).toHaveClass('headline');
  });
  it('should render collapsed primary sidebar item when collapsed is true in sidebar context', () => {
    render(
      <Sidebar collapsed>
        <SidebarItem icon="chartPie" title="Assets" />
        <SidebarItem icon="trading" title="Trade" />
      </Sidebar>,
    );
    expect(screen.queryByText('Assets')).not.toBeInTheDocument();
    expect(screen.queryByText('Trade')).not.toBeInTheDocument();
  });

  it('should render condensed sidebar item when variant is condensed in sidebar context', () => {
    render(
      <Sidebar variant="condensed">
        <SidebarItem icon="chartPie" title="Assets" />
        <SidebarItem icon="trading" title="Trade" />
      </Sidebar>,
    );
    expect(screen.getAllByTestId('sidebar-item-condensed')[0]).toBeInTheDocument();
    expect(screen.getByText('Assets')).toHaveClass('label1');
  });
  it('should render custom sidebar item when passing custom component to sidebar item', () => {
    render(
      <Sidebar>
        <SidebarItem Component={CustomComponent} icon="chartPie" title="Assets" />
        <SidebarItem Component={CustomComponent} icon="trading" title="Trade" />
      </Sidebar>,
    );
    expect(screen.getAllByText('Custom Component')[0]).toBeInTheDocument();
    expect(screen.queryByTestId('sidebar-item-primary')).not.toBeInTheDocument();
    expect(screen.queryByTestId('sidebar-item-condensed')).not.toBeInTheDocument();
  });
  it('can override borderRadius', () => {
    render(
      <Sidebar>
        <SidebarItem
          borderRadius="roundedNone"
          icon="chartPie"
          testID="sidebar-item"
          title="Assets"
        />
        <SidebarItem
          borderRadius="roundedNone"
          icon="trading"
          testID="sidebar-item"
          title="Trade"
        />
      </Sidebar>,
    );
    expect(screen.getAllByTestId('sidebar-item')[0]).toHaveStyle({
      '--interactable-border-radius': '0px',
    });
  });
});
