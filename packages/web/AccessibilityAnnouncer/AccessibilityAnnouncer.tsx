import React, { AriaAttributes, forwardRef, memo, useEffect, useRef } from 'react';
import { ForwardedRef, SharedProps, useToggler } from '@cbhq/cds-common';
import { useMergedRef } from '@cbhq/cds-common/hooks/useMergedRef';

import { visuallyHidden } from '../styles/visuallyHidden';

export type AccessibilityAnnouncerProps = Omit<
  {
    /** The aria-live attribute
     * @default polite
     */
    politeness?: AriaAttributes['aria-live'];
    /** The message to announce */
    message?: string | null;
  },
  'children'
> &
  SharedProps;

const DISPLAY_MESSAGE_MS = 500; // Needs to be *just* long enough for screen readers to pick it up
let timerId: NodeJS.Timeout;

export const AccessibilityAnnouncer = memo(
  forwardRef(
    (
      {
        message,
        politeness = 'polite',
        testID = 'cds-accessibility-announcer',
      }: AccessibilityAnnouncerProps,
      forwardedRef: ForwardedRef<HTMLParagraphElement>,
    ) => {
      /** REMOVE NODE AFTER ONE SECOND
       * While ARIA provides methods to allow only changes or methods that force the entire region to announce those methods are not full proof. To be robust and compatible with all screen readers we should clear the live region after each usage. This ensures that all screen reader and browser combinations will get the announcement. Here is a compatibility test and some bugs found even now with aria-live regions.
       * @link https://terrillthompson.com/tests/aria/live-scores.html
       * */
      const [isVisible, toggleIsVisible] = useToggler(true);
      const messageRef = useRef<HTMLParagraphElement>(null);
      const mergedRef = useMergedRef(forwardedRef, messageRef);

      useEffect(() => {
        toggleIsVisible.toggleOn();

        // Hide the message immediately after it mounts
        if (message) {
          timerId = setTimeout(() => {
            toggleIsVisible.toggleOff();
          }, DISPLAY_MESSAGE_MS);
        }

        // Cleanup
        return () => clearTimeout(timerId);
      }, [message, toggleIsVisible]);

      return (
        <div aria-atomic aria-live={politeness} className={visuallyHidden} data-testid={testID}>
          {isVisible && (
            <p ref={mergedRef} data-testid={`${testID}--message`}>
              {message}
            </p>
          )}
        </div>
      );
    },
  ),
);

AccessibilityAnnouncer.displayName = 'AccessibilityAnnouncer';
