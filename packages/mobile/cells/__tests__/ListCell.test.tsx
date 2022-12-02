import { Text } from 'react-native';
import { render, screen } from '@testing-library/react-native';
import { noop } from '@cbhq/cds-utils';

import { Button } from '../../buttons';
import { CellMedia } from '../CellMedia';
import { ListCell } from '../ListCell';

describe('ListCell', () => {
  it('renders a Text component title', () => {
    render(<ListCell title={<Text>Title</Text>} />);

    expect(screen.getByText('Title')).toBeTruthy();
  });

  it('passes a11y with a Text component title', () => {
    render(<ListCell testID="listcell-with-title" title={<Text>Title</Text>} />);

    expect(screen.getByTestId('listcell-with-title')).toBeAccessible();
  });

  it('renders a string title', () => {
    render(<ListCell testID="listcell-with-title" title="Title" />);

    expect(screen.getByText('Title')).toBeTruthy();
  });

  it('passes a11y with a string title', () => {
    render(<ListCell testID="listcell-with-title" title="Title" />);

    expect(screen.getByTestId('listcell-with-title')).toBeAccessible();
  });

  it('renders a Text component description', () => {
    render(<ListCell description={<Text>Description</Text>} />);

    expect(screen.getByText('Description')).toBeTruthy();
  });

  it('passes a11y with a Text component description', () => {
    render(<ListCell testID="listcell-with-description" description={<Text>Description</Text>} />);

    expect(screen.getByTestId('listcell-with-description')).toBeAccessible();
  });

  it('renders a string description', () => {
    render(<ListCell description="Description" />);

    expect(screen.getByText('Description')).toBeTruthy();
  });

  it('passes a11y with a string description', () => {
    render(<ListCell testID="listcell-with-description" description="Description" />);

    expect(screen.getByTestId('listcell-with-description')).toBeAccessible();
  });

  it('renders a Text component detail', () => {
    render(<ListCell detail={<Text>Detail</Text>} />);

    expect(screen.getByText('Detail')).toBeTruthy();
  });

  it('passes a11y with a Text component detail', () => {
    render(<ListCell testID="listcell-with-detail" detail={<Text>Detail</Text>} />);

    expect(screen.getByTestId('listcell-with-detail')).toBeAccessible();
  });

  it('renders a string detail', () => {
    render(<ListCell detail="Detail" />);

    expect(screen.getByText('Detail')).toBeTruthy();
  });

  it('passes a11y with a string detail', () => {
    render(<ListCell testID="listcell-with-detail" detail="Detail" />);

    expect(screen.getByTestId('listcell-with-detail')).toBeAccessible();
  });

  it('renders a Text component subdetail', () => {
    render(<ListCell subdetail={<Text>Subdetail</Text>} />);

    expect(screen.getByText('Subdetail')).toBeTruthy();
  });

  it('passes a11y with a Text component subdetail', () => {
    render(<ListCell testID="listcell-with-subdetail" subdetail={<Text>Subdetail</Text>} />);

    expect(screen.getByTestId('listcell-with-subdetail')).toBeAccessible();
  });

  it('renders a string subdetail', () => {
    render(<ListCell subdetail="Subdetail" />);

    expect(screen.getByText('Subdetail')).toBeTruthy();
  });

  it('passes a11y with a string subdetail', () => {
    render(<ListCell testID="listcell-with-subdetail" subdetail="Subdetail" />);

    expect(screen.getByTestId('listcell-with-subdetail')).toBeAccessible();
  });

  it('renders media', () => {
    render(<ListCell media={<CellMedia type="icon" name="add" testID="media" />} />);

    expect(screen.getByTestId('media')).toBeTruthy();
  });

  it('passes a11y with media', () => {
    render(
      <ListCell
        testID="listcell-with-media"
        media={<CellMedia type="icon" name="add" testID="media" />}
      />,
    );
    expect(screen.getByTestId('listcell-with-media')).toBeAccessible();
  });

  it('renders an accessory', () => {
    render(<ListCell accessory="arrow" />);

    expect(screen.getByTestId('accessory')).toBeTruthy();
  });

  it('passes a11y with accessory', () => {
    render(<ListCell testID="listcell-with-accessory" accessory="arrow" />);

    expect(screen.getByTestId('listcell-with-accessory')).toBeAccessible();
  });

  it('renders an action', () => {
    render(<ListCell action={<Button>Button</Button>} />);

    expect(screen.getByText('Button')).toBeTruthy();
  });

  it('passes a11y with action', () => {
    render(<ListCell testID="listcell-with-action" action={<Button>Button</Button>} />);

    expect(screen.getByTestId('listcell-with-action')).toBeAccessible();
  });

  it('renders empty strings without crashing', () => {
    render(<ListCell title="" description="" detail="" subdetail="" action="" />);

    expect(screen.container).not.toBeNull();
  });

  it('can set an accessibilityLabel and accessibilityHint when a pressable', () => {
    render(
      <ListCell
        testID="listcell-with-a11y"
        accessibilityLabel="Some label"
        accessibilityHint="Some hint"
        onPress={noop}
      />,
    );

    expect(screen.getByLabelText('Some label')).toBeTruthy();
    expect(screen.getByHintText('Some hint')).toBeTruthy();
    expect(screen.getByTestId('listcell-with-a11y')).toBeAccessible();
  });
});
