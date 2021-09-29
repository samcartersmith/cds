import { css } from 'linaria';
import { Box } from '../../layout/Box';
import { TextBody } from '../../typography/TextBody';
import { Input } from '../Input';

export default {
  title: 'Core Components/Inputs',
  component: Input,
};

const borderStyle = css`
  border-width: 1px;
`;

export const InputLayout = () => (
  <Input
    prepend={
      <Box background="primary">
        <TextBody as="p">Prepend</TextBody>
      </Box>
    }
    append={
      <Box background="primary">
        <TextBody as="p">Append</TextBody>
      </Box>
    }
    startContent={
      <Box background="positive" borderRadius="input">
        <TextBody as="p">StartContent</TextBody>
      </Box>
    }
    endContent={
      <Box background="positive" borderRadius="input">
        <TextBody as="p">EndContent</TextBody>
      </Box>
    }
    input={
      <Box background="backgroundAlternate" flexGrow={2}>
        <TextBody as="p">Input</TextBody>
      </Box>
    }
    label={
      <Box background="backgroundAlternate" width="100%" height={30}>
        <TextBody as="p">Label</TextBody>
      </Box>
    }
    helperText={
      <Box background="backgroundOverlay" width="100%" height={30}>
        <TextBody as="p">HelperText</TextBody>
      </Box>
    }
    borderStyle={borderStyle}
    variant="primary"
  />
);

export const Append = () => (
  <Input
    append={
      <Box background="primary" borderRadius="input">
        <TextBody as="p">Append</TextBody>
      </Box>
    }
    startContent={
      <Box background="positive" borderRadius="input">
        <TextBody as="p">StartContent</TextBody>
      </Box>
    }
    endContent={
      <Box background="positive" borderRadius="input">
        <TextBody as="p">EndContent</TextBody>
      </Box>
    }
    input={
      <Box background="backgroundAlternate" flexGrow={2}>
        <TextBody as="p">Input</TextBody>
      </Box>
    }
    label={
      <Box background="backgroundAlternate" width="100%" height={30}>
        <TextBody as="p">Label</TextBody>
      </Box>
    }
    helperText={
      <Box background="backgroundOverlay" width="100%" height={30}>
        <TextBody as="p">HelperText</TextBody>
      </Box>
    }
    borderStyle={borderStyle}
    variant="primary"
  />
);

export const Prepend = () => (
  <Input
    prepend={
      <Box background="primary" borderRadius="input">
        <TextBody as="p">Append</TextBody>
      </Box>
    }
    startContent={
      <Box background="positive" borderRadius="input">
        <TextBody as="p">StartContent</TextBody>
      </Box>
    }
    endContent={
      <Box background="positive" borderRadius="input">
        <TextBody as="p">EndContent</TextBody>
      </Box>
    }
    input={
      <Box background="backgroundAlternate" flexGrow={2}>
        <TextBody as="p">Input</TextBody>
      </Box>
    }
    label={
      <Box background="backgroundAlternate" width="100%" height={30}>
        <TextBody as="p">Label</TextBody>
      </Box>
    }
    helperText={
      <Box background="backgroundOverlay" width="100%" height={30}>
        <TextBody as="p">HelperText</TextBody>
      </Box>
    }
    borderStyle={borderStyle}
    variant="primary"
  />
);
