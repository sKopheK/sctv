import PropTypes from 'prop-types';
import React, ***REMOVED***
  useContext, useEffect, useMemo, useState,
***REMOVED*** from 'react';
import AppCtx from '../../state/AppCtx';
import Welcome from '../Welcome/Welcome';
import './Overlay.scss';

const FIRST_VISIT_CLASS = 'first-run';

const Overlay = (***REMOVED*** className ***REMOVED***) => ***REMOVED***
  const ***REMOVED*** screenOn, hasSignal ***REMOVED*** = useContext(AppCtx);
  const [firstRun, setFirstRun] = useState(true);

  useEffect(() => ***REMOVED***
    if (screenOn) ***REMOVED***
      setFirstRun(false);
  ***REMOVED***
***REMOVED***, [screenOn]);

  return useMemo(() => (
    <div className=***REMOVED***`Overlay $***REMOVED***screenOn && !hasSignal ? 'no-signal' : ''***REMOVED*** $***REMOVED***className ?? ''***REMOVED***`***REMOVED***>
      ***REMOVED***screenOn ? '' : (
        <h1 className="app-logo">
          <span className=***REMOVED***`sc-logo $***REMOVED***firstRun ? FIRST_VISIT_CLASS : ''***REMOVED***`***REMOVED***><span className="visually-hidden">StarCraft</span></span>
          ***REMOVED***' '***REMOVED***
          <span className=***REMOVED***`tv-ico $***REMOVED***firstRun ? FIRST_VISIT_CLASS : ''***REMOVED***`***REMOVED***><span className="visually-hidden">TV</span></span>
        </h1>
      )***REMOVED***
      ***REMOVED***!screenOn && firstRun ? <Welcome /> : ''***REMOVED***
    </div>
  ), [screenOn, hasSignal, className, firstRun]);
***REMOVED***;

Overlay.propTypes = ***REMOVED***
  className: PropTypes.string,
***REMOVED***;

Overlay.defaultProps = ***REMOVED***
  className: '',
***REMOVED***;

export default Overlay;
