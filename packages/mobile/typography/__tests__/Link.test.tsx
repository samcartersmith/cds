import TestRenderer from 'react-test-renderer';
import { fireEvent, render, screen } from '@testing-library/react-native';

import { Link } from '../Link';

const TEST_ID = 'link';
const URL = 'www.coinbase.com';

describe('Link', () => {
  it('passes a11y', () => {
    render(
      <Link variant="body" testID={TEST_ID} to="/">
        Child
      </Link>,
    );

    expect(screen.getByTestId(TEST_ID)).toBeAccessible();
  });

  it('renders a children text', () => {
    render(
      <Link variant="body" to="/">
        Child
      </Link>,
    );

    expect(screen.getByText('Child')).not.toBeNull();
  });

  it('renders a link', () => {
    render(
      <Link to="/" testID={TEST_ID}>
        Child
      </Link>,
    );

    expect(screen.getByTestId(TEST_ID)).toBeTruthy();
  });

  it('variant prop works properly and passes a11y', () => {
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
      expect(linkInstance).toBeAccessible();
    });
  });

  it('fires `onPress` when pressed', () => {
    const spy = jest.fn();
    render(
      <Link to="/" onPress={spy} testID={TEST_ID}>
        Child
      </Link>,
    );

    fireEvent.press(screen.getByTestId(TEST_ID));

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
    render(
      <Link variant="inherit" to={URL} testID={TEST_ID}>
        Child
      </Link>,
    );
    // specifically test text style, check line 124 in createText.tsx
    expect(screen.getByTestId(TEST_ID).props.style[2]).toBe(false);
  });

  it('inherits by default', () => {
    render(
      <Link to={URL} testID={TEST_ID}>
        Child
      </Link>,
    );
    expect(screen.getByTestId(TEST_ID).props.style[2]).toBe(false);
  });
});
