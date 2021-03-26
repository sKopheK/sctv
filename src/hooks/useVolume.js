import ***REMOVED***
  useCallback, useEffect, useRef, useState,
***REMOVED*** from 'react';
import ***REMOVED*** DIALOG_TIMEOUT, VOLUME_CHANGE_STEP ***REMOVED*** from '../settings';
import ***REMOVED*** getStoredData, storeData ***REMOVED*** from '../storage';

const DATA_VOLUME = 'volume';
const DATA_MUTED = 'muted';

const storedVolume = getStoredData(DATA_VOLUME);
const storedMute = getStoredData(DATA_MUTED);

const VOLUME_DEFAULT = ***REMOVED***
  value: storedVolume !== null ? Number(storedVolume) : 70,
  muted: storedMute !== null ? !!storedMute : false,
  visible: false,
***REMOVED***;

const useVolume = () => ***REMOVED***
  const timeoutId = useRef(null);
  const [***REMOVED*** value, visible, muted ***REMOVED***, setState] = useState(VOLUME_DEFAULT);
  // const [***REMOVED*** value, visible, muted ***REMOVED***, setState] = useContext(VolumeCtx);

  const toggleBar = useCallback((enable) => ***REMOVED***
    setState((oldState) => ***REMOVED***
      const newState = ***REMOVED***
        ...oldState,
        visible: enable !== undefined ? !!enable : !oldState.visible,
    ***REMOVED***;
      if (newState.visible) ***REMOVED***
        newState.muted = false;
    ***REMOVED***
      return newState;
  ***REMOVED***);
***REMOVED***, [setState]);
  const clearHideTimeout = useCallback(() => clearTimeout(timeoutId.current), [timeoutId]);
  const setHideTimeout = useCallback(() => ***REMOVED***
    clearHideTimeout();
    timeoutId.current = window.setTimeout(() => toggleBar(false), DIALOG_TIMEOUT);
***REMOVED***, [clearHideTimeout, toggleBar]);

  const toggleMute = useCallback((enable) => ***REMOVED***
    setState((oldState) => ***REMOVED***
      const newState = ***REMOVED***
        ...oldState,
        muted: enable !== undefined ? !!enable : !oldState.muted,
    ***REMOVED***;
      if (newState.muted) ***REMOVED***
        newState.visible = false;
    ***REMOVED***
      return newState;
  ***REMOVED***);
***REMOVED***, [setState]);

  const change = useCallback((diff) => ***REMOVED***
    setState((oldState) => ***REMOVED***
      const newVolume = oldState.value + diff;
      if (newVolume >= 0 && newVolume <= 100) ***REMOVED***
        return ***REMOVED*** ...oldState, value: newVolume, muted: false ***REMOVED***;
    ***REMOVED***
      return oldState;
  ***REMOVED***);
    setHideTimeout();
***REMOVED***, [setHideTimeout, setState]);
  const increase = useCallback(() => change(VOLUME_CHANGE_STEP), [change]);
  const decrease = useCallback(() => change(-VOLUME_CHANGE_STEP), [change]);

  useEffect(() => ***REMOVED***
    if (visible) ***REMOVED***
      setHideTimeout();
  ***REMOVED***

    return clearHideTimeout;
***REMOVED***, [visible, setHideTimeout, clearHideTimeout]);

  useEffect(() => ***REMOVED***
    storeData(DATA_VOLUME, value);
***REMOVED***, [value]);

  useEffect(() => ***REMOVED***
    storeData(DATA_MUTED, muted);
***REMOVED***, [muted]);

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
