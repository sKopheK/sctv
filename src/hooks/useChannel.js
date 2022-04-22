import {
  useCallback, useEffect, useState,
} from 'react';
import { getStoredData, storeData } from '../storage';
import { CHANNEL_ID_MIN, CHANNEL_ID_MAX } from '../settings';

const DATA_CHANNEL_ID = 'channel';

const storedChannelId = getStoredData(DATA_CHANNEL_ID);

const CHANNEL_DEFAULT = {
  id: Number(
    storedChannelId !== null && !Number.isNaN(Number(storedChannelId))
      ? storedChannelId
      : process.env.REACT_APP_DEFAULT_CHANNEL,
  ),
  title: null,
  currentShow: null,
  visible: false,
  isLoading: false,
};

const useChannel = () => {
  const [{
    id, title, currentShow, visible, isLoading,
  }, setState] = useState(CHANNEL_DEFAULT);

  const toggleBar = useCallback((enable) => {
    setState((oldState) => {
      const newState = {
        ...oldState,
        visible: enable !== undefined ? !!enable : !oldState.visible,
      };
      if (newState.visible) {
        newState.muted = false;
      }
      return newState;
    });
  }, [setState]);

  const setItem = useCallback((key, value) => {
    setState((oldState) => ({
      ...oldState,
      [key]: value,
    }));
  }, [setState]);

  const setCurrentShow = useCallback((value) => {
    setItem('currentShow', value);
  }, [setItem]);
  const setId = useCallback((value) => {
    if (value < CHANNEL_ID_MIN) {
      setItem('id', CHANNEL_ID_MAX);
    } else if (value > CHANNEL_ID_MAX) {
      setItem('id', CHANNEL_ID_MIN);
    } else {
      setItem('id', value);
    }
  }, [setItem]);
  const setTitle = useCallback((value) => {
    setItem('title', value);
  }, [setItem]);
  const setLoading = useCallback((value) => {
    setItem('isLoading', value);
  }, [setItem]);

  useEffect(() => {
    storeData(DATA_CHANNEL_ID, id);
    setTitle(CHANNEL_DEFAULT.title);
    setCurrentShow(CHANNEL_DEFAULT.currentShow);
  }, [id, setCurrentShow, setTitle]);

  return {
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
  };
};

export default useChannel;
