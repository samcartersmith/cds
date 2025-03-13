/* eslint-disable react-native/no-raw-text, jsx-a11y/anchor-is-valid  */
import React, { useCallback } from 'react';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { useWebBrowserOpener } from '../../hooks/useWebBrowserOpener';
import { Link } from '../Link';
import { Text } from '../Text';

const typographies = [
  'title1',
  'title2',
  'title3',
  'headline',
  'body',
  'label1',
  'label2',
  'caption',
  'legal',
] as const;

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.toLowerCase().slice(1);

const links = typographies.map((typography) => (
  <Example key={typography} inline>
    <Text font="headline">Link with Text style {typography}</Text>
    <Link to="https://www.coinbase.com/" variant={typography}>
      {capitalize(typography)}
    </Link>
    <Link underline to="https://www.coinbase.com/" variant={typography}>
      {capitalize(typography)}
    </Link>
  </Example>
));

const logPressed = () => console.log('Link is pressed');
const OPEN_WEB_BROWSER_OPTIONS = {
  // cds custom properties
  preventRedirectionIntoApp: true,
  forceOpenOutsideApp: true,
  // iOS Properties
  dismissButtonStyle: 'cancel',
  readerMode: true,
  animated: false,
  modalPresentationStyle: 'fullScreen',
  modalTransitionStyle: 'coverVertical',
  modalEnabled: true,
  enableBarCollapsing: false,
  // Android Properties
  showTitle: true,
  navigationBarColor: 'black',
  navigationBarDividerColor: 'white',
  enableUrlBarHiding: true,
  enableDefaultShare: true,
  forceCloseOnRedirection: false,
  // Specify full animation resource identifier(package:anim/name)
  // or only resource name(in case of animation bundled with app).
  animations: {
    startEnter: 'slide_in_right',
    startExit: 'slide_out_left',
    endEnter: 'slide_in_left',
    endExit: 'slide_out_right',
  },
  headers: {
    'my-custom-header': 'my custom header value',
  },
} as const;

const LinkScreen = function LinkScreen() {
  const openURL = useWebBrowserOpener();
  const openURLOnPress = useCallback(
    async () => openURL('https://www.coinbase.com/', OPEN_WEB_BROWSER_OPTIONS),
    [openURL],
  );

  return (
    <ExampleScreen>
      {links}
      <Example inline>
        <Link onPress={openURLOnPress} variant="body">
          Test useWebBrowserOpener hook
        </Link>
      </Example>
      <Example inline>
        <Text font="headline">Goes to coinbase.com</Text>
        <Link to="https://www.coinbase.com/" variant="body">
          Go to Coinbase
        </Link>
      </Example>
      <Example inline>
        <Text font="headline">Coinbase link without protocol should crash</Text>
        <Link to="coinbase.com/" variant="body">
          Go to Coinbase
        </Link>
      </Example>
      <Example inline>
        <Text font="headline">Link Typography defaults to headline</Text>
        <Link to="https://www.coinbase.com/">Go to Coinbase (Headline)</Link>
      </Example>
      <Example inline>
        <Text font="headline">Testing color</Text>
        <Link color="fgNegative" to="https://www.coinbase.com/" variant="title1">
          Go to Coinbase
        </Link>
        <Link underline color="fgNegative" to="https://www.coinbase.com/" variant="title1">
          Go to Coinbase
        </Link>
      </Example>
      <Example inline>
        <Text font="headline">Testing onPress</Text>
        <Link color="fgNegative" onPress={logPressed} variant="title1">
          Go to Coinbase
        </Link>
      </Example>
      <Example inline>
        <Text font="headline">Wrap in TextBody</Text>
        <Text align="center">
          Go here:{' '}
          <Link
            color="fgNegative"
            onPress={logPressed}
            to="https://www.coinbase.com/"
            variant="body"
          >
            Go to Coinbase
          </Link>
        </Text>
      </Example>
      <Example inline>
        <Text font="headline">Inherit parent text styles</Text>
        <Text align="center" font="title1">
          Go here: <Link to="https://www.coinbase.com/">Go to Coinbase</Link>
        </Text>
      </Example>
      <Example inline>
        <Text font="headline">onPress and to used together</Text>
        <Link
          color="fgNegative"
          onPress={logPressed}
          to="https://www.coinbase.com/"
          variant="title1"
        >
          Go to Coinbase
        </Link>
      </Example>
      <Example inline>
        <Text font="headline">forceOpenOutsideApp is set to false by default</Text>
        <Link color="fgNegative" to="https://www.coinbase.com/" variant="title1">
          Go to Coinbase within App
        </Link>
      </Example>
      <Example inline>
        <Text font="headline">Incorrectly formatted Link</Text>
        <Link color="fgNegative" to="xxx" variant="title1">
          Console.error when incorrectly formatted link is passed in
        </Link>
      </Example>
      <Example inline>
        <Text font="headline">test forceOpenOutsideApp is set to true</Text>
        <Link forceOpenOutsideApp color="fgNegative" to="https://www.google.com" variant="title1">
          Go to Coinbase outside of App
        </Link>
      </Example>
      <Example inline>
        <Text font="headline">test can set readerMode</Text>
        <Link readerMode color="fgNegative" to="https://www.coinbase.com/" variant="title1">
          ReaderMode set
        </Link>
      </Example>
      <Example inline>
        <Text font="headline">test preventRedirectionIntoApp</Text>
        <Link
          preventRedirectionIntoApp
          color="fgNegative"
          to="https://www.google.com"
          variant="title1"
        >
          Test PreventRedirectionIntoApp
        </Link>
      </Example>
      <Example>
        <Text font="label1">
          The following examples do not work on IOS Simulator. Only work on devices
        </Text>
      </Example>
      <Example inline>
        <Text font="headline">tel Link</Text>
        <Link to="tel:111-111-1111" variant="title2">
          Call Someone
        </Link>
      </Example>
      <Example inline>
        <Text font="headline">mailto Link</Text>
        <Link to="mailto:someone@coinbase.com" variant="title2">
          Send email to Someone
        </Link>
      </Example>
    </ExampleScreen>
  );
};
export default LinkScreen;
