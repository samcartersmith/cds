import { HStack, VStack } from '@cbhq/cds-web/layout';
import { Tag } from '@cbhq/cds-web/tag/Tag';
import { TextLabel1, TextTitle2 } from '@cbhq/cds-web/typography';
import { Link } from '@cbhq/cds-web/typography/Link';
import { Tooltip } from '@cbhq/cds-web-overlays';

type StatsTextStackProps = { label: string; stat: string };
type StatsComponentStackProps = { label: string; updated: boolean };
type TooltipContentProps = {
  urlTarget: string;
};
export function StatsTextStack({ label, stat }: StatsTextStackProps) {
  return (
    <VStack>
      <TextLabel1 as="p" spacingBottom={1}>
        {label}
      </TextLabel1>
      <TextTitle2 as="h2">{stat}</TextTitle2>
    </VStack>
  );
}

function TooltipContent({ urlTarget }: TooltipContentProps) {
  return (
    <TextLabel1 as="p">
      Your version is outdated. See{' '}
      <Link openInNewWindow to={urlTarget}>
        docs
      </Link>{' '}
      to update.
    </TextLabel1>
  );
}

export function StatsVersionStatusStack({ label, updated }: StatsComponentStackProps) {
  const urlTarget = 'https://cds.coinbase-corp.com/guides/migration/';

  return (
    <VStack>
      <HStack>
        <TextLabel1 as="p" spacingBottom={1} spacingEnd={0.5}>
          {label}
        </TextLabel1>
        <TextLabel1 as="p" spacingBottom={1}>
          <Link openInNewWindow to={urlTarget}>
            (Docs)
          </Link>
        </TextLabel1>
      </HStack>
      <TextLabel1 as="p" spacingBottom={1}>
        {updated ? (
          <Tag colorScheme="blue" intent="informational">
            Up to Date
          </Tag>
        ) : (
          <Tooltip content={<TooltipContent urlTarget={urlTarget} />} placement="bottom">
            <Tag colorScheme="red" intent="informational">
              Outdated
            </Tag>
          </Tooltip>
        )}
      </TextLabel1>
    </VStack>
  );
}
