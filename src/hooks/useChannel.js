import ***REMOVED***
  useCallback, useEffect, useRef, useState,
***REMOVED*** from 'react';
import ***REMOVED*** INFO_DIALOG_TIMEOUT ***REMOVED*** from '../settings';
import ***REMOVED*** getStoredData, storeData ***REMOVED*** from '../storage';

const DATA_CHANNEL_ID = 'channel';

const storedChannelId = getStoredData(DATA_CHANNEL_ID);

const CHANNEL_DEFAULT = ***REMOVED***
  channelId: storedChannelId !== null ? Number(storedChannelId) : 67,
  currentShow: null,
  visible: false,
***REMOVED***;

const useChannel = () => ***REMOVED***
  const timeoutId = useRef(null);
  const [***REMOVED*** channelId, currentShow, visible ***REMOVED***, setState] = useState(CHANNEL_DEFAULT);

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
    timeoutId.current = window.setTimeout(() => toggleBar(false), INFO_DIALOG_TIMEOUT);
***REMOVED***, [clearHideTimeout, toggleBar]);

  const setItem = useCallback((key, value) => ***REMOVED***
    setState((oldState) => (***REMOVED***
      ...oldState,
      [key]: value,
  ***REMOVED***));
***REMOVED***, [setState]);

  const setCurrentShow = useCallback((value) => ***REMOVED***
    setItem('currentShow', value);
***REMOVED***, [setItem]);
  const setChannelId = useCallback((value) => ***REMOVED***
    setItem('channelId', value);
***REMOVED***, [setItem]);

  useEffect(() => ***REMOVED***
    if (visible) ***REMOVED***
      setHideTimeout();
  ***REMOVED***

    return clearHideTimeout;
***REMOVED***, [visible, setHideTimeout, clearHideTimeout]);

  useEffect(() => ***REMOVED***
    storeData(DATA_CHANNEL_ID, channelId);
***REMOVED***, [channelId]);

  return ***REMOVED***
    visible,
    channelId,
    currentShow,
    setChannelId,
    setCurrentShow,
    toggleBar,
***REMOVED***;
***REMOVED***;

export default useChannel;
