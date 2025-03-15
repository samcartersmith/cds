import { useMemo } from 'react';
import { CardGroup, FeedCard } from '@cbhq/cds-web/cards';

import { ResponsiveExample } from ':cds-website/components/ResponsiveExample';

export function CardDemo() {
  const onPressConsole = () => console.log('press');

  const demoCard = useMemo(() => {
    return (
      <FeedCard
        author="Earn crypto"
        avatar="https://images.coinbase.com/avatar?s=350"
        description="Amp is an Ethereum token that can be used as collateral to provide instant settlement assurance any time value is transferred."
        headerAction={{
          name: 'more',
          variant: 'foregroundMuted',
          onPress: onPressConsole,
        }}
        image="https://static-assets.coinbase.com/card/introduction/v2/initial_funding.png"
        mediaPlacement="above"
        title="LEARN AMP. EARN $3 IN AMP."
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
