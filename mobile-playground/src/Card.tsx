import { Card } from '@cbhq/cds-mobile/layout/Card';
import { TextBody, TextLabel1, TextTitle2 } from '@cbhq/cds-mobile/typography';

import Example from './internal/Example';
import ExamplesScreen from './internal/ExamplesScreen';

const onPressConsole = () => console.log('pressed');
const loremIpsum =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eu justo nulla. Nam eu blandit dui, a dignissim mi.';

const sharedProps = { spacing: 2 } as const;
const sharedPressProps = { onPress: onPressConsole, ...sharedProps } as const;

const CardScreen = () => {
  return (
    <ExamplesScreen>
      <Example title="Card">
        <TextTitle2>Clickable Cards</TextTitle2>
        <Card {...sharedPressProps} elevation={1}>
          <TextLabel1 spacingBottom={1}>Elevation 1</TextLabel1>
          <TextBody>{loremIpsum}</TextBody>
        </Card>

        <Card {...sharedPressProps} elevation={2}>
          <TextLabel1 spacingBottom={1}>Elevation 2</TextLabel1>
          <TextBody>{loremIpsum}</TextBody>
        </Card>

        <TextTitle2>Clickable colored Cards</TextTitle2>
        <Card {...sharedPressProps} background="primary">
          <TextLabel1 spacingBottom={1} color="primaryForeground">
            Primary
          </TextLabel1>
          <TextBody color="primaryForeground">{loremIpsum}</TextBody>
        </Card>

        <Card {...sharedPressProps} background="positive">
          <TextLabel1 spacingBottom={1} color="positiveForeground">
            Positive
          </TextLabel1>
          <TextBody color="positiveForeground">{loremIpsum}</TextBody>
        </Card>

        <Card {...sharedPressProps} background="negative">
          <TextLabel1 spacingBottom={1} color="negativeForeground">
            Positive
          </TextLabel1>
          <TextBody color="negativeForeground">{loremIpsum}</TextBody>
        </Card>

        <TextTitle2>Non-clickable Cards</TextTitle2>
        <Card {...sharedProps} elevation={1}>
          <TextLabel1 spacingBottom={1}>Elevation 1</TextLabel1>
          <TextBody>{loremIpsum}</TextBody>
        </Card>

        <Card {...sharedProps} elevation={2}>
          <TextLabel1 spacingBottom={1}>Elevation 2</TextLabel1>
          <TextBody>{loremIpsum}</TextBody>
        </Card>

        <TextTitle2>Non-clickable colored Cards</TextTitle2>
        <Card {...sharedProps} background="primary">
          <TextLabel1 spacingBottom={1} color="primaryForeground">
            Primary
          </TextLabel1>
          <TextBody color="primaryForeground">{loremIpsum}</TextBody>
        </Card>

        <Card {...sharedProps} background="positive">
          <TextLabel1 spacingBottom={1} color="positiveForeground">
            Positive
          </TextLabel1>
          <TextBody color="positiveForeground">{loremIpsum}</TextBody>
        </Card>

        <Card {...sharedProps} background="negative">
          <TextLabel1 spacingBottom={1} color="negativeForeground">
            Positive
          </TextLabel1>
          <TextBody color="negativeForeground">{loremIpsum}</TextBody>
        </Card>
      </Example>
    </ExamplesScreen>
  );
};

export default CardScreen;
