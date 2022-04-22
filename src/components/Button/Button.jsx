import PropTypes from 'prop-types';
import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import './Button.scss';

const PRESS_INTERVAL_SLOW = 100;
const PRESS_INTERVAL_FAST = 30;
const PRESS_INTERVAL_CHANGE_MS = 800;

function Button({
  className, children, onClick, onMouseDown,
}) {
  const [intervalDelay, setIntervalDelay] = useState(PRESS_INTERVAL_SLOW);
  const [pressed, setPressed] = useState(false);
  const onMouseDownHandler = useCallback(() => {
    if (onMouseDown) {
      setPressed(true);
    }
  }, [onMouseDown]);
  const onMouseUpHandler = useCallback(() => {
    if (onMouseDown) {
      setPressed(false);
      setIntervalDelay(PRESS_INTERVAL_SLOW);
    }
  }, [onMouseDown]);

  useEffect(() => {
    let timeoutId = null;
    if (pressed && intervalDelay !== PRESS_INTERVAL_FAST) {
      timeoutId = setTimeout(() => {
        setIntervalDelay(PRESS_INTERVAL_FAST);
      }, PRESS_INTERVAL_CHANGE_MS);
    }
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [pressed, intervalDelay]);

  useEffect(() => {
    let intervalId = null;
    if (pressed) {
      intervalId = setInterval(onMouseDown, intervalDelay);
    }
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [onMouseDown, pressed, intervalDelay]);

  return useMemo(() => (
    <button
      type="button"
      className={`btn ${className ?? ''}`}
      onClick={onClick}
      onMouseDown={onMouseDownHandler}
      onMouseUp={onMouseUpHandler}
    >
      {children}
    </button>
  ), [children, className, onClick, onMouseDownHandler, onMouseUpHandler]);
}

Button.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  onMouseDown: PropTypes.func,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  className: '',
  children: [],
  onMouseDown: null,
  onClick: null,
};

export default Button;
