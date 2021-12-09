import ***REMOVED***
  useCallback, useRef, useState,
***REMOVED*** from 'react';
import ***REMOVED*** CHANNEL_ID_MAX ***REMOVED*** from '../settings';

const DEFAULT = ***REMOVED***
  visible: false,
  textInput: '',
***REMOVED***;
const MAX_INPUT_LEN = String(CHANNEL_ID_MAX).length;

const useChannelChange = () => ***REMOVED***
  const [***REMOVED*** visible, textInput ***REMOVED***, setState] = useState(DEFAULT);
  const input = useRef(null);

  const toggleBar = useCallback((enable) => ***REMOVED***
    setState((oldState) => (***REMOVED***
      ...oldState,
      visible: enable !== undefined ? !!enable : !oldState.visible,
  ***REMOVED***));
***REMOVED***, [setState]);

  const setTextInput = useCallback((value, concat = false) => ***REMOVED***
    setState((oldState) => (***REMOVED***
      ...oldState,
      textInput: concat && oldState.textInput.length < MAX_INPUT_LEN
        ? oldState.textInput.concat(value)
        : String(value),
  ***REMOVED***));
***REMOVED***, [setState]);

  const resetTextInput = () => setTextInput(DEFAULT.textInput);
  const pressKey = (char) => setTextInput(char, true);

  return ***REMOVED***
    visible,
    toggleBar,
    input,
    textInput,
    pressKey,
    resetTextInput,
***REMOVED***;
***REMOVED***;

export default useChannelChange;
