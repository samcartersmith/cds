import { render } from '@testing-library/react';
import { zIndex } from '@cbhq/cds-common/tokens/zIndex';

import { PortalHost, PortalProvider } from '../PortalProvider';

describe('PortalProvider', () => {
  it('renders portal host', () => {
    const { getByTestId } = render(<PortalHost />);

    expect(getByTestId('portal-modal-container')).toHaveStyle({
      zIndex: zIndex.overlays.modal,
    });
    expect(getByTestId('portal-toast-container')).toHaveStyle({
      zIndex: zIndex.overlays.toast,
    });
    expect(getByTestId('portal-alert-container')).toHaveStyle({
      zIndex: zIndex.overlays.alert,
    });
    expect(getByTestId('portal-tooltip-container')).toHaveStyle({
      zIndex: zIndex.overlays.tooltip,
    });
  });

  it('renders children', () => {
    const { getByText } = render(
      <PortalProvider>
        <p>test</p>
      </PortalProvider>,
    );

    expect(getByText('test')).toBeTruthy();
  });
});
