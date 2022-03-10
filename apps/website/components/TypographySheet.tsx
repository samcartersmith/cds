import { VStack } from '@cbhq/cds-web/layout';
import {
  TextBody,
  TextCaption,
  TextDisplay1,
  TextDisplay2,
  TextDisplay3,
  TextHeadline,
  TextLabel1,
  TextLabel2,
  TextLegal,
  TextProps,
  TextTitle1,
  TextTitle2,
  TextTitle3,
  TextTitle4,
} from '@cbhq/cds-web/typography';

export function TypographySheet(props: TextProps) {
  return (
    <VStack gap={1}>
      <TextDisplay1 as="h1" {...props}>
        Display1
      </TextDisplay1>
      <TextDisplay2 as="h2" {...props}>
        Display2 🔀
      </TextDisplay2>
      <TextDisplay3 as="h3" {...props}>
        Display3 🆕
      </TextDisplay3>
      <TextTitle1 as="h3" {...props}>
        Title1
      </TextTitle1>
      <TextTitle2 as="h4" {...props}>
        Title2
      </TextTitle2>
      <TextTitle3 as="p" {...props}>
        Title3
      </TextTitle3>
      <TextTitle4 as="p" {...props}>
        Title4 🆕
      </TextTitle4>
      <TextHeadline as="p" {...props}>
        Headline
      </TextHeadline>
      <TextBody as="p" {...props}>
        Body
      </TextBody>
      <TextLabel1 as="p" {...props}>
        Label1
      </TextLabel1>
      <TextLabel2 as="p" {...props}>
        Label2
      </TextLabel2>
      <TextCaption as="p" {...props}>
        Caption
      </TextCaption>
      <TextLegal as="p" {...props}>
        Legal
      </TextLegal>
    </VStack>
  );
}
