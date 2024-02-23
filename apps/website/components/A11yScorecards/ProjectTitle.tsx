import { Box, HStack, VStack } from '@cbhq/cds-web/layout';
import { Tag } from '@cbhq/cds-web/tag/Tag';
import { TextCaption, TextDisplay3 } from '@cbhq/cds-web/typography';

export const ProjectTitle = ({
  projectName,
  averageScore,
  platformType,
}: {
  projectName: string;
  averageScore: number;
  platformType: string;
}) => {
  return (
    <VStack gap={1} spacingBottom={2}>
      <TextCaption as="span" color="foregroundMuted" id={projectName}>
        {projectName}
        <a className="hash-link" href={`#${projectName}`} title="Direct link to heading">
          &nbsp;
        </a>
      </TextCaption>
      <HStack justifyContent="space-between">
        <TextDisplay3 as="span">{`${averageScore.toFixed(2) || 0}%`}</TextDisplay3>{' '}
        <Box height="35px">
          {platformType && (
            <Tag colorScheme="blue" intent="informational">
              {platformType}
            </Tag>
          )}
        </Box>
      </HStack>
    </VStack>
  );
};
