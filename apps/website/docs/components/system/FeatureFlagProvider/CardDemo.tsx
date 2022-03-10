import { useMemo } from 'react';
import { Button } from '@cbhq/cds-web/buttons/Button';
import { IconButton } from '@cbhq/cds-web/buttons/IconButton';
import { CardGroup, FeedCard } from '@cbhq/cds-web/cards';

import { ResponsiveExample } from ':cds-website/components/ResponsiveExample';

export function CardDemo() {
   
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
    <ResponsiveExample notInLiveEditor>
      <CardGroup>
        {demoCard}
        {demoCard}
        {demoCard}
      </CardGroup>
    </ResponsiveExample>
  );
}
