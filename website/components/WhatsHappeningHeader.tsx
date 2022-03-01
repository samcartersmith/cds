import { VStack } from '@cbhq/cds-web/layout';
import { TextLabel2, TextTitle1, TextLegal, TextBody } from '@cbhq/cds-web/typography';

export const WhatsHappeningHeader = () => {
  return (
    <VStack gap={1}>
      <TextLabel2 as="p">March 1, 2022</TextLabel2>
      <TextTitle1 as="p">Frontier rollout on React Native</TextTitle1>
      <TextLegal as="p">Tyler Benmark, Mele Hamasaki, Kat Martinez</TextLegal>
      <TextBody as="p">
        CDS is beginning to roll out Frontier on React Native surfaces. Check out the embedded doc
        to learn what Frontier is, what&apos;s changing, and when/how React Native teams are moving
        to Frontier.
      </TextBody>
    </VStack>
  );
};
