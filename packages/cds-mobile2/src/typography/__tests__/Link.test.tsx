import TestRenderer from 'react-test-renderer';
import { fireEvent, render, screen } from '@testing-library/react-native';
import { LinkTypography } from '@cbhq/cds-common2/types/LinkBaseProps';

import { DefaultThemeProvider } from '../../utils/testHelpers';
import { Link, TYPOGRAPHY_MAP } from '../Link';

const TEST_ID = 'link';
const URL = 'www.coinbase.com';

describe('Link', () => {
  it('passes a11y', () => {
    render(
      <DefaultThemeProvider>
        <Link testID={TEST_ID} to="/" variant="body">
          Child
        </Link>
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId(TEST_ID)).toBeAccessible();
  });

  it('renders a children text', () => {
    render(
      <DefaultThemeProvider>
        <Link to="/" variant="body">
          Child
        </Link>
      </DefaultThemeProvider>,
    );

    expect(screen.getByText('Child')).not.toBeNull();
  });

  it('renders a link', () => {
    render(
      <DefaultThemeProvider>
        <Link testID={TEST_ID} to="/">
          Child
        </Link>
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId(TEST_ID)).toBeTruthy();
  });

  const variants = Object.keys(TYPOGRAPHY_MAP) as LinkTypography[];

  variants.forEach((variant) => {
    it(`variant prop: "${variant}" works properly and passess a11y`, async () => {
      const linkRenderer = TestRenderer.create(
        <DefaultThemeProvider>
          <Link testID={TEST_ID} to="/" variant={variant}>
            Child
          </Link>
        </DefaultThemeProvider>,
      );

      const linkInstance = await linkRenderer.root.findByProps({ testID: TEST_ID });
      expect(linkInstance.props.variant).toEqual(variant);
      expect(linkInstance).toBeAccessible();
    });
  });

  it('fires `onPress` when pressed', () => {
    const spy = jest.fn();
    render(
      <DefaultThemeProvider>
        <Link onPress={spy} testID={TEST_ID} to="/">
          Child
        </Link>
      </DefaultThemeProvider>,
    );

    fireEvent.press(screen.getByTestId(TEST_ID));

    expect(spy).toHaveBeenCalled();
  });

  it('to prop works as expected', async () => {
    const linkRenderer = TestRenderer.create(
      <DefaultThemeProvider>
        <Link testID={TEST_ID} to={URL}>
          Child
        </Link>
      </DefaultThemeProvider>,
    );
    const linkInstance = await linkRenderer.root.findByProps({ testID: TEST_ID });
    expect(linkInstance.props.to).toEqual(URL);
  });

  it('can set forceOpenOutsideApp to true', async () => {
    const linkRenderer = TestRenderer.create(
      <DefaultThemeProvider>
        <Link forceOpenOutsideApp testID={TEST_ID} to={URL}>
          Child
        </Link>
      </DefaultThemeProvider>,
    );
    const link = await linkRenderer.root.findByProps({ testID: TEST_ID });
    expect(link.props.forceOpenOutsideApp).toBe(true);
  });

  it('can set readerMode to true', async () => {
    const linkRenderer = TestRenderer.create(
      <DefaultThemeProvider>
        <Link readerMode testID={TEST_ID} to={URL}>
          Child
        </Link>
      </DefaultThemeProvider>,
    );
    const link = await linkRenderer.root.findByProps({ testID: TEST_ID });
    expect(link.props.readerMode).toBe(true);
  });

  it('removes text style when inherited', () => {
    render(
      <DefaultThemeProvider>
        <Link testID={TEST_ID} to={URL} variant="inherit">
          Child
        </Link>
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId(TEST_ID).props.style[1][1]).toBe(false);
  });

  it('inherits by default', () => {
    render(
      <DefaultThemeProvider>
        <Link testID={TEST_ID} to={URL}>
          Child
        </Link>
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId(TEST_ID).props.style[1][1]).toBe(false);
  });
});
