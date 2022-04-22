import { useCallback, useEffect, useRef } from 'react';

const useTimeout = (callback, delay) => {
  const timeoutId = useRef(null);
  const clearTimeout = useCallback(() => window.clearTimeout(timeoutId.current), [timeoutId]);
  const setTimeout = useCallback(() => {
    timeoutId.current = window.setTimeout(callback, delay);
  }, [callback, delay]);

  useEffect(() => {
    setTimeout();
    return () => {
      clearTimeout();
    };
  }, [setTimeout, clearTimeout]);
};

export default useTimeout;
