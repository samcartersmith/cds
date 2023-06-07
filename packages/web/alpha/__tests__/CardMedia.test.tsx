import { render, screen } from '@testing-library/react';

import { CardMedia } from '../CardMedia';

const TEST_ALT = 'This is a special illustration';
const TEST_ID = 'illustration-test';

describe('CardMedia.test', () => {
  it('renders spotSquare with alt', () => {
    render(
      <CardMedia
        name="accessToAdvancedCharts"
        type="spotSquare"
        placement="above"
        testID={TEST_ID}
        alt={TEST_ALT}
      />,
    );
    expect(screen.getByTestId(TEST_ID)).toHaveAttribute('alt', TEST_ALT);
  });

  it('renders pictogram with alt', () => {
    render(
      <CardMedia name="2fa" type="pictogram" placement="above" testID={TEST_ID} alt={TEST_ALT} />,
    );
    expect(screen.getByTestId(TEST_ID)).toHaveAttribute('alt', TEST_ALT);
  });

  it('renders spot rectangle with alt', () => {
    render(
      <CardMedia src="fake-url" type="image" placement="above" testID={TEST_ID} alt={TEST_ALT} />,
    );
    expect(screen.getByTestId(TEST_ID)).toHaveAttribute('alt', TEST_ALT);
    expect(screen.getByTestId(TEST_ID)).toHaveAttribute('src', 'fake-url');
  });

  it('reverts to empty string if alt is not set via props', () => {
    render(<CardMedia name="2fa" type="pictogram" placement="above" testID={TEST_ID} />);
    expect(screen.getByTestId(TEST_ID)).toHaveAttribute('alt', '');
  });
});
