import axios from 'axios';
import ***REMOVED*** useCallback, useRef, useState ***REMOVED*** from 'react';
import ***REMOVED*** CHANNEL_ID_MAX, CHANNEL_ID_MIN ***REMOVED*** from '../settings';

const useChannelList = () => ***REMOVED***
  const request = useRef(null);
  const fetch = async () => ***REMOVED***
    if (request.current) ***REMOVED***
      request.current.cancel();
  ***REMOVED***
    request.current = axios.CancelToken.source();
    try ***REMOVED***
      const response = await axios.get('api/list', ***REMOVED***
        cancelToken: request.current.token,
    ***REMOVED***);
      return response;
  ***REMOVED*** catch (error) ***REMOVED***
      console.error(error);
  ***REMOVED***
    return [];
***REMOVED***;
  const [***REMOVED*** visible, list ***REMOVED***, setState] = useState(***REMOVED*** visible: false, list: null ***REMOVED***);

  const get = async () => ***REMOVED***
    if (list === null) ***REMOVED***
      const ***REMOVED*** data ***REMOVED*** = await fetch();
      const fullList = Array(CHANNEL_ID_MAX - CHANNEL_ID_MIN + 1)
        .fill(null)
        .map((_, id) => (***REMOVED*** id: id + CHANNEL_ID_MIN ***REMOVED***));
      if (data) ***REMOVED***
        data.forEach((channel) => ***REMOVED***
          const channelIndex = fullList.findIndex((placeholder) => placeholder.id === channel.id);
          fullList[channelIndex] = channel;
      ***REMOVED***);
    ***REMOVED***
      setState((oldState) => (***REMOVED***
        ...oldState,
        list: fullList,
    ***REMOVED***));
      return fullList;
  ***REMOVED***
    return list;
***REMOVED***;

  get();

  const toggleBar = useCallback((enable) => ***REMOVED***
    setState((oldState) => (***REMOVED***
      ...oldState,
      visible: (enable !== undefined ? !!enable : !oldState.visible),
  ***REMOVED***));
***REMOVED***, [setState]);

  return ***REMOVED***
    list,
    visible,
    toggleBar,
***REMOVED***;
***REMOVED***;

export default useChannelList;
