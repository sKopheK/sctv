import PropTypes from 'prop-types';
import React, ***REMOVED***
  useContext, useEffect, useMemo, useState,
***REMOVED*** from 'react';
import AppCtx from '../../state/AppCtx';
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
      ***REMOVED***!screenOn && firstRun ? (
        <div className="welcome">
          <p className="welcome__heading">Welcome to the StarCraft TV experience.</p>
          <p className="welcome__text">Grab the remote and start the show!</p>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 250 130" className="welcome__arrow">
            <path d="M5,5 C20,100 200,90 200,90" />
            <path d="M210,90 C170,55 170,70 180,70" />
            <path d="M208,90 C175,125 175,110 175,114" />
          </svg>
        </div>
      ) : ''***REMOVED***
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
