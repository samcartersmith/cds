import { useEffect, useRef, useState } from 'react';

type UseCounterParams = {
  startNum: number;
  endNum: number;
  durationInMillis: number;
};

export const useCounter = ({ startNum, endNum, durationInMillis }: UseCounterParams) => {
  const [count, setCount] = useState(startNum);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    const startTime = Date.now();
    const endTime = startTime + durationInMillis;
    clearTimeout(timeoutRef.current as ReturnType<typeof setTimeout>);
    let currCount = startNum;

    function runUpdateAfterTimer() {
      if (currCount === endNum) {
        return;
      }

      const currTime = Date.now();
      const timeLeft = endTime - currTime;
      const incrementTime = timeLeft / Math.abs(endNum - currCount); // durationInMillis / Math.abs(endNum - startNum);

      timeoutRef.current = setTimeout(() => {
        if (currCount === endNum) {
          return;
        }

        const percentDone = (currTime - startTime) / Math.abs(endTime - startTime);
        const increment = Math.ceil(percentDone * Math.abs(endNum - startNum));

        if (endNum > startNum) {
          currCount = Math.min(startNum + increment, endNum);
        } else {
          currCount = Math.max(startNum - increment, endNum);
        }

        setCount(currCount);

        runUpdateAfterTimer();
      }, incrementTime);
    }

    if (currCount !== endNum) {
      runUpdateAfterTimer();
    }

    return () => {
      clearTimeout(timeoutRef.current as ReturnType<typeof setTimeout>);
    };
  }, [startNum, endNum, durationInMillis]);

  return count;
};
