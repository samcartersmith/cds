import { VStack } from '@cbhq/cds-web/layout';
import {
  TextDisplay1,
  TextDisplay2,
  TextTitle1,
  TextTitle2,
  TextTitle3,
  TextHeadline,
  TextBody,
  TextLabel1,
  TextLabel2,
  TextCaption,
  TextLegal,
} from '@cbhq/cds-web/typography';

export function TypographySheet() {
  return (
    <VStack gap={1}>
      <TextDisplay1 as="h1">Display1</TextDisplay1>
      <TextDisplay2 as="h2">Display2</TextDisplay2>
      <TextTitle1 as="h3">Title1</TextTitle1>
      <TextTitle2 as="h4">Title2</TextTitle2>
      <TextTitle3 as="p">Title3</TextTitle3>
      <TextHeadline as="p">Headline</TextHeadline>
      <TextBody as="p">Body</TextBody>
      <TextLabel1 as="p">Label1</TextLabel1>
      <TextLabel2 as="p">Label2</TextLabel2>
      <TextCaption as="p">Caption</TextCaption>
      <TextLegal as="p">Legal</TextLegal>
    </VStack>
  );
}
