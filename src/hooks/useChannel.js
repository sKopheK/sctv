import ***REMOVED***
  useCallback, useEffect, useState,
***REMOVED*** from 'react';
import ***REMOVED*** getStoredData, storeData ***REMOVED*** from '../storage';
import ***REMOVED*** CHANNEL_ID_MIN, CHANNEL_ID_MAX ***REMOVED*** from '../settings';

const DATA_CHANNEL_ID = 'channel';

const storedChannelId = getStoredData(DATA_CHANNEL_ID);

const CHANNEL_DEFAULT = ***REMOVED***
  id: Number(
    storedChannelId !== null && !Number.isNaN(Number(storedChannelId))
      ? storedChannelId
      : process.env.REACT_APP_DEFAULT_CHANNEL,
  ),
  title: null,
  currentShow: null,
  visible: false,
  isLoading: false,
***REMOVED***;

const useChannel = () => ***REMOVED***
  const [***REMOVED***
    id, title, currentShow, visible, isLoading,
***REMOVED***, setState] = useState(CHANNEL_DEFAULT);

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

  const setItem = useCallback((key, value) => ***REMOVED***
    setState((oldState) => (***REMOVED***
      ...oldState,
      [key]: value,
  ***REMOVED***));
***REMOVED***, [setState]);

  const setCurrentShow = useCallback((value) => ***REMOVED***
    setItem('currentShow', value);
***REMOVED***, [setItem]);
  const setId = useCallback((value) => ***REMOVED***
    if (value < CHANNEL_ID_MIN) ***REMOVED***
      setItem('id', CHANNEL_ID_MAX);
  ***REMOVED*** else if (value > CHANNEL_ID_MAX) ***REMOVED***
      setItem('id', CHANNEL_ID_MIN);
  ***REMOVED*** else ***REMOVED***
      setItem('id', value);
  ***REMOVED***
***REMOVED***, [setItem]);
  const setTitle = useCallback((value) => ***REMOVED***
    setItem('title', value);
***REMOVED***, [setItem]);
  const setLoading = useCallback((value) => ***REMOVED***
    setItem('isLoading', value);
***REMOVED***, [setItem]);
  const reset = useCallback(() => ***REMOVED***
    setState(() => CHANNEL_DEFAULT);
***REMOVED***, []);

  useEffect(() => ***REMOVED***
    storeData(DATA_CHANNEL_ID, id);
    setTitle(CHANNEL_DEFAULT.title);
    setCurrentShow(CHANNEL_DEFAULT.currentShow);
***REMOVED***, [id, setCurrentShow, setTitle]);

  return ***REMOVED***
    visible,
    id,
    title,
    currentShow,
    isLoading,
    setId,
    setTitle,
    setCurrentShow,
    setLoading,
    toggleBar,
    reset,
***REMOVED***;
***REMOVED***;

export default useChannel;
