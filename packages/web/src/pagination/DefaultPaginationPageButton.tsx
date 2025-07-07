import { forwardRef, useCallback } from 'react';
import { css, cx } from '@linaria/core';

import { Button } from '../buttons/Button';

import { PaginationPageButtonProps } from './Pagination';

const circularButtonStyles = css`
  width: 40px;
  height: 40px;
  aspect-ratio: 1/1;
`;

export const DefaultPaginationPageButton = forwardRef(
  (
    {
      page,
      onClick,
      isCurrentPage,
      disabled,
      accessibilityLabel,
      testID,
      ...props
    }: PaginationPageButtonProps,
    ref: React.ForwardedRef<HTMLButtonElement>,
  ) => {
    const handleClick = useCallback(() => onClick(page), [onClick, page]);
    const isSingleDigit = page < 10;

    return (
      <Button
        ref={ref}
        compact
        accessibilityLabel={accessibilityLabel}
        aria-current={isCurrentPage ? 'page' : undefined}
        className={cx(isSingleDigit && circularButtonStyles)}
        disabled={disabled}
        onClick={handleClick}
        testID={testID}
        transparent={!isCurrentPage}
        variant={isCurrentPage ? 'primary' : 'secondary'}
        {...props}
      >
        {page}
      </Button>
    );
  },
);
