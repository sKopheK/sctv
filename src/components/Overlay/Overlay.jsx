import PropTypes from 'prop-types';
import React, ***REMOVED*** useContext, useMemo ***REMOVED*** from 'react';
import AppCtx from '../../state/AppCtx';
import './Overlay.scss';

const Overlay = (***REMOVED*** className ***REMOVED***) => ***REMOVED***
  const ***REMOVED*** screenOn, hasSignal ***REMOVED*** = useContext(AppCtx);
  return useMemo(() => (
    <div className=***REMOVED***`Overlay $***REMOVED***screenOn && !hasSignal ? 'no-signal' : ''***REMOVED*** $***REMOVED***className ?? ''***REMOVED***`***REMOVED***>
      ***REMOVED***screenOn ? '' : (
        <h1 className="app-logo">
          <span className="sc-logo"><span className="visually-hidden">StarCraft</span></span>
          ***REMOVED***' '***REMOVED***
          <span className="tv-ico"><span className="visually-hidden">TV</span></span>
        </h1>
      )***REMOVED***
    </div>
  ), [screenOn, hasSignal, className]);
***REMOVED***;

Overlay.propTypes = ***REMOVED***
  className: PropTypes.string,
***REMOVED***;

Overlay.defaultProps = ***REMOVED***
  className: '',
***REMOVED***;

export default Overlay;
