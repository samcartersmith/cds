import { useCallback, useMemo, useState } from 'react';
import { useToggler } from '@cbhq/cds-common';

import { Button } from '../../buttons';
import { Checkbox } from '../../controls';
import { Icon } from '../../icons/Icon';
import { SpotRectangle } from '../../illustrations';
import { Box, HStack, VStack } from '../../layout';
import { FullscreenAlert, Modal, ModalBody, ModalFooter, ModalHeader } from '../../overlays';
import { Link, TextBody, TextHeadline, TextLabel2, TextTitle3 } from '../../typography';

export default {
  title: 'Core Components/Patterns',
};

export const Error = () => {
  const [visible, { toggleOn, toggleOff }] = useToggler(true);

  return (
    <>
      <Button onPress={toggleOn}>View Error</Button>
      <FullscreenAlert
        body="Sorry we couldn't find what you were looking for."
        closeAccessibilityLabel="Close modal"
        heroSquare="errorWeb404"
        onPreferredActionPress={toggleOff}
        onRequestClose={toggleOff}
        preferredActionLabel="Back to Coinbase"
        title="Page not found"
        visible={visible}
      />
    </>
  );
};

export const DisclosureLowFriction = () => {
  const [visible, { toggleOn, toggleOff }] = useToggler(true);

  const data = useMemo(
    () => [
      {
        id: 1,
        headline: 'Benefit to highlight 1',
        body: 'Bullets explaining selling points and potential risks (can include “learn more” links).',
      },
      {
        id: 2,
        headline: 'Risk to highlight 1',
        body: 'Bullets explaining selling points and potential risks (can include “learn more” links).',
      },
      {
        id: 3,
        headline: 'Risk to highlight 2',
        body: 'Bullets explaining selling points and potential risks (can include “learn more” links).',
      },
    ],
    [],
  );

  return (
    <>
      <Button onPress={toggleOn}>View Low-Friction Disclosure</Button>
      <Modal
        hideDividers
        accessibilityLabelledBy="dlf-title"
        onRequestClose={toggleOff}
        visible={visible}
      >
        <ModalHeader closeAccessibilityLabel="Close" />
        <ModalBody>
          <Box justifyContent="center">
            <SpotRectangle name="accessToAdvancedCharts" />
          </Box>
          <TextTitle3 as="h2" id="dlf-title" spacingTop={4}>
            Title outlining the action and benefit in 1-2 lines
          </TextTitle3>
          <VStack as="ul" gap={3} spacingVertical={3}>
            {data.map(({ id, headline, body }) => (
              <VStack key={id} as="li" gap={1}>
                <HStack alignItems="center" gap={2}>
                  <Icon color="foreground" name="checkmark" size="s" />
                  <TextHeadline as="h3">{headline}</TextHeadline>
                </HStack>
                <TextBody as="p" spacingStart={4}>
                  {body}
                </TextBody>
              </VStack>
            ))}
          </VStack>
        </ModalBody>
        <ModalFooter
          primaryAction={<Button onPress={toggleOff}>[Affirmative CTA]</Button>}
          secondaryAction={
            <Button target="_blank" to="https://www.coinbase.com" variant="secondary">
              Terms and conditions
            </Button>
          }
        />
      </Modal>
    </>
  );
};

export const DisclosureMediumFriction = () => {
  const [visible, { toggleOn, toggleOff }] = useToggler(true);

  const data = useMemo(
    () => [
      {
        id: 1,
        headline: 'Risk to highlight 1',
        body: 'Bullets explaining selling points and potential risks (include “learn more” links in risk bullets).',
      },
      {
        id: 2,
        headline: 'Risk to highlight 2',
        body: 'Bullets explaining selling points and potential risks (include “learn more” links in risk bullets).',
      },
    ],
    [],
  );

  return (
    <>
      <Button onPress={toggleOn}>View Medium-Friction Disclosure</Button>
      <Modal
        hideDividers
        accessibilityLabelledBy="dmf-title"
        onRequestClose={toggleOff}
        visible={visible}
      >
        <ModalHeader closeAccessibilityLabel="Close" />
        <ModalBody>
          <Box justifyContent="center">
            <SpotRectangle name="accessToAdvancedCharts" />
          </Box>
          <TextTitle3 as="h2" id="dmf-title" spacingTop={4}>
            Title outlining the benefit in 1-2 lines
          </TextTitle3>
          <VStack as="ul" gap={3} spacingVertical={3}>
            {data.map(({ id, headline, body }) => (
              <VStack key={id} as="li" gap={1}>
                <HStack alignItems="center" gap={2}>
                  <Icon color="foreground" name="checkmark" size="s" />
                  <TextHeadline as="h3">{headline}</TextHeadline>
                </HStack>
                <TextBody as="p" spacingStart={4}>
                  {body}
                </TextBody>
              </VStack>
            ))}
          </VStack>
        </ModalBody>
        <ModalFooter
          primaryAction={<Button onPress={toggleOff}>[Affirmative CTA]</Button>}
          secondaryAction={
            <Button target="_blank" to="https://www.coinbase.com" variant="secondary">
              Terms and conditions
            </Button>
          }
        />
      </Modal>
    </>
  );
};

