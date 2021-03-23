import PropTypes from 'prop-types';
import React, ***REMOVED*** useEffect, useState ***REMOVED*** from 'react';
import './Button.scss';

function Button(***REMOVED***
  className, children, onMouseDown, ...other
***REMOVED***) ***REMOVED***
  const [pressed, setPressed] = useState(false);
  let onMouseDownHandler = null;
  let onMouseUpHandler = null;
  if (onMouseDown) ***REMOVED***
    onMouseDownHandler = () => ***REMOVED***
      setPressed(() => true);
  ***REMOVED***;
    onMouseUpHandler = () => ***REMOVED***
      setPressed(() => false);
  ***REMOVED***;
***REMOVED***
  useEffect(() => ***REMOVED***
    let intervalId = null;
    if (pressed) ***REMOVED***
      intervalId = setInterval(onMouseDown, 100);
  ***REMOVED***
    return () => clearInterval(intervalId);
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
