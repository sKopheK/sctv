import PropTypes from 'prop-types';
import React from 'react';
import './Button.scss';

function Button(***REMOVED*** className, children, ...other ***REMOVED***) ***REMOVED***
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <button type="button" className=***REMOVED***`btn $***REMOVED***className ?? ''***REMOVED***`***REMOVED*** ***REMOVED***...other***REMOVED***>***REMOVED***children***REMOVED***</button>
  );
***REMOVED***

Button.propTypes = ***REMOVED***
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
***REMOVED***;

Button.defaultProps = ***REMOVED***
  className: '',
  children: [],
***REMOVED***;

export default Button;
