import React, { memo } from 'react';
import { Link } from '@cbhq/cds-web/typography/Link';

export type LandingPageFocusAreaItemProps = {
  label: string;
  url: string;
};

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
