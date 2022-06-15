import { createMotionConfig } from './tokens';

export const colorSurgeEnterConfig = createMotionConfig('fadeIn30', 'fast1');
export const colorSurgeExitConfig = createMotionConfig('fadeOut30', 'slow4', { delay: 200 });
