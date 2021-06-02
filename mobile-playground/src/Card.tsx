import { Button } from '@cbhq/cds-mobile/buttons/Button';
import { Box, Card } from '@cbhq/cds-mobile/layout';
import { TextBody, TextLabel1 } from '@cbhq/cds-mobile/typography';

import { loremIpsum } from './data/lorem';
import Example from './internal/Example';
import ExamplesScreen from './internal/ExamplesScreen';

const onPressConsole = () => console.log('pressed');

const sharedProps = { spacing: 2 } as const;
const sharedPressProps = { onPress: onPressConsole, ...sharedProps } as const;
const pinnedSharedProps = { ...sharedProps, elevation: 2 } as const;
const pinnedSharedWrapperProps = {
  background: 'backgroundAlternate',
  width: '100%',
  height: 100,
} as const;

const CardScreen = () => {
  return (
    <ExamplesScreen>
      <Example title="Clickable Cards">
        <Card {...sharedPressProps} elevation={1}>
          <TextLabel1 spacingBottom={1}>Elevation 1</TextLabel1>
          <TextBody spacingBottom={3}>{loremIpsum}</TextBody>
          <Button variant="secondary">Secondary button</Button>
        </Card>

        <Card {...sharedPressProps} elevation={2}>
          <TextLabel1 spacingBottom={1}>Elevation 2</TextLabel1>
          <TextBody spacingBottom={3}>{loremIpsum}</TextBody>
          <Button variant="secondary">Secondary button</Button>
        </Card>
      </Example>
      <Example title="Clickable colored Cards">
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
      </Example>
      <Example title="Non-clickable Cards">
        <Card {...sharedProps} elevation={1}>
          <TextLabel1 spacingBottom={1}>Elevation 1</TextLabel1>
          <TextBody>{loremIpsum}</TextBody>
        </Card>

        <Card {...sharedProps} elevation={2}>
          <TextLabel1 spacingBottom={1}>Elevation 2</TextLabel1>
          <TextBody>{loremIpsum}</TextBody>
        </Card>
      </Example>
      <Example title="Non-clickable colored Cards">
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
      <Example title="Pinned - top">
        <Box {...pinnedSharedWrapperProps}>
          <Card {...pinnedSharedProps} pin="top">
            <TextLabel1>Top</TextLabel1>
          </Card>
        </Box>
      </Example>
      <Example title="Pinned - right">
        <Box {...pinnedSharedWrapperProps}>
          <Card {...pinnedSharedProps} pin="right">
            <TextLabel1>Right</TextLabel1>
          </Card>
        </Box>
      </Example>
      <Example title="Pinned - bottom">
        <Box {...pinnedSharedWrapperProps}>
          <Card {...pinnedSharedProps} pin="bottom">
            <TextLabel1>Bottom</TextLabel1>
          </Card>
        </Box>
      </Example>
      <Example title="Pinned - left">
        <Box {...pinnedSharedWrapperProps}>
          <Card {...pinnedSharedProps} pin="left">
            <TextLabel1>Left</TextLabel1>
          </Card>
        </Box>
      </Example>
    </ExamplesScreen>
  );
};

export default CardScreen;
