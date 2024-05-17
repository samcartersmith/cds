import { Story } from '@storybook/react';
import { PageFooterBaseProps } from '@cbhq/cds-common';
import { NoopFn } from '@cbhq/cds-common/utils/mockUtils';

import { Button, ButtonGroup, IconButton } from '../../buttons';
import { useBreakpoints } from '../../hooks/useBreakpoints';
import { Icon } from '../../icons';
import { Box, Divider, VStack } from '../../layout';
import { TextHeadline, TextTitle1 } from '../../typography';
import { PageFooter } from '../PageFooter';

const exampleProps = {
  start1: (
    <IconButton
      transparent
      accessibilityLabel="Go Back"
      name="backArrow"
      onPress={NoopFn}
      testID="header-back-button"
    />
  ),
  end: <Icon accessibilityLabel="Show info" name="info" size="s" />,
  endButton: <Button accessibilityLabel="Go Next">Next</Button>,
  endButtons: (
    <ButtonGroup accessibilityLabel="Group">
      <Button accessibilityLabel="Cancel" variant="secondary">
        Cancel
      </Button>
      <Button accessibilityLabel="Delete" variant="negative">
        Delete
      </Button>
    </ButtonGroup>
  ),
  endButtons2: (
    <Box display="flex">
      <ButtonGroup block accessibilityLabel="Group2">
        <Button accessibilityLabel="Go Back" variant="secondary">
          Back
        </Button>
        <Button accessibilityLabel="Go Next" variant="primary">
          Next
        </Button>
      </ButtonGroup>
    </Box>
  ),
  endButtonsBlock2: (
    <VStack flexGrow={1} width="100%">
      <ButtonGroup block accessibilityLabel="Group2">
        <Button accessibilityLabel="Go Back" variant="secondary">
          Back
        </Button>
        <Button accessibilityLabel="Go Next" variant="primary">
          Next
        </Button>
      </ButtonGroup>
    </VStack>
  ),
  end3: (
    <IconButton
      transparent
      accessibilityLabel="Close"
      name="close"
      onPress={NoopFn}
      testID="header-close-button"
    />
  ),
  intermediary1: <TextHeadline as="h1">Page Title</TextHeadline>,
};

const Template: Story<PageFooterBaseProps> = (args) => <PageFooter {...args} />;

export const InteractiveFooter = Template.bind({});

InteractiveFooter.args = {
  background: 'background',
  action: 'endButtons',
};

export const Examples = () => {
  const { isPhone } = useBreakpoints();
  const setEndButtonMobile = isPhone ? exampleProps.endButtonsBlock2 : exampleProps.endButtons2;

  return (
    <VStack gap={1}>
      <PageFooter action={exampleProps.endButton} background="primaryWash" />
      <Divider />
      <PageFooter action={exampleProps.endButtons} />
      <Divider />
      <PageFooter action={setEndButtonMobile} />
      <Divider />
    </VStack>
  );
};

export const PageFooterInPage = () => {
  const { isPhone } = useBreakpoints();
  const setEndButtonMobile = isPhone ? exampleProps.endButtonsBlock2 : exampleProps.endButtons2;

  return (
    <VStack gap={0} left={0} position="absolute" top={0} width="100%">
      <VStack
        alignContent="center"
        alignItems="center"
        dangerouslySetBackground="#FADADD"
        flexGrow={1}
        flexShrink={1}
        height="400px"
        justifyContent="center"
      >
        <TextTitle1 as="h3">Primary Content</TextTitle1>
      </VStack>
      <Box dangerouslySetBackground="gray" height="500px" />
      <Box dangerouslySetBackground="orange" height="500px" />
      <PageFooter action={setEndButtonMobile} bottom="0" />
    </VStack>
  );
};

export default {
  title: 'Core Components/PageFooter',
  component: PageFooter,
  argTypes: {
    position: {
      table: {
        disable: true,
      },
    },
    top: {
      table: {
        disable: true,
      },
    },
    left: {
      table: {
        disable: true,
      },
    },
    bottom: {
      table: {
        disable: true,
      },
    },
    right: {
      table: {
        disable: true,
      },
    },

    background: {
      control: 'text',
    },
    action: {
      control: 'select',
      options: ['None', 'endButton', 'endButtons', 'endButtons2', 'endButtonsBlock2'],
      mapping: {
        None: null,
        endButton: exampleProps.endButton,
        endButtons: exampleProps.endButtons,
        endButtons2: exampleProps.endButtons2,
        endButtonsBlock2: exampleProps.endButtonsBlock2,
      },
    },
  },
};
