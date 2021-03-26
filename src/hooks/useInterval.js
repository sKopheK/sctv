import ***REMOVED*** useEffect, useRef ***REMOVED*** from 'react';

export default function useInterval(callback, delay) ***REMOVED***
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => ***REMOVED***
    savedCallback.current = callback;
***REMOVED***, [callback]);

  // Set up the interval.
  useEffect(() => ***REMOVED***
    function tick() ***REMOVED***
      savedCallback.current();
  ***REMOVED***
    if (delay !== null) ***REMOVED***
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
  ***REMOVED***

    return null;
***REMOVED***, [delay]);
***REMOVED***
