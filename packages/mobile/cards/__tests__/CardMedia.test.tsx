import { SvgXml } from 'react-native-svg';
import { render, screen } from '@testing-library/react-native';

import { CardPictogram, CardSpotRectangle, CardSpotSquare } from '..';

describe('CardMedia.test', () => {
  it('renders spot rectangle', () => {
    render(<CardSpotRectangle name="apiKey" />);
    expect(screen.UNSAFE_getByType(SvgXml)).toBeTruthy();
  });

  it('renders spot square', () => {
    render(<CardSpotSquare name="adaStaking" />);
    expect(screen.UNSAFE_getByType(SvgXml)).toBeTruthy();
  });

  it('renders pictogram', () => {
    render(<CardPictogram name="2fa" />);
    expect(screen.UNSAFE_getByType(SvgXml)).toBeTruthy();
  });
});
