import { TextBody } from '../../typography';
import { Fallback } from '../Fallback';
import { VStack } from '../VStack';

export default {
  title: 'Core Components/Fallback',
  component: Fallback,
};

export const Basic = () => {
  // index 0 = width, index 1 = height
  const sizes = [
    [10, 100],
    [120, 200],
    [900, 100],
    [10, 10],
  ];

  return (
    <VStack gap={3}>
      {sizes.map(([width, height]) => (
        <>
          <TextBody as="p">
            Width: {width}, Height: {height}
          </TextBody>
          <Fallback disableRandomRectWidth height={height} width={width} />
        </>
      ))}
    </VStack>
  );
};

export const HeightAsCSSVar = () => {
  return <Fallback height="var(--title3-line-height)" width={100} />;
};

export const RectangleWidthVariants = () => {
  return (
    <VStack gap={3}>
      {Array(10)
        .fill({})
        .map((_, i) => (
          <Fallback height={20} rectWidthVariant={i} width={100} />
        ))}
    </VStack>
  );
};
