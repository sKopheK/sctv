import PropTypes from 'prop-types';
import React, ***REMOVED*** useContext ***REMOVED*** from 'react';
import AppCtx from '../../state/AppCtx';
import './Overlay.scss';

const Overlay = (***REMOVED*** className ***REMOVED***) => ***REMOVED***
  const ***REMOVED*** screenOn ***REMOVED*** = useContext(AppCtx);
  return (
    <div className=***REMOVED***`Overlay $***REMOVED***screenOn ? 'no-signalx' : ''***REMOVED*** $***REMOVED***className ?? ''***REMOVED***`***REMOVED*** />
  );
***REMOVED***;

Overlay.propTypes = ***REMOVED***
  className: PropTypes.string,
***REMOVED***;

Overlay.defaultProps = ***REMOVED***
  className: '',
***REMOVED***;

export default Overlay;
