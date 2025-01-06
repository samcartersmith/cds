import { render, screen } from '@testing-library/react-native';
import LottieView from 'lottie-react-native';
import { nux } from '@cbhq/cds-lottie-files/nux';

import { Lottie } from '../Lottie';

describe('Lottie', () => {
  it('renders a LottieView', () => {
    render(<Lottie source={nux} />);

    expect(screen.UNSAFE_queryAllByType(LottieView)).toHaveLength(1);
  });
});
