import { render } from '@testing-library/react-native';

import { DotSymbol } from '../DotSymbol';

const DOTSYMBOL_TESTID = 'dot-status-test';

const src = 'https://images.coinbase.com/avatar?s=56';

describe('DotSymbol', () => {
  it('renders a DotSymbol', () => {
    const { getByTestId } = render(<DotSymbol testID={DOTSYMBOL_TESTID} source={{ uri: src }} />);

    expect(getByTestId(DOTSYMBOL_TESTID)).toBeTruthy();
  });
});
