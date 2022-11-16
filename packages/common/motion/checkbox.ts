import { createMotionConfig } from './tokens';

export const checkboxOpacityEnterConfig = createMotionConfig('fadeIn', 'moderate1');
export const checkboxScaleEnterConfig = createMotionConfig('scaleUpS', 'moderate1');

export const checkboxOpacityExitConfig = createMotionConfig('fadeOut', 'moderate1');
export const checkboxScaleExitConfig = createMotionConfig('scaleDownS', 'moderate1');
