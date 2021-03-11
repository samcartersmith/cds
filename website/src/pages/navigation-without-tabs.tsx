import React from 'react';

import { NavigationExample } from '@cbhq/cds-website/components/NavigationExample';

import { appContent } from './navigationStyles';

const NavigationWithoutTabs = () => {
  return (
    <NavigationExample defaultRoute="/navigation-without-tabs">
      <div className={appContent}>
        <img src="/img/for-you.png" alt="for-you" width="auto" height="auto" />
      </div>
    </NavigationExample>
  );
};

export default NavigationWithoutTabs;
