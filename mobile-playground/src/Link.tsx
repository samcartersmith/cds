import { LinkTypography } from '@cbhq/cds-common/types/LinkBaseProps';
import { Link } from '@cbhq/cds-mobile/typography/Link';
import { TextBody } from '@cbhq/cds-mobile/typography/TextBody';
import { TextHeadline } from '@cbhq/cds-mobile/typography/TextHeadline';
import { TextLabel1 } from '@cbhq/cds-mobile/typography/TextLabel1';
import { capitalize } from '@cbhq/cds-utils';

import Example from './internal/Example';
import ExamplesScreen from './internal/ExamplesScreen';

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

const links = typographies.map(typography => (
  <Example inline key={typography}>
    <TextHeadline>Link with Text style {typography}</TextHeadline>
    <Link variant={typography as LinkTypography} to="https://www.coinbase.com/">
      {capitalize(typography)}
    </Link>
  </Example>
));

const LinkScreen = () => {
  return (
    <ExamplesScreen>
      {links}
      <Example inline>
        <TextHeadline>Goes to coinbase.com</TextHeadline>
        <Link variant="title1" to="https://www.coinbase.com/">
          Go to Coinbase
        </Link>
      </Example>
      <Example inline>
        <TextHeadline>Link Typography defaults to headline</TextHeadline>
        <Link to="https://www.coinbase.com/">Go to Coinbase (Headline)</Link>
      </Example>
      <Example inline>
        <TextHeadline>Testing color</TextHeadline>
        <Link variant="title1" to="https://www.coinbase.com/" color="negative">
          Go to Coinbase
        </Link>
      </Example>
      <Example inline>
        <TextHeadline>Testing onPress</TextHeadline>
        <Link variant="title1" onPress={() => console.log('Testing on press')} color="negative">
          Go to Coinbase
        </Link>
      </Example>
      <Example inline>
        <TextHeadline>Wrap in TextBody</TextHeadline>
        <TextBody align="center">
          Go here:{' '}
          <Link
            variant="body"
            to="https://www.coinbase.com/"
            onPress={() => console.log('Testing on press')}
            color="negative"
          >
            Go to Coinbase
          </Link>
        </TextBody>
      </Example>
      <Example inline>
        <TextHeadline>onPress and to used together</TextHeadline>
        <Link
          variant="title1"
          onPress={() => console.log('Testing on press')}
          to="https://www.coinbase.com/"
          color="negative"
        >
          Go to Coinbase
        </Link>
      </Example>
      <Example inline>
        <TextHeadline>forceOpenOutsideApp is set to false by default</TextHeadline>
        <Link variant="title1" to="https://www.coinbase.com/" color="negative">
          Go to Coinbase within App
        </Link>
      </Example>
      <Example inline>
        <TextHeadline>Incorrectly formatted Link</TextHeadline>
        <Link variant="title1" to="xxx" color="negative">
          Console.error when incorrectly formatted link is passed in
        </Link>
      </Example>
      <Example inline>
        <TextHeadline>test forceOpenOutsideApp is set to true</TextHeadline>
        <Link variant="title1" forceOpenOutsideApp to="https://www.google.com" color="negative">
          Go to Coinbase outside of App
        </Link>
      </Example>
      <Example inline>
        <TextHeadline>test preventRedirectionIntoApp</TextHeadline>
        <Link
          variant="title1"
          preventRedirectionIntoApp
          to="https://www.google.com"
          color="negative"
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
        <Link variant="title2" to="tel:111-111-1111">
          Call Someone
        </Link>
      </Example>
      <Example inline>
        <TextHeadline>mailto Link</TextHeadline>
        <Link variant="title2" to="mailto:someone@coinbase.com">
          Send email to Someone
        </Link>
      </Example>
    </ExamplesScreen>
  );
};
export default LinkScreen;
