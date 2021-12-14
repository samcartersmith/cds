import { useMemo } from 'react';
import { CardGroup, FeedCard } from '@cbhq/cds-web/cards';
import { Button } from '@cbhq/cds-web/buttons/Button';
import { IconButton } from '@cbhq/cds-web/buttons/IconButton';
import { ResponsiveArtboard } from ':cds-website/components/ResponsiveArtboard';

export function CardDemo() {
  // eslint-disable-next-line no-console
  const onPressConsole = () => console.log('press');

  const demoCard = useMemo(() => {
    return (
      <FeedCard
        avatarUrl="https://via.placeholder.com/350x220"
        headerDescription="Earn crypto"
        headerActionNode={<IconButton name="more" variant="foregroundMuted" transparent />}
        bodyTitle="LEARN AMP. EARN $3 IN AMP."
        bodyDescription="Amp is an Ethereum token that can be used as collateral to provide instant settlement assurance any time value is transferred."
        bodyMediaUrl="https://via.placeholder.com/350x220"
        bodyOrientation="vertical"
        footerActions={
          <Button compact variant="secondary" onPress={onPressConsole}>
            Actions
          </Button>
        }
      />
    );
  }, []);

  return (
    <ResponsiveArtboard>
      <CardGroup>
        {demoCard}
        {demoCard}
        {demoCard}
      </CardGroup>
    </ResponsiveArtboard>
  );
}
