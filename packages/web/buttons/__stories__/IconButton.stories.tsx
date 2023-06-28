import { VStack } from '../../layout';
import { IconButton } from '../IconButton';

export const Default = () => (
  <VStack>
    <IconButton name="arrowsHorizontal" accessibilityLabel="Horizontal arrows" />
    <IconButton name="arrowsHorizontal" accessibilityLabel="Horizontal arrows" to="/" />
  </VStack>
);

export const WithoutCompactStyles = () => (
  <VStack>
    <IconButton name="arrowsHorizontal" compact={false} accessibilityLabel="Horizontal arrows" />
    <IconButton
      name="arrowsHorizontal"
      compact={false}
      accessibilityLabel="Horizontal arrows"
      to="/"
    />
  </VStack>
);

export const PrimaryDisabled = () => (
  <IconButton
    disabled
    variant="primary"
    name="arrowsHorizontal"
    accessibilityLabel="Horizontal arrows"
  />
);

export const SecondaryDisabled = () => (
  <IconButton disabled name="arrowsHorizontal" accessibilityLabel="Horizontal arrows" />
);
export const Primary = () => (
  <VStack gap={2}>
    <IconButton variant="primary" name="arrowsHorizontal" accessibilityLabel="Horizontal arrows" />
    <IconButton
      variant="primary"
      transparent
      name="arrowsHorizontal"
      accessibilityLabel="Horizontal arrows"
    />
  </VStack>
);

export const Secondary = () => (
  <VStack gap={2}>
    <IconButton name="arrowsHorizontal" accessibilityLabel="Horizontal arrows" />
    <IconButton transparent name="arrowsHorizontal" accessibilityLabel="Horizontal arrows" />
  </VStack>
);

export default {
  title: 'Core Components/Buttons/IconButton',
  component: IconButton,
};
