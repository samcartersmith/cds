import { memo } from 'react';

import { MotionValue, m as motion } from 'framer-motion';

import { HStack } from '../layout/HStack';
import { Spacer } from '../layout/Spacer';
import { VStack } from '../layout/VStack';
import { NavigationBarControlsProps } from './NavigationBarControls';
import { NavigationBarCtasProps } from './NavigationBarCtas';
import { NavigationBarTitlesProps } from './NavigationBarTitles';

export interface NavigationBarProps {
  controls?: React.ReactElement<NavigationBarControlsProps>;
  titles?: React.ReactElement<NavigationBarTitlesProps>;
  ctas?: React.ReactElement<NavigationBarCtasProps>;
  actions?: React.ReactElement;
  animatedOpacity?: MotionValue;
}

export const NavigationBar = memo(
  ({ controls, titles, ctas, actions, animatedOpacity }: NavigationBarProps) => {
    return (
      <HStack width="100%" alignItems="flex-start" justifyContent="space-between">
        <VStack>
          <HStack alignItems="baseline">
            {controls}
            <motion.div style={{ opacity: animatedOpacity }}>{titles}</motion.div>
          </HStack>
        </VStack>
        <Spacer />
        {ctas}
        {actions}
      </HStack>
    );
  }
);

NavigationBar.displayName = 'NavigationBar';
