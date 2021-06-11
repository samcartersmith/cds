import { HeroSquareIllustration } from '@cbhq/cds-mobile/illustrations/HeroSquareIllustration';
import { PictogramIllustration } from '@cbhq/cds-mobile/illustrations/PictogramIllustration';
import { SpotRectangleIllustration } from '@cbhq/cds-mobile/illustrations/SpotRectangleIllustration';
import { SpotSquareIllustration } from '@cbhq/cds-mobile/illustrations/SpotSquareIllustration';
import { Box } from '@cbhq/cds-mobile/layout/Box';
import { TextCaption } from '@cbhq/cds-mobile/typography/TextCaption';

import {
  heroSquareNames,
  spotRectangleNames,
  pictogramNames,
  spotSquareNames,
} from './data/illustrationData';
import Example from './internal/Example';
import ExampleScreen from './internal/ExamplesScreen';

const IllustrationScreen = () => {
  return (
    <ExampleScreen>
      <Example title="Herosquare">
        {heroSquareNames.map(name => (
          <Box key={`${name}_herosquare`}>
            <TextCaption>{name}</TextCaption>
            <HeroSquareIllustration name={name} />
          </Box>
        ))}
      </Example>
      <Example title="Spotrectangle">
        {spotRectangleNames.map(name => (
          <Box key={`${name}_spotrectangle`}>
            <TextCaption>{name}</TextCaption>
            <SpotRectangleIllustration name={name} />
          </Box>
        ))}
      </Example>
      <Example title="Pictogram">
        {pictogramNames.map(name => (
          <Box key={`${name}_pictogram`}>
            <TextCaption>{name}</TextCaption>
            <PictogramIllustration name={name} />
          </Box>
        ))}
      </Example>
      <Example title="Spotsquare">
        {spotSquareNames.map(name => (
          <Box key={`${name}_spotsquare`}>
            <TextCaption>{name}</TextCaption>
            <SpotSquareIllustration name={name} />
          </Box>
        ))}
      </Example>
    </ExampleScreen>
  );
};

export default IllustrationScreen;
