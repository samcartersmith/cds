import React, { memo } from 'react';
import { BoxBaseProps, PaletteForeground, TextBaseProps } from '../types';

export type AvatarTextTitle = {
  as?: string;
  color?: PaletteForeground;
} & TextBaseProps;

type AvatarTextProps = {
  /**
   * Name associated with the entity in the Avatar. The first letter is used for the text avatar.
   */
  name: string;

  /**
   * boolean indicating if the text should be compact
   */
  compact?: boolean;

  /**
   * Box React Element from platform (web or mobile)
   */
  Box: React.ComponentType<BoxBaseProps>;

  /**
   * TextTitle1 React Element from platform (web or mobile)
   */
  TextTitle1: React.ComponentType<AvatarTextTitle>;

  /**
   * TextTitle3 React Element from platform (web or mobile)
   */
  TextTitle3: React.ComponentType<AvatarTextTitle>;

  /**
   * Web only "as" element to use in the TextTitle
   */
  as?: string;
};

export const AvatarText: React.FC<AvatarTextProps> = memo(
  ({ name, compact, Box, TextTitle3, TextTitle1, as }) => {
    const TextEl = compact ? TextTitle3 : TextTitle1;

    const extraProps: { as?: string } = {};
    if (as) {
      extraProps.as = as;
    }

    const textNode = (
      <TextEl align="center" color="secondary" {...extraProps}>
        {name.substring(0, 1).toLocaleUpperCase()}
      </TextEl>
    );

    return (
      <Box alignItems="center" justifyContent="center" width="100%" height="100%">
        {textNode}
      </Box>
    );
  },
);
