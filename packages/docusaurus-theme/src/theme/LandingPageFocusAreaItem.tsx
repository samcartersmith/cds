import React, { memo } from 'react';
import { LandingPageFocusAreaItemProps } from '@theme/LandingPageFocusAreaItem';
import { Link } from '@cbhq/cds-web/typography/Link';

const LandingPageFocusAreaItem = memo(function LandingPageFocusAreaItem({
  label,
  url,
}: LandingPageFocusAreaItemProps) {
  return (
    <Link key={label} to={url} variant="title4" openInNewWindow underline>
      {label}
    </Link>
  );
});

export default LandingPageFocusAreaItem;
