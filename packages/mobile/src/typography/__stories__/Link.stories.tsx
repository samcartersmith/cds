/* eslint-disable react-native/no-raw-text */
/* eslint-disable jsx-a11y/anchor-is-valid  */
import React, { useCallback } from 'react';
import { capitalize } from '@cbhq/cds-utils';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { useWebBrowserOpener } from '../../hooks/useWebBrowserOpener';
import { Link } from '../Link';
import { TextBody } from '../TextBody';
import { TextHeadline } from '../TextHeadline';
import { TextLabel1 } from '../TextLabel1';
import { TextTitle1 } from '../TextTitle1';

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

const links = typographies.map((typography) => (
  <Example key={typography} inline>
    <TextHeadline>Link with Text style {typography}</TextHeadline>
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
        <TextHeadline>Goes to coinbase.com</TextHeadline>
        <Link to="https://www.coinbase.com/" variant="body">
          Go to Coinbase
        </Link>
      </Example>
      <Example inline>
        <TextHeadline>Coinbase link without protocol should crash</TextHeadline>
        <Link to="coinbase.com/" variant="body">
          Go to Coinbase
        </Link>
      </Example>
      <Example inline>
        <TextHeadline>Link Typography defaults to headline</TextHeadline>
        <Link to="https://www.coinbase.com/">Go to Coinbase (Headline)</Link>
      </Example>
      <Example inline>
        <TextHeadline>Testing color</TextHeadline>
        <Link color="negative" to="https://www.coinbase.com/" variant="title1">
          Go to Coinbase
        </Link>
        <Link underline color="negative" to="https://www.coinbase.com/" variant="title1">
          Go to Coinbase
        </Link>
      </Example>
      <Example inline>
        <TextHeadline>Testing onPress</TextHeadline>
        <Link color="negative" onPress={logPressed} variant="title1">
          Go to Coinbase
        </Link>
      </Example>
      <Example inline>
        <TextHeadline>Wrap in TextBody</TextHeadline>
        <TextBody align="center">
          Go here:{' '}
          <Link color="negative" onPress={logPressed} to="https://www.coinbase.com/" variant="body">
            Go to Coinbase
          </Link>
        </TextBody>
      </Example>
      <Example inline>
        <TextHeadline>Inherit parent text styles</TextHeadline>
        <TextTitle1 align="center">
          Go here: <Link to="https://www.coinbase.com/">Go to Coinbase</Link>
        </TextTitle1>
      </Example>
      <Example inline>
        <TextHeadline>onPress and to used together</TextHeadline>
        <Link color="negative" onPress={logPressed} to="https://www.coinbase.com/" variant="title1">
          Go to Coinbase
        </Link>
      </Example>
      <Example inline>
        <TextHeadline>forceOpenOutsideApp is set to false by default</TextHeadline>
        <Link color="negative" to="https://www.coinbase.com/" variant="title1">
          Go to Coinbase within App
        </Link>
      </Example>
      <Example inline>
        <TextHeadline>Incorrectly formatted Link</TextHeadline>
        <Link color="negative" to="xxx" variant="title1">
          Console.error when incorrectly formatted link is passed in
        </Link>
      </Example>
      <Example inline>
        <TextHeadline>test forceOpenOutsideApp is set to true</TextHeadline>
        <Link forceOpenOutsideApp color="negative" to="https://www.google.com" variant="title1">
          Go to Coinbase outside of App
        </Link>
      </Example>
      <Example inline>
        <TextHeadline>test can set readerMode</TextHeadline>
        <Link readerMode color="negative" to="https://www.coinbase.com/" variant="title1">
          ReaderMode set
        </Link>
      </Example>
      <Example inline>
        <TextHeadline>test preventRedirectionIntoApp</TextHeadline>
        <Link
          preventRedirectionIntoApp
          color="negative"
          to="https://www.google.com"
          variant="title1"
        >
          Test PreventRedirectionIntoApp
        </Link>
      </Example>
      <Example>
        <TextLabel1>
          The following examples do not work on IOS Simulator. Only work on devices
        </TextLabel1>
      </Example>
      <Example inline>
        <TextHeadline>tel Link</TextHeadline>
        <Link to="tel:111-111-1111" variant="title2">
          Call Someone
        </Link>
      </Example>
      <Example inline>
        <TextHeadline>mailto Link</TextHeadline>
        <Link to="mailto:someone@coinbase.com" variant="title2">
          Send email to Someone
        </Link>
      </Example>
    </ExampleScreen>
  );
};
export default LinkScreen;
