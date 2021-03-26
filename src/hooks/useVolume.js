import ***REMOVED***
  useCallback, useEffect, useRef, useState,
***REMOVED*** from 'react';
import ***REMOVED*** DIALOG_TIMEOUT, VOLUME_CHANGE_STEP ***REMOVED*** from '../settings';

const VOLUME_DEFAULT = ***REMOVED***
  value: 70,
  visible: false,
  muted: false,
***REMOVED***;

const useVolume = () => ***REMOVED***
  const timeoutId = useRef(null);
  const [***REMOVED*** value, visible, muted ***REMOVED***, setState] = useState(VOLUME_DEFAULT);
  // const [***REMOVED*** value, visible, muted ***REMOVED***, setState] = useContext(VolumeCtx);

  const toggleBar = useCallback((enable) => ***REMOVED***
    setState((oldState) => (***REMOVED***
      ...oldState,
      visible: enable !== undefined ? !!enable : !oldState.visible,
  ***REMOVED***));
***REMOVED***, [setState]);
  const clearHideTimeout = useCallback(() => clearTimeout(timeoutId.current), [timeoutId]);
  const setHideTimeout = useCallback(() => ***REMOVED***
    clearHideTimeout();
    timeoutId.current = window.setTimeout(() => toggleBar(false), DIALOG_TIMEOUT);
***REMOVED***, [clearHideTimeout, toggleBar]);

  const toggleMute = useCallback((enable) => ***REMOVED***
    setState((oldState) => (***REMOVED***
      ...oldState,
      muted: enable !== undefined ? !!enable : !oldState.muted,
  ***REMOVED***));
***REMOVED***, [setState]);

  const change = useCallback((diff) => ***REMOVED***
    setState((oldState) => ***REMOVED***
      const newVolume = oldState.value + diff;
      if (newVolume >= 0 && newVolume <= 100) ***REMOVED***
        toggleMute(false);
        return ***REMOVED*** ...oldState, value: newVolume ***REMOVED***;
    ***REMOVED***
      return oldState;
  ***REMOVED***);
    setHideTimeout();
***REMOVED***, [setHideTimeout, toggleMute, setState]);
  const increase = useCallback(() => change(VOLUME_CHANGE_STEP), [change]);
  const decrease = useCallback(() => change(-VOLUME_CHANGE_STEP), [change]);

  useEffect(() => ***REMOVED***
    if (visible) ***REMOVED***
      setHideTimeout();
  ***REMOVED***

    return clearHideTimeout;
***REMOVED***, [visible, setHideTimeout, clearHideTimeout]);

  return ***REMOVED***
    value,
    visible,
    muted,
    increase,
    decrease,
    toggleMute,
    toggleBar,
***REMOVED***;
***REMOVED***;

export default useVolume;
