import { css } from 'linaria';
import { fadeDuration } from '@cbhq/cds-common/tokens/sparkline';
import { cubicBezier } from '../../animation/convertMotionConfig';

export const resetFadeClassName = css`
  opacity: 0;
`;

// keyframes are global so they should be namespaced
export const fadeInClassName = css`
  && {
    animation: cdsChartFadeIn ${fadeDuration}ms ${cubicBezier('global')};
    opacity: 1;
  }

  @keyframes cdsChartFadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

export const fadeOutClassName = css`
  && {
    animation: cdsChartFadeOut ${fadeDuration}ms ${cubicBezier('global')};
    opacity: 0;
  }

  @keyframes cdsChartFadeOut {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
`;

export function fadeOut(domNode?: HTMLElement | null) {
  domNode?.classList.remove(fadeInClassName);
  domNode?.classList.add(fadeOutClassName);
}

export function fadeIn(domNode?: HTMLElement | null) {
  domNode?.classList.add(fadeInClassName);
  domNode?.classList.remove(fadeOutClassName);
}
