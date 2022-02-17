import React from 'react';
import { GroupBaseProps } from '../../types';

export function cardGroupBuilder<WrapperProps>(
  CardGroup: React.ComponentType<GroupBaseProps<WrapperProps>>,
) {
  function buildCardGroup<Examples>(examples: Examples[] | Readonly<Examples[]>) {
    const VerticalGroup = CardGroup;
    const HorizontalGroup = (props: GroupBaseProps<WrapperProps>) => (
      <CardGroup {...props} direction="horizontal" />
    );

    return {
      vertical: [
        examples,
        {
          parameters: {
            wrapper: VerticalGroup,
          },
        },
      ],
      horizontal: [
        examples,
        {
          parameters: {
            wrapper: HorizontalGroup,
          },
        },
      ],
    } as const;
  }
  return buildCardGroup;
}
