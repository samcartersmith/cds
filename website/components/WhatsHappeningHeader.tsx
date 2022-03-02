import { HStack, VStack, Box } from '@cbhq/cds-web/layout';
import { Avatar } from '@cbhq/cds-web/media/Avatar';
import { TextLabel2, TextTitle1, TextLegal, TextBody } from '@cbhq/cds-web/typography';

type WhatsHappeningHeaderProps = {
  date: string;
  title: string;
  authors: string;
  description: string;
};

export const WhatsHappeningHeader = ({
  date,
  title,
  authors,
  description,
}: WhatsHappeningHeaderProps) => {
  return (
    <VStack gap={1}>
      <TextLabel2 as="p">{date}</TextLabel2>
      <TextTitle1 as="p">{title}</TextTitle1>

      <HStack width="100%">
        <Box width="100%">
          <Avatar alt="Bashful" size="m" />
          <Box spacingStart={2} position="absolute" width="100%">
            <Avatar alt="Bashful" size="m" />
            <Box spacingStart={2} position="absolute" width="100%" alignContent="center">
              <Avatar alt="Bashful" size="m" />
              <Box spacingStart={1} spacingTop={0.5}>
                <TextLegal as="p">{authors}</TextLegal>
              </Box>
            </Box>
          </Box>
        </Box>
      </HStack>
      <TextBody as="p">{description}</TextBody>
    </VStack>
  );
};
