import { startCase } from 'lodash';
import { IllustrationPictogramNames } from '@cbhq/cds-common';
import { Pictogram } from '@cbhq/cds-web/illustrations';
import { HStack } from '@cbhq/cds-web/layout/HStack';
import { VStack } from '@cbhq/cds-web/layout/VStack';
import { TextBody, TextTitle3 } from '@cbhq/cds-web/typography';

// TODO get these from something legit
const principlesPictogramMap: Record<string, IllustrationPictogramNames> = {
  identifiable: 'target',
  efficient: 'tokenBaskets',
  easy: 'easyToUse',
  contextual: 'support',
  relevant: 'fast',
  scannable: 'explore',
} as const;

export type PrinciplesProps = {
  [key in keyof typeof principlesPictogramMap]: string;
};

export const Principles: React.FC<PrinciplesProps> = (props: PrinciplesProps) => {
  const principles = Object.entries(props);

  return (
    <HStack justifyContent="space-between" gap={4}>
      {principles.map(([principle, description]) => (
        <VStack gap={0.5} key={principle}>
          <Pictogram name={principlesPictogramMap[principle]} />
          <TextTitle3 as="h2" spacingTop={2} spacingBottom={1}>
            {startCase(principle)}
          </TextTitle3>
          <TextBody as="p">{description}</TextBody>
        </VStack>
      ))}
    </HStack>
  );
};
