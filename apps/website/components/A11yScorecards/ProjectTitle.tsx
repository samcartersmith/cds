import { VStack } from '@cbhq/cds-web/layout';
import { TextCaption, TextDisplay3 } from '@cbhq/cds-web/typography';

export const ProjectTitle = ({
  projectName,
  averageScore,
}: {
  projectName: string;
  averageScore: number;
}) => {
  return (
    <VStack gap={1} spacingBottom={2}>
      <TextCaption as="span" color="foregroundMuted" id={projectName}>
        {projectName}
        <a className="hash-link" href={`#${projectName}`} title="Direct link to heading">
          &nbsp;
        </a>
      </TextCaption>
      <TextDisplay3 as="span">{`${averageScore.toFixed(2) || 0}%`}</TextDisplay3>
    </VStack>
  );
};
