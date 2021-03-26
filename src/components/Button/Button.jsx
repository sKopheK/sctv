import PropTypes from 'prop-types';
import React, ***REMOVED*** useCallback, useEffect, useState ***REMOVED*** from 'react';
import './Button.scss';

function Button(***REMOVED***
  className, children, onMouseDown, ...other
***REMOVED***) ***REMOVED***
  const [pressed, setPressed] = useState(false);
  const onMouseDownHandler = useCallback(
    () => ***REMOVED***
      if (onMouseDown) ***REMOVED***
        setPressed(true);
    ***REMOVED***
  ***REMOVED***,
    [onMouseDown],
  );
  const onMouseUpHandler = useCallback(
    () => ***REMOVED***
      if (onMouseDown) ***REMOVED***
        setPressed(false);
    ***REMOVED***
  ***REMOVED***,
    [onMouseDown],
  );

  useEffect(() => ***REMOVED***
    let intervalId = null;
    if (pressed) ***REMOVED***
      intervalId = setInterval(onMouseDown, 100);
  ***REMOVED***
    return () => ***REMOVED***
      if (intervalId) ***REMOVED***
        clearInterval(intervalId);
    ***REMOVED***
  ***REMOVED***;
***REMOVED***, [onMouseDown, pressed]);

  return (
    <button
      type="button"
      className=***REMOVED***`btn $***REMOVED***className ?? ''***REMOVED***`***REMOVED***
      onMouseDown=***REMOVED***onMouseDownHandler***REMOVED***
      onMouseUp=***REMOVED***onMouseUpHandler***REMOVED***
      // eslint-disable-next-line react/jsx-props-no-spreading
      ***REMOVED***...other***REMOVED***
    >
      ***REMOVED***children***REMOVED***

    </button>
  );
***REMOVED***

Button.propTypes = ***REMOVED***
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  onMouseDown: PropTypes.func,
***REMOVED***;

Button.defaultProps = ***REMOVED***
  className: '',
  children: [],
  onMouseDown: null,
***REMOVED***;

export default Button;
