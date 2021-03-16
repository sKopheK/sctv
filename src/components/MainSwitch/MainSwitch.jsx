import PropTypes from 'prop-types';
import React from 'react';
import Button from '../Button/Button';
import './MainSwitch.scss';

function MainSwitch(***REMOVED*** className ***REMOVED***) ***REMOVED***
  const handleClick = () => ***REMOVED***
    document.querySelector('.Overlay').classList.toggle('no-signal');
***REMOVED***;

  return (
    <Button className=***REMOVED***`MainSwitch btn--round $***REMOVED***className***REMOVED***`***REMOVED*** onClick=***REMOVED***handleClick***REMOVED*** />
  );
***REMOVED***

MainSwitch.propTypes = ***REMOVED***
  className: PropTypes.string,
***REMOVED***;

MainSwitch.defaultProps = ***REMOVED***
  className: '',
***REMOVED***;

export default MainSwitch;
