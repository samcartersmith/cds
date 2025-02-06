import React from 'react';

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
      <Box background="bgPrimary">
        <TextBody as="p" color="fgInverse">
          Append
        </TextBody>
      </Box>
    }
    endNode={
      <Box background="bgPositive" borderRadius={200}>
        <TextBody as="p" color="fgInverse">
          EndContent
        </TextBody>
      </Box>
    }
    helperTextNode={
      <Box background="bgOverlay" height={30} width="100%">
        <TextBody as="p">HelperText</TextBody>
      </Box>
    }
    inputNode={
      <Box background="bgAlternate" flexGrow={2}>
        <TextBody as="p">Input</TextBody>
      </Box>
    }
    labelNode={
      <Box background="bgAlternate" height={30} width="100%">
        <TextBody as="p">Label</TextBody>
      </Box>
    }
    prependNode={
      <Box background="bgPrimary">
        <TextBody as="p" color="fgInverse">
          Prepend
        </TextBody>
      </Box>
    }
    startNode={
      <Box background="bgPositive" borderRadius={200}>
        <TextBody as="p" color="fgInverse">
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
      <Box background="bgPrimary" borderRadius={200}>
        <TextBody as="p" color="fgInverse">
          Append
        </TextBody>
      </Box>
    }
    endNode={
      <Box background="bgPositive" borderRadius={200}>
        <TextBody as="p" color="fgInverse">
          EndContent
        </TextBody>
      </Box>
    }
    helperTextNode={
      <Box background="bgOverlay" height={30} width="100%">
        <TextBody as="p">HelperText</TextBody>
      </Box>
    }
    inputNode={
      <Box background="bgAlternate" flexGrow={2}>
        <TextBody as="p">Input</TextBody>
      </Box>
    }
    labelNode={
      <Box background="bgAlternate" height={30} width="100%">
        <TextBody as="p">Label</TextBody>
      </Box>
    }
    startNode={
      <Box background="bgPositive" borderRadius={200}>
        <TextBody as="p" color="fgInverse">
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
      <Box background="bgPositive" borderRadius={200}>
        <TextBody as="p" color="fgInverse">
          EndContent
        </TextBody>
      </Box>
    }
    helperTextNode={
      <Box background="bgOverlay" height={30} width="100%">
        <TextBody as="p">HelperText</TextBody>
      </Box>
    }
    inputNode={
      <Box background="bgAlternate" flexGrow={2}>
        <TextBody as="p">Input</TextBody>
      </Box>
    }
    labelNode={
      <Box background="bgAlternate" height={30} width="100%">
        <TextBody as="p">Label</TextBody>
      </Box>
    }
    prependNode={
      <Box background="bgPrimary" borderRadius={200}>
        <TextBody as="p" color="fgInverse">
          Append
        </TextBody>
      </Box>
    }
    startNode={
      <Box background="bgPositive" borderRadius={200}>
        <TextBody as="p" color="fgInverse">
          StartContent
        </TextBody>
      </Box>
    }
    variant="primary"
  />
);
