import '@cbhq/cds-fonts/fonts.css';
import '@cbhq/cds-web/styles/icon-font.css';

import { globalStyles } from '@cbhq/cds-web/styles/global';
import { getBrowserGlobals } from '@cbhq/cds-web/utils/browser';

(function init() {
  function triggerSearch(e: KeyboardEvent) {
    const searchButton = getBrowserGlobals()?.document.querySelector('.aa-DetachedSearchButton');
    if (e.key === '/') {
      if (searchButton instanceof HTMLElement) {
        searchButton.click();
      }
    }
  }

  getBrowserGlobals()?.document.addEventListener('keydown', triggerSearch);
})();

export default globalStyles;
