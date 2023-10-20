import { Box } from '../../layout/Box';
import { TextBody } from '../../typography/TextBody';
import { InputStack } from '../InputStack';

export default {
  title: 'Core Components/InputStack',
  component: InputStack,
};

export const InputStackExamples = () => (
  <InputStack
    appendNode={
      <Box background="primary">
        <TextBody as="p" color="primaryForeground">
          Append
        </TextBody>
      </Box>
    }
    endNode={
      <Box background="positive" borderRadius="rounded">
        <TextBody as="p" color="positiveForeground">
          EndContent
        </TextBody>
      </Box>
    }
    helperTextNode={
      <Box background="backgroundOverlay" height={30} width="100%">
        <TextBody as="p">HelperText</TextBody>
      </Box>
    }
    inputNode={
      <Box background="backgroundAlternate" flexGrow={2}>
        <TextBody as="p">Input</TextBody>
      </Box>
    }
    labelNode={
      <Box background="backgroundAlternate" height={30} width="100%">
        <TextBody as="p">Label</TextBody>
      </Box>
    }
    prependNode={
      <Box background="primary">
        <TextBody as="p" color="primaryForeground">
          Prepend
        </TextBody>
      </Box>
    }
    startNode={
      <Box background="positive" borderRadius="rounded">
        <TextBody as="p" color="positiveForeground">
          StartContent
        </TextBody>
      </Box>
    }
    variant="primary"
  />
);

export const Append = () => (
  <InputStack
    appendNode={
      <Box background="primary" borderRadius="rounded">
        <TextBody as="p" color="primaryForeground">
          Append
        </TextBody>
      </Box>
    }
    endNode={
      <Box background="positive" borderRadius="rounded">
        <TextBody as="p" color="positiveForeground">
          EndContent
        </TextBody>
      </Box>
    }
    helperTextNode={
      <Box background="backgroundOverlay" height={30} width="100%">
        <TextBody as="p">HelperText</TextBody>
      </Box>
    }
    inputNode={
      <Box background="backgroundAlternate" flexGrow={2}>
        <TextBody as="p">Input</TextBody>
      </Box>
    }
    labelNode={
      <Box background="backgroundAlternate" height={30} width="100%">
        <TextBody as="p">Label</TextBody>
      </Box>
    }
    startNode={
      <Box background="positive" borderRadius="rounded">
        <TextBody as="p" color="positiveForeground">
          StartContent
        </TextBody>
      </Box>
    }
    variant="primary"
  />
);

export const Prepend = () => (
  <InputStack
    endNode={
      <Box background="positive" borderRadius="rounded">
        <TextBody as="p" color="positiveForeground">
          EndContent
        </TextBody>
      </Box>
    }
    helperTextNode={
      <Box background="backgroundOverlay" height={30} width="100%">
        <TextBody as="p">HelperText</TextBody>
      </Box>
    }
    inputNode={
      <Box background="backgroundAlternate" flexGrow={2}>
        <TextBody as="p">Input</TextBody>
      </Box>
    }
    labelNode={
      <Box background="backgroundAlternate" height={30} width="100%">
        <TextBody as="p">Label</TextBody>
      </Box>
    }
    prependNode={
      <Box background="primary" borderRadius="rounded">
        <TextBody as="p" color="primaryForeground">
          Append
        </TextBody>
      </Box>
    }
    startNode={
      <Box background="positive" borderRadius="rounded">
        <TextBody as="p" color="positiveForeground">
          StartContent
        </TextBody>
      </Box>
    }
    variant="primary"
  />
);
