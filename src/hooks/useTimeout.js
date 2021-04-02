import ***REMOVED*** useCallback, useEffect, useRef ***REMOVED*** from 'react';

const useTimeout = (callback, delay) => ***REMOVED***
  const timeoutId = useRef(null);
  const clearTimeout = useCallback(() => window.clearTimeout(timeoutId.current), [timeoutId]);
  const setTimeout = useCallback(() => ***REMOVED***
    timeoutId.current = window.setTimeout(callback, delay);
***REMOVED***, [callback, delay]);

  useEffect(() => ***REMOVED***
    setTimeout();
    return () => ***REMOVED***
      clearTimeout();
  ***REMOVED***;
***REMOVED***, [setTimeout, clearTimeout]);
***REMOVED***;

export default useTimeout;
