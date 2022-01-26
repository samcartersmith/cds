import { render } from '@testing-library/react-native';
import LottieView from 'lottie-react-native';
import { nux } from '@cbhq/cds-lottie-files/nux';

import { Lottie } from '../Lottie';

describe('Lottie', () => {
  it('renders a LottieView', () => {
    const result = render(<Lottie source={nux} />);

    expect(result.UNSAFE_queryAllByType(LottieView)).toHaveLength(1);
  });
});
