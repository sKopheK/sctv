import PropTypes from 'prop-types';
import React, ***REMOVED***
  useContext, useEffect, useMemo, useState,
***REMOVED*** from 'react';
import AppCtx from '../../state/AppCtx';
import './Overlay.scss';

const firstVisitCssClass = 'first-run';

const Overlay = (***REMOVED*** className ***REMOVED***) => ***REMOVED***
  const ***REMOVED*** screenOn, hasSignal ***REMOVED*** = useContext(AppCtx);
  const [logoClass, setLogoClass] = useState(firstVisitCssClass);

  useEffect(() => ***REMOVED***
    if (screenOn) ***REMOVED***
      setLogoClass(false);
  ***REMOVED***
***REMOVED***, [screenOn]);

  return useMemo(() => (
    <div className=***REMOVED***`Overlay $***REMOVED***screenOn && !hasSignal ? 'no-signal' : ''***REMOVED*** $***REMOVED***className ?? ''***REMOVED***`***REMOVED***>
      ***REMOVED***screenOn ? '' : (
        <h1 className="app-logo">
          <span className=***REMOVED***`sc-logo $***REMOVED***logoClass***REMOVED***`***REMOVED***><span className="visually-hidden">StarCraft</span></span>
          ***REMOVED***' '***REMOVED***
          <span className=***REMOVED***`tv-ico $***REMOVED***logoClass***REMOVED***`***REMOVED***><span className="visually-hidden">TV</span></span>
        </h1>
      )***REMOVED***
    </div>
  ), [screenOn, hasSignal, className, logoClass]);
***REMOVED***;

Overlay.propTypes = ***REMOVED***
  className: PropTypes.string,
***REMOVED***;

Overlay.defaultProps = ***REMOVED***
  className: '',
***REMOVED***;

export default Overlay;
