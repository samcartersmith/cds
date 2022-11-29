import { useCallback } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SharedAccessibilityProps, useToggler } from '@cbhq/cds-common';
import { renderA11y } from '@cbhq/cds-web-utils';

import { TextBody } from '../../../typography';
import { FullscreenModal } from '../FullscreenModal';

const TITLE = 'Modal title';
const PRIMARY_CONTENT = 'Primary content';
const SECONDARY_CONTENT = 'Secondary content';
const CLOSE_BUTTON_LABEL = 'Close button';
const LABELLED_BY = 'some-id';
const LABEL = 'A label';

const onRequestCloseSpy = jest.fn();

type Options = {
  visible?: boolean;
} & Pick<SharedAccessibilityProps, 'accessibilityLabelledBy' | 'accessibilityLabel'>;

const FullscreenModalExample = ({
  visible: externalVisible = true,
  accessibilityLabelledBy,
  accessibilityLabel,
}: Options) => {
  const [visible, { toggleOff }] = useToggler(externalVisible);

  const primaryContent = <TextBody as="p">{PRIMARY_CONTENT}</TextBody>;
  const secondaryContent = <TextBody as="p">{SECONDARY_CONTENT}</TextBody>;

  const handleClose = useCallback(() => {
    onRequestCloseSpy();
    toggleOff();
  }, [toggleOff]);

  return (
    <FullscreenModal
      visible={visible}
      onRequestClose={handleClose}
      primaryContent={primaryContent}
      secondaryContent={secondaryContent}
      title={TITLE}
      accessibilityLabelledBy={accessibilityLabelledBy}
      accessibilityLabel={accessibilityLabel}
      disablePortal
    />
  );
};

describe('FullscreenModal', () => {
  afterEach(() => {
    onRequestCloseSpy.mockClear();
  });

  it('passes a11y', async () => {
    expect(await renderA11y(<FullscreenModalExample />)).toHaveNoViolations();
  });

  it('has expected default a11y attrs', () => {
    render(<FullscreenModalExample />);

    const modal = screen.getByRole('dialog');

    expect(modal).toHaveAttribute('aria-modal', 'true');
    expect(modal).toHaveAttribute('aria-labelledby', expect.stringMatching(/modal-title-.*/));
    expect(screen.getByText(TITLE)).toHaveAttribute('id', expect.stringMatching(/modal-title-.*/));
  });

  it('overrides default a11y attrs when accessibilityLabelledBy is provided', () => {
    render(<FullscreenModalExample visible accessibilityLabelledBy={LABELLED_BY} />);

    const modal = screen.getByRole('dialog');

    expect(modal).toHaveAttribute('aria-labelledby', LABELLED_BY);
    expect(screen.getByText(TITLE)).not.toHaveAttribute('id');
    expect(modal).not.toHaveAttribute('aria-label');
  });

  it('overrides default a11y attrs when accessibilityLabel is provided', () => {
    render(<FullscreenModalExample visible accessibilityLabel={LABEL} />);

    const modal = screen.getByRole('dialog');

    expect(modal).not.toHaveAttribute('aria-labelledby');
    expect(screen.getByText(TITLE)).not.toHaveAttribute('id');
    expect(modal).toHaveAttribute('aria-label', LABEL);
  });

  it('overrides accessibilityLabel with accessibilityLabelledBy when both are provided', () => {
    render(
      <FullscreenModalExample
        visible
        accessibilityLabelledBy={LABELLED_BY}
        accessibilityLabel={LABEL}
      />,
    );

    const modal = screen.getByRole('dialog');

    expect(modal).toHaveAttribute('aria-labelledby', LABELLED_BY);
    expect(screen.getByText(TITLE)).not.toHaveAttribute('id');
    expect(modal).not.toHaveAttribute('aria-label');
  });

  it('renders content when modal is visible', async () => {
    render(<FullscreenModalExample />);

    expect(await screen.findByText(TITLE)).toBeVisible();
    expect(await screen.findByText(PRIMARY_CONTENT)).toBeVisible();
    expect(await screen.findByText(SECONDARY_CONTENT)).toBeVisible();
  });

  it('does not render content when modal is not visible', () => {
    render(<FullscreenModalExample visible={false} />);

    expect(screen.queryByText(TITLE)).toBeNull();
    expect(screen.queryByText(PRIMARY_CONTENT)).toBeNull();
    expect(screen.queryByText(SECONDARY_CONTENT)).toBeNull();
  });

  it('fires close method on close button click', () => {
    render(<FullscreenModalExample />);

    fireEvent.click(screen.getByLabelText(CLOSE_BUTTON_LABEL));

    expect(onRequestCloseSpy).toHaveBeenCalledTimes(1);
  });

  it('fires close method on ESC key press', async () => {
    render(<FullscreenModalExample />);

    const user = userEvent.setup();
    await user.keyboard('{Escape}');

    expect(onRequestCloseSpy).toHaveBeenCalledTimes(1);
  });
});
