import { Box } from '../../layout/Box';
import { TextBody } from '../../typography/TextBody';
import { InputStack } from '../InputStack';

export default {
  title: 'Core Components/InputStack',
  component: InputStack,
};

export const InputStackExamples = () => (
  <InputStack
    prependNode={
      <Box background="primary">
        <TextBody as="p" color="primaryForeground">
          Prepend
        </TextBody>
      </Box>
    }
    appendNode={
      <Box background="primary">
        <TextBody as="p" color="primaryForeground">
          Append
        </TextBody>
      </Box>
    }
    startNode={
      <Box background="positive" borderRadius="input">
        <TextBody as="p" color="positiveForeground">
          StartContent
        </TextBody>
      </Box>
    }
    endNode={
      <Box background="positive" borderRadius="input">
        <TextBody as="p" color="positiveForeground">
          EndContent
        </TextBody>
      </Box>
    }
    inputNode={
      <Box background="backgroundAlternate" flexGrow={2}>
        <TextBody as="p">Input</TextBody>
      </Box>
    }
    labelNode={
      <Box background="backgroundAlternate" width="100%" height={30}>
        <TextBody as="p">Label</TextBody>
      </Box>
    }
    helperTextNode={
      <Box background="backgroundOverlay" width="100%" height={30}>
        <TextBody as="p">HelperText</TextBody>
      </Box>
    }
    variant="primary"
  />
);

export const Append = () => (
  <InputStack
    appendNode={
      <Box background="primary" borderRadius="input">
        <TextBody as="p" color="primaryForeground">
          Append
        </TextBody>
      </Box>
    }
    startNode={
      <Box background="positive" borderRadius="input">
        <TextBody as="p" color="positiveForeground">
          StartContent
        </TextBody>
      </Box>
    }
    endNode={
      <Box background="positive" borderRadius="input">
        <TextBody as="p" color="positiveForeground">
          EndContent
        </TextBody>
      </Box>
    }
    inputNode={
      <Box background="backgroundAlternate" flexGrow={2}>
        <TextBody as="p">Input</TextBody>
      </Box>
    }
    labelNode={
      <Box background="backgroundAlternate" width="100%" height={30}>
        <TextBody as="p">Label</TextBody>
      </Box>
    }
    helperTextNode={
      <Box background="backgroundOverlay" width="100%" height={30}>
        <TextBody as="p">HelperText</TextBody>
      </Box>
    }
    variant="primary"
  />
);

export const Prepend = () => (
  <InputStack
    prependNode={
      <Box background="primary" borderRadius="input">
        <TextBody as="p" color="primaryForeground">
          Append
        </TextBody>
      </Box>
    }
    startNode={
      <Box background="positive" borderRadius="input">
        <TextBody as="p" color="positiveForeground">
          StartContent
        </TextBody>
      </Box>
    }
    endNode={
      <Box background="positive" borderRadius="input">
        <TextBody as="p" color="positiveForeground">
          EndContent
        </TextBody>
      </Box>
    }
    inputNode={
      <Box background="backgroundAlternate" flexGrow={2}>
        <TextBody as="p">Input</TextBody>
      </Box>
    }
    labelNode={
      <Box background="backgroundAlternate" width="100%" height={30}>
        <TextBody as="p">Label</TextBody>
      </Box>
    }
    helperTextNode={
      <Box background="backgroundOverlay" width="100%" height={30}>
        <TextBody as="p">HelperText</TextBody>
      </Box>
    }
    variant="primary"
  />
);
