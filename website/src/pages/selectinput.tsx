import { SelectOptionCell } from '@cbhq/cds-web/cells/SelectOptionCell';
import { SelectInput } from '@cbhq/cds-web/controls/SelectInput';
import { HStack, VStack } from '@cbhq/cds-web/layout';
import React, { useCallback, useState } from 'react';
import { Button } from '@cbhq/cds-web/buttons';
import { TextBody } from '@cbhq/cds-web/typography';
import { useToggler } from '@cbhq/cds-common';
import { ExampleWithThemeToggles } from ':cds-website/components/ExampleWithThemeToggles';

const years = ['2015', '2016', '2017', '2018', '2019', '2020', '2021'];
const currencies = [
  'Bitcoin',
  'Litecoin',
  'Ethereum',
  'Algorand',
  'Cardano',
  'Doge',
  'AMP',
  'Arpa',
];

const DefaultSelectInput = () => {
  const [year, setYear] = useState<string | undefined>();
  const [asset, setAsset] = useState<string | undefined>();
  const [showResult, toggleShowResult] = useToggler(false);

  const handleButtonPress = useCallback(() => {
    if (year && asset) {
      toggleShowResult.toggleOn();
    }
  }, [year, asset, toggleShowResult]);

  return (
    <ExampleWithThemeToggles>
      <VStack gap={2}>
        <HStack gap={1}>
          <SelectInput value={year} onChange={setYear} placeholder="Year">
            {years.map((option) => (
              <SelectOptionCell value={option} key={option} title={option} description="BTC" />
            ))}
          </SelectInput>
          <SelectInput value={asset} onChange={setAsset} placeholder="Assets">
            {currencies.map((option) => (
              <SelectOptionCell value={option} key={option} title={option} description="BTC" />
            ))}
          </SelectInput>
        </HStack>
        <Button onPress={handleButtonPress}>Submit</Button>
        {showResult && (
          <HStack background="primaryWash" height={200} justifyContent="center" alignItems="center">
            <TextBody align="center" as="p">
              You have chosen {asset} from {year}
            </TextBody>
          </HStack>
        )}
      </VStack>
    </ExampleWithThemeToggles>
  );
};

export default DefaultSelectInput;
