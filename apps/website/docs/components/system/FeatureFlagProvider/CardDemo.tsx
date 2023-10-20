import { useMemo } from 'react';
import { Button } from '@cbhq/cds-web/buttons/Button';
import { IconButton } from '@cbhq/cds-web/buttons/IconButton';
import { CardGroup, FeedCard } from '@cbhq/cds-web/cards';

import { ResponsiveExample } from ':cds-website/components/ResponsiveExample';

export function CardDemo() {
  // eslint-disable-next-line no-console
  const onPressConsole = () => console.log('press');

  const demoCard = useMemo(() => {
    return (
      <FeedCard
        avatarUrl="https://images.coinbase.com/avatar?s=350"
        bodyDescription="Amp is an Ethereum token that can be used as collateral to provide instant settlement assurance any time value is transferred."
        bodyMediaUrl="https://static-assets.coinbase.com/card/introduction/v2/initial_funding.png"
        bodyOrientation="vertical"
        bodyTitle="LEARN AMP. EARN $3 IN AMP."
        footerActions={
          <Button compact onPress={onPressConsole} variant="secondary">
            Actions
          </Button>
        }
        headerActionNode={
          <IconButton
            transparent
            accessibilityLabel="More actions"
            name="more"
            variant="foregroundMuted"
          />
        }
        headerDescription="Earn crypto"
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
