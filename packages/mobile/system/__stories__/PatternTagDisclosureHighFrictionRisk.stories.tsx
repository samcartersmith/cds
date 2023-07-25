import React, { useCallback, useMemo, useState } from 'react';
import { useToggler } from '@cbhq/cds-common';

import { Button } from '../../buttons';
import { Checkbox } from '../../controls';
import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { SpotRectangle } from '../../illustrations';
import { Box, HStack, VStack } from '../../layout';
import { Modal, ModalBody, ModalFooter, ModalHeader } from '../../overlays';
import { Link, TextHeadline, TextLabel2, TextTitle3 } from '../../typography';
import { PatternTag } from '../PatternTag';

const PatternTagDisclosureHighFrictionRiskScreen = () => {
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
    <ExampleScreen>
      <Example title="Pattern Tag - High-Friction Risk Disclosure">
        <Button onPress={toggleOn}>View HFR Disclosure</Button>
        <PatternTag disclosure>
          <Modal
            visible={visible}
            onRequestClose={toggleOff}
            accessibilityLabel="Title outlining risk in 1-2 lines"
            accessibilityHint="Hint providing more context about the disclosure. Close this dialog to continue."
            hideDividers
          >
            <ModalHeader
              onBackButtonPress={toggleOff}
              closeAccessibilityLabel="Close"
              closeAccessibilityHint="Close this dialog to continue"
              backAccessibilityLabel="Back"
              backAccessibilityHint="Go back to the previous dialog"
            />
            <ModalBody>
              <Box alignItems="center">
                <SpotRectangle name="accessToAdvancedCharts" />
              </Box>
              <TextTitle3 spacingTop={4}>Title outlining risk in 1-2 lines</TextTitle3>
              <TextLabel2 spacingTop={1}>
                Body text saying &quot;Before you [verb], here are a few things you need to
                understand about [action].&quot;
              </TextLabel2>
              <VStack spacingVertical={3} gap={3}>
                {data.map(({ id, headline, checkboxLabel, linkText, linkUrl }, index) => (
                  <VStack key={id} gap={1}>
                    <TextHeadline>{headline}</TextHeadline>
                    <HStack alignItems="center" gap={1}>
                      <Checkbox
                        checked={checkboxes[index]}
                        onChange={handleCheckboxChange(index)}
                        accessibilityLabel={checkboxLabel}
                        accessibilityHint="Toggle acknowledgment of this risk item. All risk items must be acknowledged to proceed."
                      />
                      {/* eslint-disable react-native/no-raw-text */}
                      <TextLabel2 dangerouslySetStyle={{ flex: 1 }}>
                        {checkboxLabel}{' '}
                        <Link to={linkUrl} underline>
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
                <Button onPress={toggleOff} disabled={isCtaDisabled}>
                  {`[${isCtaDisabled ? 'Disabled' : 'Enabled'} CTA]`}
                </Button>
              }
            />
          </Modal>
        </PatternTag>
      </Example>
    </ExampleScreen>
  );
};

export default PatternTagDisclosureHighFrictionRiskScreen;
