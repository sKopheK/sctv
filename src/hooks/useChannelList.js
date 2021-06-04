import axios from 'axios';
import ***REMOVED*** useCallback, useRef, useState ***REMOVED*** from 'react';

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
    return ***REMOVED******REMOVED***;
***REMOVED***;
  const [***REMOVED*** visible, list ***REMOVED***, setState] = useState(***REMOVED*** visible: false, list: null ***REMOVED***);

  const get = async () => ***REMOVED***
    if (list === null) ***REMOVED***
      const ***REMOVED*** data ***REMOVED*** = await fetch();
      setState((oldState) => (***REMOVED***
        ...oldState,
        list: data,
    ***REMOVED***));
      return data;
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
