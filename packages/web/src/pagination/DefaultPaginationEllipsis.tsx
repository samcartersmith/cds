import { Text } from '../typography/Text';

import { PaginationEllipsisProps } from './Pagination';

export const DefaultPaginationEllipsis = ({ content = '...', testID }: PaginationEllipsisProps) => (
  <Text noWrap aria-hidden="true" color="fgMuted" font="headline" testID={testID}>
    {content}
  </Text>
);
