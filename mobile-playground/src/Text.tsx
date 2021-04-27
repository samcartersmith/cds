import {
  TextBody,
  TextCaption,
  TextDisplay1,
  TextDisplay2,
  TextHeadline,
  TextLabel1,
  TextLabel2,
  TextLegal,
  TextTitle1,
  TextTitle2,
  TextTitle3,
} from '@cbhq/cds-mobile/typography';

import Example from './internal/Example';
import ExamplesScreen from './internal/ExamplesScreen';

const TextScreen = () => {
  return (
    <ExamplesScreen>
      <Example>
        <TextDisplay1>Display1</TextDisplay1>
        <TextDisplay2>Display1</TextDisplay2>
        <TextTitle1>Title1</TextTitle1>
        <TextTitle2>Title2</TextTitle2>
        <TextTitle3>Title3</TextTitle3>
        <TextLabel1>Label1</TextLabel1>
        <TextLabel2>Label2</TextLabel2>
        <TextHeadline>Headline</TextHeadline>
        <TextBody>Body</TextBody>
        <TextCaption>Caption</TextCaption>
        <TextLegal>Legal</TextLegal>
      </Example>
    </ExamplesScreen>
  );
};

export default TextScreen;
