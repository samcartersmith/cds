import React, { useCallback } from 'react';
import { translate } from '@docusaurus/Translate';
import type { Props } from '@theme/ColorModeToggle';
import { IconButton } from '@cbhq/cds-web2/buttons';

function ColorModeToggle({ value, onChange }: Props): JSX.Element {
  const isDarkMode = value === 'dark';

  const label = translate({
    message: 'Dark mode',
    id: 'theme.colorToggle.ariaLabel',
    description: 'The ARIA label for the navbar color mode toggle',
  });

  const handleClick = useCallback(() => {
    onChange(isDarkMode ? 'light' : 'dark');
  }, [isDarkMode, onChange]);

  return (
    <IconButton
      aria-label={label}
      aria-pressed={isDarkMode}
      name={isDarkMode ? 'moon' : 'light'}
      onClick={handleClick}
      title={label}
      value={value}
    />
  );
}

export default React.memo(ColorModeToggle);
