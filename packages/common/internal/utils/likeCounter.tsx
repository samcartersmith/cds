import { useCallback, useMemo, useState } from 'react';

import { useToggler } from '../../hooks/useToggler';
import type { NoopFn } from '../../types';
import type { LikeButtonBaseProps } from '../../types/alpha';

export function likeCounter({
  count: countProp = 0,
  liked: likedProp,
}: LikeButtonBaseProps<NoopFn>) {
  return function useLikeButtonProps() {
    const [count, setCount] = useState(countProp);
    const [liked, { toggleOn, toggleOff }] = useToggler(likedProp);
    const handleOnPress = useCallback(() => {
      if (liked) {
        setCount((prev) => prev - 1);
        toggleOff();
      } else {
        setCount((prev) => prev + 1);
        toggleOn();
      }
    }, [liked, toggleOff, toggleOn]);

    return useMemo(
      () => ({
        liked,
        count,
        onPress: handleOnPress,
      }),
      [liked, count, handleOnPress],
    );
  };
}
