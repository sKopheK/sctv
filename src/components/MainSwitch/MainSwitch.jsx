import PropTypes from 'prop-types';
import React, ***REMOVED*** useContext, useMemo ***REMOVED*** from 'react';
import AppCtx from '../../state/AppCtx';
import Button from '../Button/Button';
import './MainSwitch.scss';

function MainSwitch(***REMOVED*** className ***REMOVED***) ***REMOVED***
  const ***REMOVED*** toggleScreenOn ***REMOVED*** = useContext(AppCtx);
  return useMemo(() => (
    <Button className=***REMOVED***`MainSwitch btn--round $***REMOVED***className***REMOVED***`***REMOVED*** onClick=***REMOVED***toggleScreenOn***REMOVED*** />
  ), [className, toggleScreenOn]);
***REMOVED***

MainSwitch.propTypes = ***REMOVED***
  className: PropTypes.string,
***REMOVED***;

MainSwitch.defaultProps = ***REMOVED***
  className: '',
***REMOVED***;

export default MainSwitch;
