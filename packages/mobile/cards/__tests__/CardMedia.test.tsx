import { SvgXml } from 'react-native-svg';
import { render } from '@testing-library/react-native';

import { CardPictogram, CardSpotRectangle, CardSpotSquare } from '..';

describe('CardMedia.test', () => {
  it('renders spot rectangle', () => {
    const result = render(<CardSpotRectangle name="apiKey" />);
    expect(result.UNSAFE_getByType(SvgXml)).toBeTruthy();
  });

  it('renders spot square', () => {
    const result = render(<CardSpotSquare name="adaStaking" />);
    expect(result.UNSAFE_getByType(SvgXml)).toBeTruthy();
  });

  it('renders pictogram', () => {
    const result = render(<CardPictogram name="2fa" />);
    expect(result.UNSAFE_getByType(SvgXml)).toBeTruthy();
  });
});
