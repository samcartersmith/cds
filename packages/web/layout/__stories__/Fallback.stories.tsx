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
          <Fallback width={width} height={height} />
        </>
      ))}
    </VStack>
  );
};

export const HeightAsCSSVar = () => {
  return <Fallback width={100} height="var(--title3-line-height)" />;
};
