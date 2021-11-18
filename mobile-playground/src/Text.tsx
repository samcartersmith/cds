import React from 'react';
import {
  TextBody,
  TextCaption,
  TextDisplay1,
  TextDisplay2,
  TextDisplay3,
  TextHeadline,
  TextLabel1,
  TextLabel2,
  TextLegal,
  TextTitle1,
  TextTitle2,
  TextTitle3,
  TextTitle4,
} from '@cbhq/cds-mobile/typography';

import Example from './internal/Example';
import ExamplesScreen from './internal/ExamplesScreen';

const TextScreen = () => {
  return (
    <ExamplesScreen>
      <Example title="Default">
        <TextDisplay1>Display1</TextDisplay1>
        <TextDisplay2>Display2</TextDisplay2>
        <TextDisplay3>Display3</TextDisplay3>
        <TextTitle1>Title1</TextTitle1>
        <TextTitle2>Title2</TextTitle2>
        <TextTitle3>Title3</TextTitle3>
        <TextTitle4>Title4</TextTitle4>
        <TextLabel1>Label1</TextLabel1>
        <TextLabel2>Label2</TextLabel2>
        <TextHeadline>Headline</TextHeadline>
        <TextBody>Body</TextBody>
        <TextCaption>Caption</TextCaption>
        <TextLegal>Legal</TextLegal>
      </Example>
      <Example title="Mono">
        <TextDisplay1 mono>Display1</TextDisplay1>
        <TextDisplay2 mono>Display2</TextDisplay2>
        <TextDisplay3 mono>Display3</TextDisplay3>
        <TextTitle1 mono>Title1</TextTitle1>
        <TextTitle2 mono>Title2</TextTitle2>
        <TextTitle3 mono>Title3</TextTitle3>
        <TextTitle4 mono>Title4</TextTitle4>
        <TextLabel1 mono>Label1</TextLabel1>
        <TextLabel2 mono>Label2</TextLabel2>
        <TextHeadline mono>Headline</TextHeadline>
        <TextBody mono>Body</TextBody>
        <TextCaption mono>Caption</TextCaption>
        <TextLegal mono>Legal</TextLegal>
      </Example>
    </ExamplesScreen>
  );
};

export default TextScreen;
