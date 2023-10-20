import { useState } from 'react';
import shuffle from 'lodash/shuffle';
import { Select } from '@cbhq/cds-web/controls/Select';
import { SelectOption } from '@cbhq/cds-web/controls/SelectOption';
import { HStack, VStack } from '@cbhq/cds-web/layout';
import { TextTitle3 } from '@cbhq/cds-web/typography';

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

  return (
    <VStack spacingBottom={4}>
      <VStack
        alignItems="center"
        background="backgroundAlternate"
        borderRadius="rounded"
        spacing={6}
      >
        <div>
          <TextTitle3 as="h2" spacingBottom={2}>
            Build your team:
          </TextTitle3>
          <HStack gap={2} minHeight={320}>
            <VStack width={300}>
              <Select
                label="Designer"
                onChange={setValue}
                placeholder="Select your designer"
                value={value}
                width="100%"
              >
                {design.map((option) => (
                  <SelectOption description={option} value={option} />
                ))}
              </Select>
            </VStack>
            <VStack width={300}>
              <Select
                label="Engineer"
                onChange={setValueRight}
                placeholder="Select your engineer"
                value={valueRight}
                width="100%"
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
