import axios from 'axios';
import { useCallback, useRef, useState } from 'react';
import { CHANNEL_ID_MAX, CHANNEL_ID_MIN } from '../settings';

const useChannelList = () => {
  const request = useRef(null);
  const fetch = async () => {
    if (request.current) {
      request.current.cancel();
    }
    request.current = axios.CancelToken.source();
    try {
      const response = await axios.get('api/list', {
        cancelToken: request.current.token,
      });
      return response;
    } catch (error) {
      console.error(error);
    }
    return [];
  };
  const [{ visible, list }, setState] = useState({ visible: false, list: null });

  const get = async () => {
    if (list === null) {
      const { data } = await fetch();
      const fullList = Array(CHANNEL_ID_MAX - CHANNEL_ID_MIN + 1)
        .fill(null)
        .map((_, id) => ({ id: id + CHANNEL_ID_MIN }));
      if (data) {
        data.forEach((channel) => {
          const channelIndex = fullList.findIndex((placeholder) => placeholder.id === channel.id);
          fullList[channelIndex] = channel;
        });
      }
      setState((oldState) => ({
        ...oldState,
        list: fullList,
      }));
      return fullList;
    }
    return list;
  };

  get();

  const toggleBar = useCallback((enable) => {
    setState((oldState) => ({
      ...oldState,
      visible: (enable !== undefined ? !!enable : !oldState.visible),
    }));
  }, [setState]);

  return {
    list,
    visible,
    toggleBar,
  };
};

export default useChannelList;
