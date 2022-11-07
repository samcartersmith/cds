import React from 'react';

import { BoxBaseProps, FallbackBaseProps, SpacingScale, TextBaseProps } from '../types';

export type CreateFallbackProps = {
  VStack: React.ComponentType<BoxBaseProps & { gap?: SpacingScale | undefined }>;
  Fallback: React.ComponentType<FallbackBaseProps & { dangerouslySetIterations?: number }>;
  TextBody: React.ComponentType<TextBaseProps>;
};

export function fallbackBuilder({ VStack, Fallback, TextBody }: CreateFallbackProps) {
  const Basic = () => {
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
          <VStack key={`fallback: ${width}, ${height}`}>
            <TextBody>
              Width: {width}, Height: {height}
            </TextBody>
            <Fallback width={width} height={height} disableRandomRectWidth />
          </VStack>
        ))}
      </VStack>
    );
  };

  const RectangleWidthVariants = () => {
    return (
      <VStack gap={3}>
        {Array(10)
          .fill({})
          .map((a, i) => (
            <Fallback
              key={`fallback-rectangle-width-variants: ${a}`}
              width={100}
              height={20}
              rectWidthVariant={i}
            />
          ))}
      </VStack>
    );
  };

  const DangerouslySetIterations = () => {
    return (
      <Fallback width={100} disableRandomRectWidth height={20} dangerouslySetIterations={15} />
    );
  };

  return {
    Basic,
    RectangleWidthVariants,
    DangerouslySetIterations,
  };
}