export const DisclosureHighFrictionBenefit = () => {
  const [visible, { toggleOn, toggleOff }] = useToggler(true);

  const data = useMemo(
    () => [
      {
        id: 1,
        headline: 'Benefit to highlight 1',
        body: 'Bullet outlining benefits.',
      },
      {
        id: 2,
        headline: 'Benefit to highlight 2',
        body: 'Bullet outlining benefits.',
      },
    ],
    [],
  );

  return (
    <>
      <Button onPress={toggleOn}>View High-Friction Benefit Disclosure</Button>
      <Modal
        hideDividers
        accessibilityLabelledBy="dhfb-title"
        onRequestClose={toggleOff}
        visible={visible}
      >
        <ModalHeader closeAccessibilityLabel="Close" />
        <ModalBody>
          <Box justifyContent="center">
            <SpotRectangle name="accessToAdvancedCharts" />
          </Box>
          <TextTitle3 as="h2" id="dhfb-title" spacingTop={4}>
            Title outlining the benefit in 1-2 lines
          </TextTitle3>
          <TextLabel2 as="p" spacingTop={1}>
            Body text saying &quot;By verbing, you will get X, Y, Z.&quot;
          </TextLabel2>
          <VStack as="ul" gap={3} spacingVertical={3}>
            {data.map(({ id, headline, body }) => (
              <VStack key={id} as="li" gap={1}>
                <HStack alignItems="center" gap={2}>
                  <Icon color="foreground" name="checkmark" size="s" />
                  <TextHeadline as="h3">{headline}</TextHeadline>
                </HStack>
                <TextBody as="p" spacingStart={4}>
                  {body}
                </TextBody>
              </VStack>
            ))}
          </VStack>
        </ModalBody>
        <ModalFooter primaryAction={<Button onPress={toggleOff}>[CTA]</Button>} />
      </Modal>
    </>
  );
};

export const DisclosureHighFrictionRisk = () => {
  const data = useMemo(
    () => [
      {
        id: 1,
        headline: 'Risk item 1',
        checkboxLabel: "I understand that I won't be able to do X because of Y.",
        linkText: 'Learn more',
        linkUrl: 'https://www.coinbase.com',
      },
      {
        id: 2,
        headline: 'Risk item 2',
        checkboxLabel: "I understand that I won't be able to do X because of Y.",
        linkText: 'Learn more',
        linkUrl: 'https://www.coinbase.com',
      },
    ],
    [],
  );
  const initialCheckboxesState = useMemo(() => data.map(() => false), [data]);

  const [visible, { toggleOn, toggleOff }] = useToggler(true);
  const [checkboxes, setCheckboxes] = useState(initialCheckboxesState);

  const checkboxLabelStyles = useMemo(() => ({ cursor: 'pointer' }), []);
  const isCtaDisabled = useMemo(() => checkboxes.some((checked) => !checked), [checkboxes]);

  const handleCheckboxChange = useCallback(
    (index: number) => () => {
      setCheckboxes((prevCheckboxes) =>
        prevCheckboxes.map((checked, i) => (i === index ? !checked : checked)),
      );
    },
    [],
  );

  return (
    <>
      <Button onPress={toggleOn}>View High-Friction Risk Disclosure</Button>
      <Modal
        hideDividers
        accessibilityLabelledBy="dhfr-title"
        onRequestClose={toggleOff}
        visible={visible}
      >
        <ModalHeader
          backAccessibilityLabel="Back"
          closeAccessibilityLabel="Close"
          onBackButtonPress={toggleOff}
        />
        <ModalBody>
          <Box justifyContent="center">
            <SpotRectangle name="accessToAdvancedCharts" />
          </Box>
          <TextTitle3 as="h2" id="dhfr-title" spacingTop={4}>
            Title outlining risk in 1-2 lines
          </TextTitle3>
          <TextLabel2 as="p" spacingTop={1}>
            Body text saying &quot;Before you [verb], here are a few things you need to understand
            about [action].&quot;
          </TextLabel2>
          <VStack as="ul" gap={3} spacingVertical={3}>
            {data.map(({ id, headline, checkboxLabel, linkText, linkUrl }, index) => (
              <VStack key={id} as="li" gap={1}>
                <TextHeadline as="h3">{headline}</TextHeadline>
                <HStack alignItems="center" as="label" gap={1} style={checkboxLabelStyles}>
                  <Checkbox checked={checkboxes[index]} onChange={handleCheckboxChange(index)} />
                  <TextLabel2 as="span">
                    {checkboxLabel}{' '}
                    <Link openInNewWindow underline to={linkUrl}>
                      {linkText}
                    </Link>
                  </TextLabel2>
                </HStack>
              </VStack>
            ))}
          </VStack>
        </ModalBody>
        <ModalFooter
          primaryAction={
            <Button disabled={isCtaDisabled} onPress={toggleOff}>
              {`[${isCtaDisabled ? 'Disabled' : 'Enabled'} CTA]`}
            </Button>
          }
        />
      </Modal>
    </>
  );
};
