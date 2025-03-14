import { useCallback, useMemo, useState } from 'react';

import type { LikeButtonBaseProps } from '../../types';

export function likeCounter({ count: countProp = 0, liked: likedProp }: LikeButtonBaseProps) {
  return function useLikeButtonProps() {
    const [count, setCount] = useState(countProp);
    const [liked, setLiked] = useState(likedProp);
    const handleOnPress = useCallback(() => {
      if (liked) {
        setCount((prev) => prev - 1);
        setLiked(false);
      } else {
        setCount((prev) => prev + 1);
        setLiked(true);
      }
    }, [liked]);

    return useMemo(
      () => ({
        liked,
        count,
        onPress: handleOnPress,
        accessibilityLabel: `${count} likes, ${liked ? 'unlike' : 'like'}`,
      }),
      [liked, count, handleOnPress],
    );
  };
}
