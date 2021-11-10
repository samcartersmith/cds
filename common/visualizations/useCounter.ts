import { useEffect, useRef, useState } from 'react';

export const useCounter = (startNum: number, endNum: number, durationInMillis: number) => {
  const [count, setCount] = useState(startNum);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    const startTime = new Date().getTime();
    const endTime = startTime + durationInMillis;
    clearTimeout(timeoutRef.current as ReturnType<typeof setTimeout>);
    let currCount = startNum;

    function runUpdateAfterTimer() {
      if (currCount === endNum) {
        return;
      }

      const currTime = new Date().getTime();
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
