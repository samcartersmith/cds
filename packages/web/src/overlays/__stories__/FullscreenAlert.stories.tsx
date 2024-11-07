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
        body="We're unable to connect to our card partner. Apologies for the inconvenience. Please try again later today or tomorrow."
        closeAccessibilityLabel="Close alert"
        dismissActionLabel="Cancel"
        heroSquare="errorApp500"
        onDismissActionPress={toggleOff}
        onPreferredActionPress={toggleOff}
        onRequestClose={toggleOff}
        preferredActionLabel="Try again"
        title="Connection trouble"
        visible={visible}
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
        body="We're unable to connect to our card partner. Apologies for the inconvenience. Please try again later today or tomorrow."
        closeAccessibilityLabel="Close alert"
        heroSquare="errorApp500"
        onPreferredActionPress={toggleOff}
        onRequestClose={toggleOff}
        preferredActionLabel="Try again"
        title="Connection trouble"
        visible={visible}
      />
    </>
  );
};
