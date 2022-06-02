/* eslint-disable no-restricted-globals */
import '@cbhq/cds-fonts/fonts.css';
import '@cbhq/cds-web/styles/icon-font.css';
import './styles';

import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

/**
 * Needed for scrolling to anchors on page mount if url has hash.
 * On mount there are times when the element we want to scroll to is not available, so
 * we add a slight delay to better guarantee the element is mounted before calling the scrollTo function.
 */
if (ExecutionEnvironment.canUseDOM) {
  const { hash } = location;
  setTimeout(() => {
    if (!hash) {
      window.scrollTo(0, 0);
    } else {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      element?.scrollIntoView();
    }
  }, 1000);
}

export default module;
