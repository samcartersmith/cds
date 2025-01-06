import { fireEvent, render, screen } from '@testing-library/react-native';

import { Button } from '../../buttons';
import { Checkbox } from '../../controls';
import { RemoteImage } from '../../media';
import { type CoachmarkProps, Coachmark } from '../Coachmark';

const exampleProps: CoachmarkProps = {
  title: 'Title',
  content: 'Content',
  action: <Button>button</Button>,
  testID: 'coachmark-test',
};

describe('Coachmark', () => {
  it('passes accessibility', async () => {
    render(<Coachmark {...exampleProps} />);
    expect(screen.getByTestId(exampleProps.testID as string)).toBeAccessible();
  });

  it('renders title and content', () => {
    render(<Coachmark {...exampleProps} />);

    expect(screen.getByText('Title')).toBeTruthy();
    expect(screen.getByText('Content')).toBeTruthy();
  });

  it('renders checkbox', () => {
    const checkbox = <Checkbox>Checked</Checkbox>;
    render(<Coachmark {...exampleProps} checkbox={checkbox} />);

    expect(screen.getByRole('switch')).toBeTruthy();
  });

  it('renders action button', () => {
    const action = <Button>Action</Button>;
    render(<Coachmark {...exampleProps} action={action} />);

    expect(screen.getByRole('button', { name: 'Action' })).toBeTruthy();
  });

  it('calls onClose when close button is clicked', () => {
    const onClose = jest.fn();
    render(<Coachmark {...exampleProps} closeButtonAccessibilityLabel="close" onClose={onClose} />);

    fireEvent.press(screen.getByLabelText('close'));

    expect(onClose).toHaveBeenCalled();
  });

  it('renders media', () => {
    const media = (
      <RemoteImage
        borderColor="backgroundPrimary"
        source="https://images.coinbase.com/avatar?s=56"
        testID="remoteimage"
      />
    );
    render(<Coachmark {...exampleProps} media={media} />);

    expect(screen.getByTestId('remoteimage')).toBeTruthy();
  });

  it('renders with custom width', () => {
    render(<Coachmark {...exampleProps} width={500} />);

    expect(screen.getByTestId('coachmark-test')).toHaveStyle({ width: 500 });
  });
});
