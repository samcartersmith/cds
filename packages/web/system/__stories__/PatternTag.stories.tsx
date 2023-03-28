import { useToggler } from '@cbhq/cds-common';

import { Button } from '../../buttons';
import { FullscreenAlert } from '../../overlays';
import { PatternTag } from '../PatternTag';

export default {
  title: 'Core Components/Recipes/Patterns',
  component: PatternTag,
};

export const Error = () => {
  const [visible, { toggleOn, toggleOff }] = useToggler(true);

  return (
    <>
      <Button onPress={toggleOn}>View Error Pattern</Button>
      <PatternTag error>
        <FullscreenAlert
          visible={visible}
          onRequestClose={toggleOff}
          heroSquare="errorWeb404"
          title="Page not found"
          body="Sorry we couldn't find what you were looking for."
          preferredActionLabel="Back to Coinbase"
          onPreferredActionPress={toggleOff}
        />
      </PatternTag>
    </>
  );
};
