import {
  useCallback, useRef, useState,
} from 'react';
import { CHANNEL_ID_MAX } from '../settings';

const DEFAULT = {
  visible: false,
  textInput: '',
};
const MAX_INPUT_LEN = String(CHANNEL_ID_MAX).length;

const useChannelChange = () => {
  const [{ visible, textInput }, setState] = useState(DEFAULT);
  const input = useRef(null);

  const toggleBar = useCallback((enable) => {
    setState((oldState) => ({
      ...oldState,
      visible: enable !== undefined ? !!enable : !oldState.visible,
    }));
  }, [setState]);

  const setTextInput = useCallback((value, concat = false) => {
    setState((oldState) => ({
      ...oldState,
      textInput: concat && oldState.textInput.length < MAX_INPUT_LEN
        ? oldState.textInput.concat(value)
        : String(value),
    }));
  }, [setState]);

  const resetTextInput = () => setTextInput(DEFAULT.textInput);
  const pressKey = (char) => setTextInput(char, true);

  return {
    visible,
    toggleBar,
    input,
    textInput,
    pressKey,
    resetTextInput,
  };
};

export default useChannelChange;
