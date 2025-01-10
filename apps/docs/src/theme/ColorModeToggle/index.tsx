import React, { useCallback } from 'react';
import { translate } from '@docusaurus/Translate';
import type { Props } from '@theme/ColorModeToggle';
import { IconButton } from '@cbhq/cds-web2/buttons';

function ColorModeToggle({ value, onChange }: Props): JSX.Element {
  const title = translate(
    {
      message: 'Switch between dark and light mode (currently {mode})',
      id: 'theme.colorToggle.ariaLabel',
      description: 'The ARIA label for the navbar color mode toggle',
    },
    {
      mode:
        value === 'dark'
          ? translate({
              message: 'dark mode',
              id: 'theme.colorToggle.ariaLabel.mode.dark',
              description: 'The name for the dark color mode',
            })
          : translate({
              message: 'light mode',
              id: 'theme.colorToggle.ariaLabel.mode.light',
              description: 'The name for the light color mode',
            }),
    },
  );

  const handleClick = useCallback(() => {
    onChange(value === 'dark' ? 'light' : 'dark');
  }, [value, onChange]);

  return (
    <IconButton
      aria-label={title}
      name={value === 'light' ? 'light' : 'moon'}
      onClick={handleClick}
      title={title}
      value={value}
    />
  );
}

export default React.memo(ColorModeToggle);
