/* eslint-disable react-perf/jsx-no-new-function-as-prop */
import { useCallback, useState } from 'react';
import { Select } from '@cbhq/cds-web/controls/Select';
import { SelectOption } from '@cbhq/cds-web/controls/SelectOption';
import { HStack, VStack } from '@cbhq/cds-web/layout';
import { TextTitle3 } from '@cbhq/cds-web/typography';
import { shuffle } from 'lodash';

// Give me 4 random designers and engineers
const design = shuffle([
  'Donna Seo',
  'Kevyn Arnott',
  'Krishna Brown',
  'Mele Hamasaki',
  'Timo Kuhn',
]).slice(0, 4);
const eng = shuffle([
  'Blair McKee',
  'David Maulick',
  'Jake LeBoeuf',
  'Jennifer Liu',
  'Jonathan Rossi',
  'Katherine Martinez',
  'Michael Chen',
]).slice(0, 4);

const SelectExample = () => {
  const [value, setValue] = useState('');
  const [valueRight, setValueRight] = useState('');

  const handleOnChange = useCallback(
    (selectedValue: string, side?: 'right' | 'left') => {
      if (side === 'right') {
        setValueRight(selectedValue);
      } else {
        setValue(selectedValue);
      }
    },
    [setValue, setValueRight],
  );

  return (
    <VStack spacingBottom={4}>
      <VStack
        alignItems="center"
        spacing={6}
        background="backgroundAlternate"
        borderRadius="standard"
      >
        <div>
          <TextTitle3 as="h2" spacingBottom={2}>
            Build your team:
          </TextTitle3>
          <HStack gap={2} minHeight={320}>
            <VStack width={300}>
              <Select
                width="100%"
                value={value}
                label="Designer"
                placeholder="Select your designer"
                onChange={(selectedValue) => handleOnChange(selectedValue)}
              >
                {design.map((option) => (
                  <SelectOption description={option} value={option} />
                ))}
              </Select>
            </VStack>
            <VStack width={300}>
              <Select
                width="100%"
                value={valueRight}
                label="Engineer"
                placeholder="Select your engineer"
                onChange={(selectedValue) => handleOnChange(selectedValue, 'right')}
              >
                {eng.map((option) => (
                  <SelectOption description={option} value={option} />
                ))}
              </Select>
            </VStack>
          </HStack>
        </div>
      </VStack>
    </VStack>
  );
};

SelectExample.displayName = 'SelectExample';

export default SelectExample;
