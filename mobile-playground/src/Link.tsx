import { ThemeProvider } from '@cbhq/cds-mobile/system/ThemeProvider';
import { Link } from '@cbhq/cds-mobile/typography/Link';
import { TextBody } from '@cbhq/cds-mobile/typography/TextBody';
import { TextHeadline } from '@cbhq/cds-mobile/typography/TextHeadline';
import { TextLabel1 } from '@cbhq/cds-mobile/typography/TextLabel1';

import Example from './internal/Example';
import ExamplesScreen from './internal/ExamplesScreen';

const LinkScreen = () => {
  return (
    <ExamplesScreen>
      <Example inline>
        <TextHeadline>Goes to coinbase.com</TextHeadline>
        <Link to="https://www.coinbase.com/">Go to Coinbase</Link>
      </Example>
      <Example inline>
        <TextHeadline>Testing color</TextHeadline>
        <Link to="https://www.coinbase.com/" color="negative">
          Go to Coinbase
        </Link>
      </Example>
      <Example inline>
        <TextHeadline>Testing onPress</TextHeadline>
        <Link onPress={() => console.log('Testing on press')} color="negative">
          Go to Coinbase
        </Link>
      </Example>
      <Example inline>
        <TextHeadline>Wrap in TextBody</TextHeadline>
        <TextBody>
          Go here:
          <Link
            to="https://www.coinbase.com/"
            onPress={() => console.log('Testing on press')}
            color="negative"
          >
            Go to Coinbase
          </Link>
        </TextBody>
      </Example>
      <Example inline>
        <TextHeadline>Used at the same time</TextHeadline>
        <Link
          onPress={() => console.log('Testing on press')}
          to="https://www.coinbase.com/"
          color="negative"
        >
          Go to Coinbase
        </Link>
      </Example>
      <Example inline>
        <ThemeProvider spectrum="dark">
          <Link to="https://www.coinbase.com/">Testing Dark Mode</Link>
        </ThemeProvider>
      </Example>
      <Example>
        <TextLabel1>
          The following examples do not work on IOS Simulator. Only work on devices
        </TextLabel1>
      </Example>
      <Example inline>
        <TextHeadline>tel Link</TextHeadline>
        <Link to="tel:111-111-1111">Call Someone</Link>
      </Example>
      <Example inline>
        <TextHeadline>mailto Link</TextHeadline>
        <Link to="mailto:someone@coinbase.com">Send email to Someone</Link>
      </Example>
    </ExamplesScreen>
  );
};
export default LinkScreen;
