import { css } from '@linaria/core';
import { fadeDuration } from '@cbhq/cds-common2/tokens/sparkline';
import { cubicBezier } from '@cbhq/cds-web2/animation/convertMotionConfig';

export const resetFadeClassName = css`
  opacity: 0;
`;

// keyframes are global so they should be namespaced
export const fadeInClassName = css`
  && {
    animation: cdsSparklineInteractiveFadeIn ${fadeDuration}ms ${cubicBezier('global')};
    opacity: 1;
  }

  @keyframes cdsSparklineInteractiveFadeIn {
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
    animation: cdsSparklineInteractiveFadeOut ${fadeDuration}ms ${cubicBezier('global')};
    opacity: 0;
  }

  @keyframes cdsSparklineInteractiveFadeOut {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
`;

// Using css transitions for simple fades to avoid a flash of 1 or 0 opacity when rerendering
export const baseSimpleFadeClassName = css`
  && {
    opacity: 0;
    transition: opacity ${fadeDuration}ms ${cubicBezier('global')};
  }
`;

export const simpleFadeInClassName = css`
  && {
    opacity: 1;
  }
`;

export const simpleFadeOutClassName = css`
  && {
    opacity: 0;
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
