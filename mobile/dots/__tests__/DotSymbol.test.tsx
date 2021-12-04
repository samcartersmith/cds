import { render } from '@testing-library/react-native';

import { OFFSET } from '@cbhq/cds-common/hooks/useDotPlacementStyles';
import { DotSymbol } from '../DotSymbol';

const DOTSYMBOL_TESTID = 'dot-symbol-test';

const src = 'https://images.coinbase.com/avatar?s=56';

describe('DotSymbol', () => {
  it('renders a DotSymbol', () => {
    const { getByTestId } = render(<DotSymbol testID={DOTSYMBOL_TESTID} source={{ uri: src }} />);

    expect(getByTestId(DOTSYMBOL_TESTID)).toBeTruthy();
  });

  it('renders an image', () => {
    const { getByTestId } = render(<DotSymbol source={{ uri: src }} />);

    expect(getByTestId('dotsymbol-remote-image').props.source).toEqual({ uri: src });
  });

  it('renders an image when source is a string', () => {
    const { getByTestId } = render(<DotSymbol source={src} />);

    expect(getByTestId('dotsymbol-remote-image').props.source).toEqual({ uri: src });
  });

  it('Placed in the correct position relative to its children', () => {
    const { getByTestId } = render(
      <DotSymbol placement="bottom-start" source={src}>
        <div />
      </DotSymbol>,
    );

    expect(getByTestId('dotsymbol-inner-container')).toHaveStyle({
      position: 'absolute',
      bottom: OFFSET,
      start: OFFSET,
    });
  });
});
