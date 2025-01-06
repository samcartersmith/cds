import { SvgXml } from 'react-native-svg';
import { render, screen } from '@testing-library/react-native';

import { CardMedia } from '../CardMedia';

describe('CardMedia.test', () => {
  it('renders spot square', () => {
    render(<CardMedia name="sparkleToken" placement="above" type="spotSquare" />);
    expect(screen.UNSAFE_getByType(SvgXml)).toBeTruthy();
  });

  it('renders pictogram', () => {
    render(<CardMedia name="2fa" placement="above" type="pictogram" />);
    expect(screen.UNSAFE_getByType(SvgXml)).toBeTruthy();
  });
});
