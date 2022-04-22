import {
  useCallback, useEffect, useState,
} from 'react';
import { VOLUME_CHANGE_STEP } from '../settings';
import { getStoredData, storeData } from '../storage';

const DATA_VOLUME = 'volume';
const DATA_MUTED = 'muted';

const storedVolume = getStoredData(DATA_VOLUME);
const storedMute = getStoredData(DATA_MUTED);

const VOLUME_DEFAULT = {
  value: storedVolume !== null ? Number(storedVolume) : 70,
  muted: storedMute !== null ? storedMute === 'true' : false,
  visible: false,
};

const useVolume = () => {
  const [{ value, visible, muted }, setState] = useState(VOLUME_DEFAULT);
  // const [{ value, visible, muted }, setState] = useContext(VolumeCtx);

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

  const toggleMute = useCallback((enable) => {
    setState((oldState) => {
      const newState = {
        ...oldState,
        muted: enable !== undefined ? !!enable : !oldState.muted,
      };
      if (newState.muted) {
        newState.visible = false;
      }
      return newState;
    });
  }, [setState]);

  const change = useCallback((diff) => {
    setState((oldState) => {
      const newVolume = oldState.value + diff;
      if (newVolume >= 0 && newVolume <= 100) {
        return { ...oldState, value: newVolume, muted: false };
      }
      return oldState;
    });
  }, [setState]);
  const increase = useCallback(() => change(VOLUME_CHANGE_STEP), [change]);
  const decrease = useCallback(() => change(-VOLUME_CHANGE_STEP), [change]);

  useEffect(() => {
    storeData(DATA_VOLUME, value);
  }, [value]);

  useEffect(() => {
    storeData(DATA_MUTED, muted);
  }, [muted]);

  return {
    value,
    visible,
    muted,
    increase,
    decrease,
    toggleMute,
    toggleBar,
  };
};

export default useVolume;
