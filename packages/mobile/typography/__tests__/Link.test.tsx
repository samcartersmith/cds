import TestRenderer from 'react-test-renderer';
import { fireEvent, render } from '@testing-library/react-native';

import { Link } from '../Link';

const TEST_ID = 'link';
const URL = 'www.coinbase.com';

describe('Link', () => {
  it('renders a children text', () => {
    const result = render(
      <Link variant="body" to="/">
        Child
      </Link>,
    );

    expect(result.queryByText('Child')).not.toBeNull();
  });

  it('renders a link', () => {
    const result = render(
      <Link to="/" testID={TEST_ID}>
        Child
      </Link>,
    );

    expect(result.queryByTestId(TEST_ID)).toBeTruthy();
  });

  it('variant prop works properly', () => {
    const variants = [
      'body',
      'caption',
      'headline',
      'label1',
      'label2',
      'title1',
      'title2',
      'title3',
      'legal',
    ] as const;

    variants.forEach((variant) => {
      const linkRenderer = TestRenderer.create(
        <Link to="/" variant={variant} testID={TEST_ID}>
          Child
        </Link>,
      );
      const linkInstance = linkRenderer.root;
      expect(linkInstance.props.variant).toEqual(variant);
    });
  });

  it('fires `onPress` when pressed', () => {
    const spy = jest.fn();
    const result = render(
      <Link to="/" onPress={spy} testID={TEST_ID}>
        Child
      </Link>,
    );

    fireEvent.press(result.getByTestId(TEST_ID));

    expect(spy).toHaveBeenCalled();
  });

  it('to prop works as expected', () => {
    const linkRenderer = TestRenderer.create(
      <Link to={URL} testID={TEST_ID}>
        Child
      </Link>,
    );
    const linkInstance = linkRenderer.root;
    expect(linkInstance.props.to).toEqual(URL);
  });

  it('can set forceOpenOutsideApp to true', () => {
    const linkRenderer = TestRenderer.create(
      <Link to={URL} forceOpenOutsideApp testID={TEST_ID}>
        Child
      </Link>,
    );
    const linkInstance = linkRenderer.root;
    expect(linkInstance.props.forceOpenOutsideApp).toBe(true);
  });

  it('can set readerMode to true', () => {
    const linkRenderer = TestRenderer.create(
      <Link to={URL} readerMode testID={TEST_ID}>
        Child
      </Link>,
    );
    const linkInstance = linkRenderer.root;
    expect(linkInstance.props.readerMode).toBe(true);
  });

  it('removes text style when inherited', () => {
    const { getByTestId } = render(
      <Link variant="inherit" to={URL} testID={TEST_ID}>
        Child
      </Link>,
    );
    // specifically test text style, check line 124 in createText.tsx
    expect(getByTestId(TEST_ID).props.style[2]).toBe(false);
  });

  it('inherits by default', () => {
    const { getByTestId } = render(
      <Link to={URL} testID={TEST_ID}>
        Child
      </Link>,
    );
    expect(getByTestId(TEST_ID).props.style[2]).toBe(false);
  });
});
