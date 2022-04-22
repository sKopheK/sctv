import PropTypes from 'prop-types';
import React, {
  useCallback,
  useContext, useEffect, useMemo, useState,
} from 'react';
import AppCtx from '../../state/AppCtx';
import Welcome from '../Welcome/Welcome';
import './Overlay.scss';

const FIRST_VISIT_CLASS = 'first-run';

const Overlay = ({ className }) => {
  const { screenOn, hasSignal, setRemoteVisible } = useContext(AppCtx);
  const [firstRun, setFirstRun] = useState(true);

  useEffect(() => {
    if (screenOn) {
      setFirstRun(false);
    }
  }, [screenOn]);

  const showRemote = useCallback(() => setRemoteVisible(true), [setRemoteVisible]);

  return useMemo(() => (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <div className={`Overlay ${screenOn && !hasSignal ? 'no-signal' : ''} ${className ?? ''}`} onClick={showRemote} onKeyDown={showRemote} role="region">
      {screenOn ? '' : (
        <h1 className="app-logo">
          <span className={`sc-logo ${firstRun ? FIRST_VISIT_CLASS : ''}`}><span className="visually-hidden">StarCraft</span></span>
          {' '}
          <span className={`tv-ico ${firstRun ? FIRST_VISIT_CLASS : ''}`}><span className="visually-hidden">TV</span></span>
        </h1>
      )}
      {!screenOn && firstRun ? <Welcome /> : ''}
    </div>
  ), [screenOn, hasSignal, className, firstRun, showRemote]);
};

Overlay.propTypes = {
  className: PropTypes.string,
};

Overlay.defaultProps = {
  className: '',
};

export default Overlay;
