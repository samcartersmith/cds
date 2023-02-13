import React, { memo } from 'react';
import { m as motion, MotionValue } from 'framer-motion';

import { IconButton } from '../../buttons/IconButton';
import { HStack } from '../../layout/HStack';
import { Spacer } from '../../layout/Spacer';
import { VStack } from '../../layout/VStack';

import { useNavigation } from './context';
import { NavigationBarControlsProps } from './NavigationBarControls';
import { NavigationBarCtasProps } from './NavigationBarCtas';
import { NavigationBarTitlesProps } from './NavigationBarTitles';
import { showForMobile } from './navigationStyles';

/** @deprecated */
export type NavigationBarProps = {
  controls?: React.ReactElement<NavigationBarControlsProps>;
  titles?: React.ReactElement<NavigationBarTitlesProps>;
  ctas?: React.ReactElement<NavigationBarCtasProps>;
  actions?: React.ReactElement;
  animatedOpacity?: MotionValue;
};

/* @deprecated please migrate to the new NavigationBar */
export const NavigationBar = memo(
  ({ controls, titles, ctas, actions, animatedOpacity }: NavigationBarProps) => {
    const { isMobileMenuVisible, toggleMobileMenuVisibility } = useNavigation();
    return (
      <HStack width="100%" alignItems="flex-start" justifyContent="space-between">
        <VStack>
          <HStack alignItems="center">
            {controls}
            {/* eslint-disable-next-line react-perf/jsx-no-new-object-as-prop */}
            <motion.div style={{ opacity: animatedOpacity }}>{titles}</motion.div>
          </HStack>
        </VStack>
        <Spacer />
        {ctas}
        {actions}
        <span className={showForMobile}>
          <IconButton
            name={isMobileMenuVisible ? 'close' : 'hamburger'}
            onPress={toggleMobileMenuVisibility}
          />
        </span>
      </HStack>
    );
  },
);

NavigationBar.displayName = 'DeprecatedNavigationBar';
