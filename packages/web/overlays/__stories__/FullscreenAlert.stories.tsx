import { useToggler } from '../..';
import { Button } from '../../buttons';
import { FullscreenAlert } from '../FullscreenAlert';

export default {
  title: 'Core Components/FullscreenAlert',
  component: FullscreenAlert,
};

export const Basic = () => {
  const [visible, { toggleOn, toggleOff }] = useToggler(true);

  return (
    <>
      <Button onPress={toggleOn}>Open Alert</Button>
      <FullscreenAlert
        visible={visible}
        onRequestClose={toggleOff}
        title="Connection trouble"
        body="We're unable to connect to our card partner. Apologies for the inconvenience. Please try again later today or tomorrow."
        heroSquare="errorApp500"
        preferredActionLabel="Try again"
        onPreferredActionPress={toggleOff}
        dismissActionLabel="Cancel"
        onDismissActionPress={toggleOff}
      />
    </>
  );
};

export const SingleAction = () => {
  const [visible, { toggleOn, toggleOff }] = useToggler(true);

  return (
    <>
      <Button onPress={toggleOn}>Open Alert</Button>
      <FullscreenAlert
        visible={visible}
        onRequestClose={toggleOff}
        title="Connection trouble"
        body="We're unable to connect to our card partner. Apologies for the inconvenience. Please try again later today or tomorrow."
        heroSquare="errorApp500"
        preferredActionLabel="Try again"
        onPreferredActionPress={toggleOff}
      />
    </>
  );
};
