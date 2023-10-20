import { VStack } from '../../layout';
import { IconButton } from '../IconButton';

export const Default = () => (
  <VStack>
    <IconButton accessibilityLabel="Horizontal arrows" name="arrowsHorizontal" />
    <IconButton accessibilityLabel="Horizontal arrows" name="arrowsHorizontal" to="/" />
  </VStack>
);

export const WithoutCompactStyles = () => (
  <VStack>
    <IconButton accessibilityLabel="Horizontal arrows" compact={false} name="arrowsHorizontal" />
    <IconButton
      accessibilityLabel="Horizontal arrows"
      compact={false}
      name="arrowsHorizontal"
      to="/"
    />
  </VStack>
);

export const PrimaryDisabled = () => (
  <IconButton
    disabled
    accessibilityLabel="Horizontal arrows"
    name="arrowsHorizontal"
    variant="primary"
  />
);

export const SecondaryDisabled = () => (
  <IconButton disabled accessibilityLabel="Horizontal arrows" name="arrowsHorizontal" />
);
export const Primary = () => (
  <VStack gap={2}>
    <IconButton accessibilityLabel="Horizontal arrows" name="arrowsHorizontal" variant="primary" />
    <IconButton
      transparent
      accessibilityLabel="Horizontal arrows"
      name="arrowsHorizontal"
      variant="primary"
    />
  </VStack>
);

export const Secondary = () => (
  <VStack gap={2}>
    <IconButton accessibilityLabel="Horizontal arrows" name="arrowsHorizontal" />
    <IconButton transparent accessibilityLabel="Horizontal arrows" name="arrowsHorizontal" />
  </VStack>
);

export default {
  title: 'Core Components/Buttons/IconButton',
  component: IconButton,
};
