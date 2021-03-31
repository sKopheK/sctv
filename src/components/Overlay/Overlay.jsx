import PropTypes from 'prop-types';
import React, ***REMOVED*** useContext, useMemo ***REMOVED*** from 'react';
import AppCtx from '../../state/AppCtx';
import './Overlay.scss';

const Overlay = (***REMOVED*** className ***REMOVED***) => ***REMOVED***
  const ***REMOVED*** screenOn ***REMOVED*** = useContext(AppCtx);
  return useMemo(() => (
    <div className=***REMOVED***`Overlay $***REMOVED***screenOn ? 'no-signalx' : ''***REMOVED*** $***REMOVED***className ?? ''***REMOVED***`***REMOVED*** />
  ), [screenOn, className]);
***REMOVED***;

Overlay.propTypes = ***REMOVED***
  className: PropTypes.string,
***REMOVED***;

Overlay.defaultProps = ***REMOVED***
  className: '',
***REMOVED***;

export default Overlay;
