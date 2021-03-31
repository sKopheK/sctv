import PropTypes from 'prop-types';
import React, ***REMOVED***
  useCallback, useEffect, useMemo, useState,
***REMOVED*** from 'react';
import './Button.scss';

const PRESS_INTERVAL_SLOW = 100;
const PRESS_INTERVAL_FAST = 30;
const PRESS_INTERVAL_CHANGE_MS = 800;

function Button(***REMOVED***
  className, children, onClick, onMouseDown,
***REMOVED***) ***REMOVED***
  const [intervalDelay, setIntervalDelay] = useState(PRESS_INTERVAL_SLOW);
  const [pressed, setPressed] = useState(false);
  const onMouseDownHandler = useCallback(() => ***REMOVED***
    if (onMouseDown) ***REMOVED***
      setPressed(true);
  ***REMOVED***
***REMOVED***, [onMouseDown]);
  const onMouseUpHandler = useCallback(() => ***REMOVED***
    if (onMouseDown) ***REMOVED***
      setPressed(false);
      setIntervalDelay(PRESS_INTERVAL_SLOW);
  ***REMOVED***
***REMOVED***, [onMouseDown]);

  useEffect(() => ***REMOVED***
    let timeoutId = null;
    if (pressed && intervalDelay !== PRESS_INTERVAL_FAST) ***REMOVED***
      timeoutId = setTimeout(() => ***REMOVED***
        setIntervalDelay(PRESS_INTERVAL_FAST);
    ***REMOVED***, PRESS_INTERVAL_CHANGE_MS);
  ***REMOVED***
    return () => ***REMOVED***
      if (timeoutId) ***REMOVED***
        clearTimeout(timeoutId);
    ***REMOVED***
  ***REMOVED***;
***REMOVED***, [pressed, intervalDelay]);

  useEffect(() => ***REMOVED***
    let intervalId = null;
    if (pressed) ***REMOVED***
      intervalId = setInterval(onMouseDown, intervalDelay);
  ***REMOVED***
    return () => ***REMOVED***
      if (intervalId) ***REMOVED***
        clearInterval(intervalId);
    ***REMOVED***
  ***REMOVED***;
***REMOVED***, [onMouseDown, pressed, intervalDelay]);

  return useMemo(() => (
    <button
      type="button"
      className=***REMOVED***`btn $***REMOVED***className ?? ''***REMOVED***`***REMOVED***
      onClick=***REMOVED***onClick***REMOVED***
      onMouseDown=***REMOVED***onMouseDownHandler***REMOVED***
      onMouseUp=***REMOVED***onMouseUpHandler***REMOVED***
    >
      ***REMOVED***children***REMOVED***
    </button>
  ), [children, className, onClick, onMouseDownHandler, onMouseUpHandler]);
***REMOVED***

Button.propTypes = ***REMOVED***
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  onMouseDown: PropTypes.func,
  onClick: PropTypes.func,
***REMOVED***;

Button.defaultProps = ***REMOVED***
  className: '',
  children: [],
  onMouseDown: null,
  onClick: null,
***REMOVED***;

export default Button;
