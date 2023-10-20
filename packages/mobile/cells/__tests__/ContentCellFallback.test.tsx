import { Text } from 'react-native';
import { render, screen } from '@testing-library/react-native';
import { getRectWidthVariant } from '@cbhq/cds-common/utils/getRectWidthVariant';

import { Fallback } from '../../layout';
import { ContentCellFallback } from '../ContentCellFallback';
import { MediaFallback } from '../MediaFallback';

jest.mock('../../typography/useLineHeightMap', () => ({
  useLineHeightMap: jest.fn(() => ({
    body: 1,
    label2: 2,
  })),
}));
jest.mock('../../layout/Fallback', () => ({
  Fallback: jest.fn(),
}));

jest.mock('../MediaFallback', () => ({
  MediaFallback: jest.fn(),
}));

describe('ContentCellFallback', () => {
  beforeEach(jest.clearAllMocks);
  beforeAll(() => (Fallback as unknown as jest.Mock).mockReturnValue(<Text>Fallback</Text>));

  it('should render MediaFallback if media is provided', () => {
    (MediaFallback as unknown as jest.Mock).mockImplementationOnce(({ type }) => (
      <Text>{`MediaFallback ${type}`}</Text>
    ));

    render(<ContentCellFallback media="image" />);
    expect(screen.getByText('MediaFallback image')).toBeDefined();
  });

  it('should render description fallback', () => {
    render(<ContentCellFallback description disableRandomRectWidth rectWidthVariant={1} />);
    expect(screen.getByText('Fallback')).toBeDefined();
    expect(Fallback).toHaveBeenCalledWith(
      {
        height: 1,
        width: 110,
        spacingTop: 0.5,
        disableRandomRectWidth: true,
        rectWidthVariant: getRectWidthVariant(1, 0),
      },
      {},
    );
  });

  it('should render meta fallback', () => {
    render(<ContentCellFallback disableRandomRectWidth meta subtitle title rectWidthVariant={1} />);
    expect(Fallback).toHaveBeenCalledWith(
      {
        height: 2,
        width: 50,
        disableRandomRectWidth: true,
        rectWidthVariant: getRectWidthVariant(1, 1),
      },
      {},
    );
  });

  it('should render title fallback', () => {
    render(<ContentCellFallback disableRandomRectWidth title rectWidthVariant={1} />);
    expect(screen.getByText('Fallback')).toBeDefined();
    expect(Fallback).toHaveBeenCalledWith(
      {
        height: 2,
        width: 90,
        disableRandomRectWidth: true,
        rectWidthVariant: getRectWidthVariant(1, 2),
      },
      {},
    );
  });

  it('should render subtitle fallback', () => {
    render(<ContentCellFallback disableRandomRectWidth subtitle rectWidthVariant={1} />);
    expect(screen.getByText('Fallback')).toBeDefined();
    expect(Fallback).toHaveBeenCalledWith(
      {
        height: 2,
        width: 90,
        disableRandomRectWidth: true,
        rectWidthVariant: getRectWidthVariant(1, 2),
      },
      {},
    );
  });
});
