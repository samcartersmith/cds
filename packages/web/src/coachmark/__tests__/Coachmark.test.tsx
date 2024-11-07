import { render, screen } from '@testing-library/react';
import { renderA11y } from '@cbhq/cds-web-utils';

import { type CoachmarkProps, Coachmark } from '../Coachmark';

const exampleProps: CoachmarkProps = {
  title: 'Title',
  content: 'Content',
  action: <button type="button">button</button>,
  testID: 'coachmark-test',
};

describe('Coachmark', () => {
  it('passes accessibility', async () => {
    expect(await renderA11y(<Coachmark {...exampleProps} />)).toHaveNoViolations();
  });

  it('renders title and content', () => {
    render(<Coachmark {...exampleProps} />);

    expect(screen.getByRole('heading', { name: 'Title' })).toBeInTheDocument();
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('renders checkbox', () => {
    const checkbox = <input type="checkbox" />;
    render(<Coachmark {...exampleProps} checkbox={checkbox} />);

    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  it('renders action button', () => {
    const action = <button type="button">Action</button>;
    render(<Coachmark {...exampleProps} action={action} />);

    expect(screen.getByRole('button', { name: 'Action' })).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    const onClose = jest.fn();
    render(<Coachmark {...exampleProps} closeButtonAccessibilityLabel="close" onClose={onClose} />);

    screen.getByLabelText('close').click();

    expect(onClose).toHaveBeenCalled();
  });

  it('renders media', () => {
    const media = <img alt="Media" src="image.png" />;
    render(<Coachmark {...exampleProps} media={media} />);

    expect(screen.getByAltText('Media')).toBeInTheDocument();
  });

  it('renders with custom width', () => {
    render(<Coachmark {...exampleProps} width={500} />);

    expect(screen.getByTestId('coachmark-test')).toHaveStyle({ width: '500px' });
  });
});
